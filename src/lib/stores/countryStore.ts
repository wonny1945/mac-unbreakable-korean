import {writable} from 'svelte/store';

function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '')
        .replace(/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i, '_$1')
        .replace(/[\s.]+$/, '');
}

export function convertFileName(fileName: string): string {
    let sanitizedName = sanitizeFileName(fileName);
    // NFC로 정규화
    return sanitizedName.normalize('NFC');
}

interface EncodedFile {
    originalName: string;
    encodedName: string;
}

function createFileEncodingStore() {
    const {subscribe, set, update} = writable<EncodedFile[]>([]);

    return {
        subscribe,
        addFiles: (files: File[]) => {
            const encodedFiles = files.map((file) => {
                const encodedName = convertFileName(file.name);
                return {
                    originalName: file.name,
                    encodedName
                };
            });

            update(files => [...files, ...encodedFiles]);

            // 파일 다운로드 시작
            encodedFiles.forEach(file => downloadFile(file, files.find(f => f.name === file.originalName)!));
        },
        clear: () => set([])
    };
}

export const fileEncodingStore = createFileEncodingStore();

// 파일 다운로드 함수
function downloadFile(encodedFile: EncodedFile, originalFile: File) {
    const blob = new Blob([originalFile], { type: originalFile.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = encodedFile.encodedName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 모든 인코딩된 파일 다운로드
export function downloadAllEncodedFiles(files: File[]) {
    fileEncodingStore.subscribe(encodedFiles => {
        encodedFiles.forEach((encodedFile, index) => {
            setTimeout(() => {
                const originalFile = files.find(f => f.name === encodedFile.originalName);
                if (originalFile) {
                    downloadFile(encodedFile, originalFile);
                }
            }, index * 1000);
        });
    })();
}
import { writable } from 'svelte/store';
import JSZip from 'jszip';

function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '')
        .replace(/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i, '_$1')
        .replace(/[\s.]+$/, '');
}

export function convertFileName(fileName: string): string {
    let sanitizedName = sanitizeFileName(fileName);
    return sanitizedName.normalize('NFC');
}

interface EncodedFile {
    originalName: string;
    encodedName: string;
    file: File;
}

function createFileEncodingStore() {
    const { subscribe, set, update } = writable<EncodedFile[]>([]);

    return {
        subscribe,
        addFiles: async (files: File[]) => {
            const encodedFiles = files.map((file) => ({
                originalName: file.name,
                encodedName: convertFileName(file.name),
                file
            }));

            set(encodedFiles);

            await createAndDownloadZip(encodedFiles);

            return encodedFiles;
        },
        clear: () => set([])
    };
}

export const fileEncodingStore = createFileEncodingStore();

async function createAndDownloadZip(encodedFiles: EncodedFile[]) {
    const zip = new JSZip();

    for (const file of encodedFiles) {
        const content = await file.file.arrayBuffer();
        zip.file(file.encodedName, content);
    }

    const content = await zip.generateAsync({type: "blob"});
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = "attachment.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export async function downloadAllEncodedFiles() {
    const files = get(fileEncodingStore);
    if (files.length > 0) {
        await createAndDownloadZip(files);
    }
}
<script>
    import {FileLineChart} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/";
    import {onMount} from "svelte";
    import * as Select from "$lib/components/ui/select";
    import {convertFileName,fileEncodingStore} from '$lib/stores/countryStore';

    let uploadIconY = 0;
    let direction = 1;

    // Drag & Drop files
    let dropZone;
    let fileInput;
    let isDragging = false;
    let files = [];
    let convertedFiles = [];

    function handleDragEnter(e) {
        e.preventDefault();
        isDragging = true;
    }

    function handleDragLeave(e) {
        e.preventDefault();
        isDragging = false;
    }

    function handleDrop(e) {
        e.preventDefault();
        isDragging = false;
        handleFiles(e.dataTransfer.files);
    }

    function handleFileInput(e) {
        handleFiles(e.target.files);
    }

    async function handleFiles(fileList) {
        files = Array.from(fileList);
        await fileEncodingStore.addFiles(files); // 파일 인코딩 및 자동 다운로드
        convertFiles();
    }

    function convertFiles() {
        convertedFiles = files.map(file => ({
            original: file.name,
            converted: convertFileName(file.name)
        }));
        console.log(convertedFiles);
    }


    onMount(() => {
        dropZone.addEventListener('dragenter', handleDragEnter);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('dragover', (e) => e.preventDefault());
        dropZone.addEventListener('drop', handleDrop);

        const animateIcon = () => {
            uploadIconY += direction;
            if (uploadIconY > 10 || uploadIconY < -10) {
                direction *= -1;
            }
            requestAnimationFrame(animateIcon);
        };
        animateIcon();

        return () => {
            dropZone.removeEventListener('dragenter', handleDragEnter);
            dropZone.removeEventListener('dragleave', handleDragLeave);
            dropZone.removeEventListener('dragover', (e) => e.preventDefault());
            dropZone.removeEventListener('drop', handleDrop);
        };
    });
</script>

<Card.Root class="mb-8">
    <div
        bind:this={dropZone}
        class="dark:border-gray-600 p-12 text-center shadow relative overflow-hidden transition-colors duration-300"
        class:bg-blue-50={isDragging}
        class:dark:bg-blue-900={isDragging}
    >
        <FileLineChart
            class="mx-auto h-12 w-12 absolute left-1/2 transform -translate-x-1/2 transition-colors duration-500"
            style="top: calc(50% - 90px + {uploadIconY}px);"
        />
        <h3 class="mt-28 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {isDragging ? 'Drop files here' : 'Just drop file here'}
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            or click to select files
        </p>

        <input
            type="file"
            bind:this={fileInput}
            on:change={handleFileInput}
            class="hidden"
            multiple
        />
        <Button
            class="mt-6"
            variant="default"
            on:click={() => fileInput.click()}
        >
            Select Files
        </Button>
    </div>
</Card.Root>
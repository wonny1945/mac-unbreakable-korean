<script>
    import {FileLineChart} from "lucide-svelte";
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/";
    import {onMount} from "svelte";
    import {fileEncodingStore} from '$lib/stores/countryStore';

    let uploadIconY = 0;
    let direction = 1;

    // Drag & Drop files
    let dropZone;
    let fileInput;
    let isDragging = false;

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

    function handleFiles(fileList) {
        const files = Array.from(fileList);
        fileEncodingStore.addFiles(files);
        // 파일 추가 후 자동으로 다운로드 처리됨 (스토어 내에서 처리)
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
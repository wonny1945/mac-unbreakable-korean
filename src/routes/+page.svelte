<script lang="ts">
    import Github from 'lucide-svelte/icons/github';
    import Linkedin from 'lucide-svelte/icons/linkedin';
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
    import {FileText, ArrowRight, Upload} from 'lucide-svelte';
    import {toggleMode} from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import {onMount} from 'svelte';

    const languages = [
        {
            name: "Korean (한국어)",
            original: "안녕하세요.pdf",
            before: "ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ.pdf",
            after: "안녕하세요.pdf",
            flag: "🇰🇷"
        },
        {
            name: "Chinese (中文)",
            original: "你好世界.pdf",
            before: "?????.pdf",
            after: "你好世界.pdf",
            flag: "🇨🇳"
        },
        {
            name: "Japanese (日本語)",
            original: "こんにちは.pdf",
            before: "????????.pdf",
            after: "こんにちは.pdf",
            flag: "🇯🇵"
        },
    ];

    let currentIndex = 0;

    function next() {
        currentIndex = (currentIndex + 1) % languages.length;
    }

    // Auto-rotate every 3 seconds
    setInterval(next, 3000);

    let uploadIconY = 0;
    let direction = 1;

    onMount(() => {
        const animateIcon = () => {
            uploadIconY += direction;
            if (uploadIconY > 10 || uploadIconY < -10) {
                direction *= -1;
            }
            requestAnimationFrame(animateIcon);
        };
        animateIcon();
    });
</script>

<div class="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
    <header class="sticky top-0 z-10 flex h-16 items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-700">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <div class="flex items-center gap-2 text-xl font-semibold">
                <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1"/>
                            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1"/>
                        </linearGradient>
                    </defs>
                    <path d="M50 5 L90 25 V60 C90 75 75 90 50 95 C25 90 10 75 10 60 V25 Z" fill="url(#grad1)"/>
                    <path d="M35 35 H65 V45 H55 V65 H45 V45 H35 Z" fill="#FFFFFF"/>
                </svg>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    Mac Text Safer
                </span>
            </div>
            <div class="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <a href="https://github.com/wonny1945" target="_blank" rel="noopener noreferrer">
                        <Github class="h-5 w-5"/>
                    </a>
                </Button>
                <Button variant="ghost" size="icon">
                    <a href="https://www.linkedin.com/in/%EC%A4%80%EC%9D%BC-%EC%9B%90-58975525b/" target="_blank"
                       rel="noopener noreferrer">
                        <Linkedin class="h-5 w-5"/>
                    </a>
                </Button>
                <Button on:click={toggleMode} variant="ghost" size="icon">
                    <Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    </header>

    <main class="flex-1 container mx-auto px-4 py-8">
        <div class="text-center mb-12">
            <h1 class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Mac Text Safer
            </h1>
            <p class=" text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Seamlessly convert and preserve your file text integrity across platforms.
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-4">
            <Card.Root class="p-1">
                <Card.Header>
                    <Card.Title class="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                        Secure & Local
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <p class="text-gray-600 dark:text-gray-300">
                        All processing occurs within your browser. No file uploads, no server storage. Your files, your
                        control.
                    </p>
                </Card.Content>
            </Card.Root>

            <Card.Root class="p-1">
                <Card.Header>
                    <Card.Title class="text-2xl font-semibold text-purple-600 dark:text-purple-400 flex items-center">
                        Multi-Language Support
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <p class="text-gray-600 dark:text-gray-300">
                        Mac-to-Windows compatibility for all languages. <br/>Preserve text integrity globally.

                    </p>
                    <div class="flex flex-row items-center">
                        <p class="text-gray-600 dark:text-gray-300 space-x-2">
                            Now Supports:

                            {#each languages as lang}
                                <span class="text-xl" title={lang.name}>{lang.flag}</span>
                            {/each}
                        </p>
                    </div>
                </Card.Content>
            </Card.Root>
        </div>

        <Card.Root class="mb-8">
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-purple-600 dark:text-gray-200 flex items-center">
                    Conversion Preview
                </Card.Title>
            </Card.Header>
            <Card.Content>
                {#each [languages[currentIndex]] as language (currentIndex)}
                    <div class="mb-2">
                        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-300 flex items-center">
                            <span class="text-2xl mr-2">{language.flag}</span> {language.name} : {language.original}
                        </h3>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 bg-red-50 dark:bg-red-900 rounded-lg shadow p-4">
                            <div class="flex items-center text-blue-400 mb-2">
                                <svg class="w-5 h-5 mr-2" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                          d="M0,12.402,35.687,7.861,35.69,41.406,0,41.37M39.996,6.906l52.016-7.5V41.41L39.996,41.376M35.69,45.9,35.687,79.601,0,75.083V45.9M39.996,46.249l52.016.026L92.003,80.9,39.996,88"/>
                                </svg>
                                <span class="text-sm font-medium text-red-700 dark:text-red-300">Before on Windows</span>

                                <span class="text-sm font-medium text-red-700 dark:text-red-300">Before on Windows</span>
                            </div>
                            <p class="text-sm text-red-600 dark:text-red-300 break-all">{language.before}</p>
                        </div>
                        <ArrowRight class="w-6 h-6 text-indigo-500 flex-shrink-0"/>
                        <div class="flex-1 bg-green-50 dark:bg-green-900 rounded-lg shadow p-4">
                            <div class="flex items-center text-blue-400 mb-2">
                                <svg class="w-5 h-5 mr-2" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor"
                                          d="M0,12.402,35.687,7.861,35.69,41.406,0,41.37M39.996,6.906l52.016-7.5V41.41L39.996,41.376M35.69,45.9,35.687,79.601,0,75.083V45.9M39.996,46.249l52.016.026L92.003,80.9,39.996,88"/>
                                </svg>
                                <span class="text-sm font-medium text-green-700 dark:text-green-300">Fixed on Windows</span>
                            </div>
                            <p class="text-sm text-green-600 dark:text-green-300 break-all">{language.after}</p>
                        </div>
                    </div>
                {/each}
            </Card.Content>
        </Card.Root>

        <div class="bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 text-center shadow relative overflow-hidden">
            <Upload class="mx-auto h-16 w-16 text-indigo-500 absolute left-1/2 transform -translate-x-1/2"
                    style="top: calc(50% - 32px + {uploadIconY}px);"/>
            <h3 class="mt-28 text-2xl font-semibold text-gray-800 dark:text-gray-200">Just drop file here</h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                or click to select files
            </p>
            <Button class="mt-6" variant="default">Select Files</Button>
        </div>
    </main>

    <footer class="mt-4 bg-gray-150 dark:bg-gray-800 py-6">
        <div class="container  px-1 text-center text-gray-600 dark:text-gray-300">
            &copy; 2024 Mac Text Safer. All rights reserved.
        </div>
    </footer>
</div>
<script lang="ts">

    import CircleUser from "lucide-svelte/icons/circle-user";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import {Badge} from "$lib/components/ui/badge/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import {FileText, ArrowRight} from 'lucide-svelte';


    const languages = [
        {
            name: "Korean (한국어)",
            original: "안녕하세요.pdf",
            before: "ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ.pdf",
            after: "안녕하세요.pdf",
        },
        {
            name: "Chinese (中文)",
            original: "你好世界.pdf",
            before: "?????.pdf",
            after: "你好世界.pdf",
        },
        {
            name: "Japanese (日本語)",
            original: "こんにちは.pdf",
            before: "????????.pdf",
            after: "こんにちは.pdf",
        },
    ];

    let currentIndex = 0;

    function next() {
        currentIndex = (currentIndex + 1) % languages.length;
    }

    // Auto-rotate every 5 seconds
    setInterval(next, 2000);
</script>

<div class="flex min-h-screen w-full flex-col bg-gradient-to-r from-blue-50 to-purple-50">
    <header class="sticky top-0 flex h-16 items-center border-b gap-2 bg-background px-2 md:px-6">
        <nav
                class="hidden w-full flex-col ㄴtext-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 "
        >
            <a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base group">
                <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1"/>
                            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1"/>
                        </linearGradient>
                    </defs>
                    <path d="M50 5 L90 25 V60 C90 75 75 90 50 95 C25 90 10 75 10 60 V25 Z" fill="url(#grad1)"/>
                    <path d="M35 35 H65 V45 H55 V65 H45 V45 H35 Z" fill="#FFFFFF"/>
                </svg>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] group-hover:from-[#7C3AED] group-hover:to-[#4F46E5] transition-all duration-300">
                Mac Text Safer
            </span>
            </a>
        </nav>

        <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form class="ml-auto flex-1 sm:flex-initial">
                <div class="relative">

                </div>
            </form>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild let:builder>
                    <Button
                            builders={[builder]}
                            variant="secondary"
                            size="icon"
                            class="rounded-full"
                    >
                        <CircleUser class="h-5 w-5"/>
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>My Account</DropdownMenu.Label>
                    <DropdownMenu.Separator/>
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Item>Support</DropdownMenu.Item>
                    <DropdownMenu.Separator/>
                    <DropdownMenu.Item>Logout</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-2 lg:gap-6 lg:p-6">
        <div class="flex flex-col justify-center items-center mt-8 text-center">
            <h1 class="text-5xl md:text-6xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Mac Text Safer
            </h1>
            <div class="max-w-2xl mx-auto px-4">
                <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg ">
                    <div class="flex items-center justify-center mb-2">
                        <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                        <h2 class="text-xl font-bold text-gray-800">Seamless File Conversion</h2>
                    </div>
                    <p class="text-center text-gray-600">
                        Drag, drop, and preserve your text integrity globally.
                        <span class="block mt-1 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Mac-to-Windows compatibility for all languages!
            </span>
                    </p>
                </div>
            </div>
        </div>
        <Card.Root>
            {#each [languages[currentIndex]] as language (currentIndex)}
                <Card.Header>
                    <Card.Title>
                        <h3 class="text-lg font-semibold text-gray-800 ">{language.name}</h3>
                        <p class="text-sm text-gray-600 ">Original File Name: {language.original}</p>
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <div class="flex items-center space-x-4">
                        <div class="flex-1 bg-red-50 rounded-lg shadow p-3">
                            <div class="flex items-center mb-1">
                                <FileText class="w-4 h-4 text-red-500 mr-2"/>
                                <span class="text-sm font-medium text-red-700">Before</span>
                            </div>
                            <p class="text-sm text-red-600 break-all">{language.before}</p>
                        </div>
                        <ArrowRight class="w-6 h-6 text-blue-500 flex-shrink-0"/>
                        <div class="flex-1 bg-green-50 rounded-lg p-3 shadow">
                            <div class="flex items-center mb-1">
                                <FileText class="w-4 h-4 text-green-500 mr-2"/>
                                <span class="text-sm font-medium text-green-700">After</span>
                            </div>
                            <p class="text-sm text-green-600 break-all">{language.after}</p>
                        </div>
                    </div>
                </Card.Content>
            {/each}
        </Card.Root>
        <div class="flex flex-1 items-center justify-center bg-white rounded-lg border-dashed border shadow-2xl"
        >
            <div class="flex flex-col items-center gap-1 text-center">
                <h3 class="text-2xl font-bold tracking-tight">Just Drop file Hear</h3>
                <p class="text-sm text-muted-foreground">
                    You can start selling as soon as you add a product.
                </p>
                <Button class="mt-4">Add Product</Button>
            </div>
        </div>
    </main>
</div>

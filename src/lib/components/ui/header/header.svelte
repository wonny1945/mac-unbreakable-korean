<script lang="ts">
    import {onMount} from 'svelte';
    import {selectedCountry, countries, detectCountry} from '$lib/stores/countryStore';
    import {Button} from "$lib/components/ui/button";
    import * as Select from "$lib/components/ui/select";
    import Github from 'lucide-svelte/icons/github';
    import Linkedin from 'lucide-svelte/icons/linkedin';
    import {toggleMode} from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";

    onMount(() => {
        detectCountry();
    });

    function handleCountryChange(event) {
        const countryValue = event.value;
        const countryData = countries.find(country => country.value === countryValue);
        if (countryData) {
            console.log(countryData)
            selectedCountry.set(countryData);
        }
    }
</script>

<header class="sticky top-0 z-10 flex h-16 items-center border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-700">
    <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center gap-2 text-xl font-semibold relative ">
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
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow">
                Mac Text Safer
            </span>
            <svg class="absolute -top-4 -right-32 h-16 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 45">
                <defs>
                    <clipPath id="bannerClip">
                        <path d="M0,0 L120,0 L120,50 L0,45 Z"/>
                    </clipPath>
                </defs>
                <g clip-path="url(#bannerClip)" class="drop-shadow">
                    <rect x="-30" y="10" width="180" height="21" fill="#FFD700" transform="rotate(-40,65,22.5)"/>
                    <text x="60" y="28" text-anchor="middle" font-size="9" fill="#000000"
                          transform="rotate(-40,60,22.5)">100% Free
                    </text>
                </g>
            </svg>
        </div>
        <div class="flex items-center gap-4">
            <Select.Root selected={$selectedCountry} onSelectedChange={handleCountryChange}>
                <Select.Trigger class="w-[250px]">
                    <Select.Value placeholder="Select a language"/>
                </Select.Trigger>
                <Select.Content>
                    <Select.Group>
                        {#each countries as country}
                            <Select.Item value={country.value}>{country.label}</Select.Item>
                        {/each}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

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
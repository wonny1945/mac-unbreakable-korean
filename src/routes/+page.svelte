<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card/index.js";
    import {onMount} from 'svelte';
    import {FileLineChart} from "lucide-svelte";
    import * as Select from "$lib/components/ui/select";
    import {Header} from "$lib/components/ui/header";
    import {Maintitle} from "$lib/components/ui/maintitle"
    import {Mainsub} from "$lib/components/ui/mainsub"
    import {Dropfile} from "$lib/components/ui/dropfile";


</script>

<div class="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
    <Header/>
    <main class="flex-1 container mx-auto px-4 py-8">
        <Maintitle/>
        <Mainsub/>
        <Dropfile/>
    </main>

    <footer class="-mt-2 bg-gray-150 dark:bg-gray-800 py-6">
        <div class="container px-1 text-center text-gray-600 dark:text-gray-300">
            &copy; 2024 Mac Text Safer. All rights reserved Wonny.
        </div>
    </footer>
</div>
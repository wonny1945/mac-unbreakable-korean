<script lang="ts">
    import {onMount} from 'svelte';

    // Recipients for dynamic subtitle
    let recipients = ['Boss', 'Client','Friend'];
    let currentRecipientIndex = 0;
    let currentRecipient = recipients[currentRecipientIndex];

    onMount(() => {
        const recipientInterval = setInterval(() => {
            currentRecipientIndex = (currentRecipientIndex + 1) % recipients.length;
            currentRecipient = recipients[currentRecipientIndex];
        }, 1000);

        return () => {
            clearInterval(recipientInterval);
        };
    });
</script>

<div class="text-center mb-12 dro">
    <p class="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 drop-shadow">
        Mac Text Safer
    </p>
    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-bold ">
        Tired of your <span
            class="border rounded bg-yellow-200 px-2 font-bold text-indigo-600 dark:text-indigo-400">{currentRecipient}</span>
        seeing <span
            class="border rounded bg-yellow-200 px-2 font-bold text-red-500 dark:text-red-400">'??????.pdf'</span>
        instead of <span
            class="border rounded bg-yellow-200 px-2 font-bold text-green-600 dark:text-green-400">'attach.pdf'?</span>
    </p>
    <p class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mt-1">
        <span class="border rounded bg-yellow-200 px-2 font-semibold text-indigo-600 dark:text-indigo-400">Simply drag and drop</span>
        your files
        into <span
            class=" border rounded bg-yellow-200 px-2 font-semibold text-indigo-600 dark:text-indigo-400">Mac Text Safer</span>
        to ensure
        your filenames stay intact on Windows.
    </p>
</div>
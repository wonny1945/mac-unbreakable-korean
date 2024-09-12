<script type="ts">
    import * as Card from "$lib/components/ui/card/";
    import {ArrowRight} from 'lucide-svelte';

    const languages = [

        {
            before: "ㅊㅓㅁㅂㅜㅍㅏㅇㅣㄹ.hwp",
            after: "첨부파일.hwp",
        },
        {
            before: "ㄱㅕㄴㅈㅓㄱㅅㅓ.pdf",
            after: "견적서.pdf",
        },
        {
            before: "ㅂㅗㄱㅗㅅㅓ.ppt",
            after: "보고서.ppt",
        },


    ];

    let currentIndex = 0;

    function next() {
        currentIndex = (currentIndex + 1) % languages.length;
    }

    // Auto-rotate every 3 seconds
    setInterval(next, 3000);

</script>


<div class="grid md:grid-cols-2 gap-8 mb-4">
    <Card.Root class="p-1">
        <Card.Header>
            <Card.Title class="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                Secure & Local
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <p class="text-gray-600 dark:text-gray-300">
                보안과 파일 유출은 걱정하지 마세요 <br/>모든 과정은 당신의 브라우저와 PC에서 진행됩니다.
            </p>
        </Card.Content>
    </Card.Root>

    <Card.Root class="p-1">
        <Card.Header>
            <Card.Title class="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 flex items-center">
                Conversion Preview
            </Card.Title>
        </Card.Header>
        <Card.Content>
            {#each [languages[currentIndex]] as language (currentIndex)}
                <div class="flex items-center space-x-4">
                    <div class="flex-1 bg-red-50 dark:bg-red-900 rounded-lg shadow p-4">
                        <div class="flex items-center text-blue-400 mb-2">
                            <svg class="w-5 h-5 mr-2" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                      d="M0,12.402,35.687,7.861,35.69,41.406,0,41.37M39.996,6.906l52.016-7.5V41.41L39.996,41.376M35.69,45.9,35.687,79.601,0,75.083V45.9M39.996,46.249l52.016.026L92.003,80.9,39.996,88"/>
                            </svg>
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
</div>



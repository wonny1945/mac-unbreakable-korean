<script>
  import { onMount } from 'svelte';
  export let unit = 'DAN-IXsR9LSo5akM722c'; // 광고 유닛 ID
  export let width = 'auto';
  export let height = 'auto';

  let adContainer;

  onMount(() => {
    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', unit);
    ins.setAttribute('data-ad-width', width);
    ins.setAttribute('data-ad-height', height);

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    adContainer.appendChild(ins);
    adContainer.appendChild(script);
  });
</script>

<div class="w-full flex items-center max-w-full overflow-hidden md:justify-center  ">
  <div bind:this={adContainer} style="width: {width}px; height: {height}px; max-width: auto;"></div>
</div>
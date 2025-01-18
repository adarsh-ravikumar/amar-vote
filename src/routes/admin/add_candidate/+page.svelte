<script lang="ts">
	import { onMount } from 'svelte';

	let video = $state();
	let btn = $state();
	let canv = $state();

	const constraints = {
		audio: false,
		video: {
			width: 1280,
			height: 720
		}
	};

	onMount(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			window.stream = stream;
			video.srcObject = stream;

			// let ctx = canv.getContext('2d');
			btn.addEventListener('click', () => {
				// ctx.drawImage(video, 0, 0, 640, 480);
                canv.src = video;
			});
		} catch (e) {
			console.log(e);
		}
	});
</script>

<div class="vid-wrap">
	<video bind:this={video} playsinline autoplay muted></video>
</div>

<div class="ctrl">
	<button class="capture" bind:this={btn}>Snap</button>
</div>

<!-- <canvas width="640" height="480" bind:this={canv}></canvas> -->

<img src="" alt="" bind:this={canv}>
<script lang="ts">
	import { onMount } from 'svelte';
	import './style.scss';
	import { goto } from '$app/navigation';
	import { CandidateData } from '../state';

	let video: HTMLVideoElement | null = $state(null);
	let image: string = $state('');
	let canvas: HTMLCanvasElement | null = $state(null);
	let ctx: CanvasRenderingContext2D | null = $state(null);
	let stream: MediaStream | null = $state(null);

	let showModal: boolean = $state(false);

	const videoConstraints = {
		audio: false,
		video: { width: 500, height: 500 }
	};

	onMount(async () => {
		try {
			stream = await navigator.mediaDevices.getUserMedia(videoConstraints);
			video!.srcObject = stream;
		} catch (e) {
			console.log(e);
		}
	});

	function CaptureImage() {
		canvas!.width = video?.videoWidth!;
		canvas!.height = video?.videoHeight!;

		ctx = canvas?.getContext('2d')!;
		ctx.drawImage(video!, 0, 0, canvas?.width!, canvas?.height!);

		canvas?.toBlob(async (b: Blob | null) => {
			image = window.URL.createObjectURL(b!);
		}, 'image/jpeg');

		showModal = !showModal;
	}
</script>

<div class="page">
	{#if showModal}
		<div class="modal__wrapper">
			<div class="modal">
				<p class="modal__title">Candidate Image</p>
				<img src={image} alt="candidate_image" />
				<div class="modal__buttons">
					<button
						class="modal__button modal__button--error"
						onclick={() => {
							showModal = !showModal;
						}}> <span class="material-icons-outlined">photo_camera</span> Capture Another</button
					>
					<button
						class="modal__button"
						onclick={() => {
							showModal = !showModal;
							$CandidateData!.image = image;
							goto('/admin/add_candidate/submit');
						}}>Continue <span class="material-icons"> arrow_forward_ios </span></button
					>
				</div>
			</div>
		</div>
	{/if}
	<img class="logo" src="/amar_school_branded_nocredit.png" alt="amar_logo" />
	<img class="credit" src="/credit.png" alt="amar_logo" />

	<div class="wrapper">
		<p class="page__title">Candidate Image</p>

		<div class="video">
			<video bind:this={video} playsinline autoplay muted><track kind="captions" /></video>
		</div>

		<button onclick={CaptureImage}><span class="material-icons"> photo_camera </span>Capture</button
		>
	</div>

	<canvas bind:this={canvas}></canvas>
</div>

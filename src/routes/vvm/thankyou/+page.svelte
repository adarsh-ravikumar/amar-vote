<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, LockVVM } from '../logic';
	import { PB } from '$lib/state';
	import { goto } from '$app/navigation';
	import Loader from '../../../components/loader.svelte';

	let timer: number = $state(10);
	let requestedReset: boolean = $state(false);

	onMount(async () => {
		ConnectVVM($PB);

		const interval = setInterval(async () => {
			timer--;
			if (timer <= 0) {
				requestedReset = true;
				await LockVVM($PB);
				requestedReset = false;
				goto('/vvm');
				clearInterval(interval);
			}
		}, 1000);
	});
</script>

{#if requestedReset}
	<Loader></Loader>
{/if}

<svelte:head>
	<style>
		html {
			overflow: hidden;
		}

		.credits {
			width: 100%;
			text-align: center;
			margin-bottom: 2rem;
		}
	</style>
</svelte:head>

<div class="page">
	<div class="left"></div>
	<img src="/amar_school_branded_nocredit.png" alt="amar_vote_logo" class="logo" />

	<img src="/like.png" alt="thumbs_up" class="thumb" />
	<div class="thankyou">
		<p class="title">Your votes have been successfully submitted</p>
		<p class="sub">Thank you for participating in the democratic process. Your voice matters!</p>
	</div>

	<p class="close">
		This machine will be locked and available for voting in <span class="time">{timer}</span> seconds
	</p>

	<div class="right"></div>

	<img src="/credit.png" alt="credit" class="credit" />
</div>

<style lang="scss">
	.left,
	.right {
		position: absolute;
		height: 150svh;
		top: 50%;
		translate: 0 -50%;
		left: 0%;
		background: #1b4547;
		box-shadow: 0px 0px 5px 10px #1792995b;
		width: 20vw;
		border-radius: 0% 150% 150% 0%;
	}

	.right {
		left: 100%;
		translate: -100% -50%;
		scale: -100%;
	}

	.page {
		display: flex;
		flex-direction: column;
		align-items: center !important;
		justify-content: center !important;
		width: 100svw;
		gap: 2rem;
		min-height: 100svh;
		overflow-y: hidden;

		.credit {
			position: static;
			width: 30vw;
		}
	}

	.logo {
		width: 30vw;
	}

	.thumb {
		width: 10vw;
		margin-block: 2rem;
	}

	.thankyou {
		text-align: center;

		.title {
			font-size: 1.3rem;
			font-weight: 600;
		}

		.sub {
			font-size: 1rem;
			font-weight: 500;
		}
	}

	.close {
		font-size: 1.2rem;
		.time {
			font-weight: 700;
		}
	}
</style>

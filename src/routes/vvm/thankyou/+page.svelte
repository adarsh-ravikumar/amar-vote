<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, LockVVM } from '../logic';
	import { PB } from '$lib/state';
	import { goto } from '$app/navigation';
	import "./style.scss";

	let timer: number = $state(10);

	onMount(async () => {
		ConnectVVM($PB);

		const interval = setInterval(() => {
			timer--;
			if (timer <= 0) {
				LockVVM($PB);
				goto('/vvm');
				clearInterval(interval);
			}
		}, 1000);
	});
</script>

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

	<img src="/credit.png" alt="credit" class="credit">
</div>

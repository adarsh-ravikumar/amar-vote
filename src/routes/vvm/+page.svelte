<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, PresentableHouse, WatchForVoterInfo } from './logic';
	import { PB } from '$lib/state';
	import { Voter, VVM } from './state';
	import { goto } from '$app/navigation';

	onMount(() => {
		ConnectVVM($PB);
		WatchForVoterInfo($PB);
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=how_to_vote,lock"
	/>
</svelte:head>

{#if $VVM}
	<div class="wrapper">
		<p class="content">Machine Number</p>
		<p class="content_display">
			{`${$VVM.machine_num}`.length == 1 ? '0' : ''}{$VVM.machine_num}
		</p>

		{#if !$VVM.session_active}
			<div class="locked">
				<span class="material-symbols-outlined"> lock </span>
				<p class="content">Locked</p>
			</div>
		{:else if $Voter}
			<div class="details">
				<p class="title">Voter Information</p>
				<p class="content"><strong>Name:</strong>{$Voter.name}</p>
				<p class="content"><strong>Class:</strong>{$Voter.class} {$Voter.section}</p>
				<p class="content"><strong>House:</strong>{PresentableHouse($Voter.house)}</p>
			</div>
			<button
				class="vote"
				onclick={() => {
					goto('/vvm/vote');
				}}><span class="material-symbols-outlined"> how_to_vote </span>Proceed To Vote</button
			>
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '../../styles/vars' as *;

	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100svh;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;
	}

	.locked {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.details {
		border-radius: 0.3rem;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		padding: 1rem 3rem;

		.title {
			font-size: 1.6rem;
			font-weight: 700;
			text-decoration: underline;
		}

		.content {
			font-size: 1.5rem;
		}
		strong {
			padding-right: 0.5rem;
			font-weight: 600;
		}
	}

	.vote {
		cursor: pointer;
		transition: scale 0.1s ease;

		&:hover {
			scale: 105%;
		}

		&:active {
			scale: 100%;
		}

		outline: none;
		border: none;
		background: $latte-teal;
		padding: 0.5rem 2rem;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		border-radius: 0.2rem;
		cursor: pointer;

		&,
		span {
			color: white;
		}
	}
</style>

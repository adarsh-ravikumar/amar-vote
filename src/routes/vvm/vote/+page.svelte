<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, PresentableHouse, WatchForVoterInfo } from '../logic';
	import { PB } from '$lib/state';
	import { CandidatesList } from '../state';

	onMount(async () => {
		ConnectVVM($PB);
		WatchForVoterInfo($PB);
	});
</script>

<div class="page">
	<nav><img src="/logo_light.svg" alt="amar_vote_logo" /></nav>
	{#if $CandidatesList}
		{#each $CandidatesList as can}
			{can.post}
			{can.name}
		{/each}
	{/if}
</div>

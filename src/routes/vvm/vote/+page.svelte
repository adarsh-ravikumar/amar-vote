<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, PresentableHouse, WatchForVoterInfo } from '../logic';
	import { PB } from '$lib/state';
	import { Voter } from '../state';

	onMount(() => {
		ConnectVVM($PB);
		WatchForVoterInfo($PB);
	});
</script>

<div class="page">
	<nav><img src="/logo_light.svg" alt="amar_vote_logo" /></nav>
    
</div>

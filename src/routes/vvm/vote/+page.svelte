<script lang="ts">
	import { onMount } from 'svelte';
	import { ConnectVVM, WatchForVoterInfo } from '../logic';
	import { PB } from '$lib/state';
	import { CurrentPostIndex, PostsList, Voter } from '../state';
	import VotePost from './components/vote_post/vote_post.svelte';
	import './style.scss';
	import VoteVerify from './components/vote_verify/vote_verify.svelte';

	onMount(async () => {
		ConnectVVM($PB);
		WatchForVoterInfo($PB);
	});
</script>

<div class="page">
	<nav>
		<img src="/logo_light.svg" alt="amar_vote_logo" />
		<div class="info">
			<div class="info__name_class">
				<p>{$Voter?.name[0].toUpperCase()}{$Voter?.name.slice(1)}</p>
				<span>{$Voter?.class} - {$Voter?.section}</span>
			</div>

			<p class="info__house house__{$Voter?.house[0].toLowerCase()}">{$Voter?.house}</p>
		</div>
	</nav>
	{#if $CurrentPostIndex < Object.keys($PostsList!).length}
		{#if $PostsList}
			<VotePost
				post={Object.keys($PostsList)[$CurrentPostIndex]}
				candidates={Object.values($PostsList)[$CurrentPostIndex]}
			></VotePost>
		{/if}
	{:else}
		<VoteVerify />
	{/if}
</div>

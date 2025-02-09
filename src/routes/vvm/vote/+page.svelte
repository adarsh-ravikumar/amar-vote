<script lang="ts">
	import './style.scss';

	import VotePost from './components/vote_post/vote_post.svelte';
	import VoteVerify from './components/vote_verify/vote_verify.svelte';
	import { CurrentPostIndex, PostsList, Voter } from '../state';
	import { onMount } from 'svelte';
	import { FetchCandidates } from './logic';
	import { PB } from '$lib/state';
	import Loader from '../../../components/loader.svelte';

	onMount(() => {
		FetchCandidates($PB, $Voter!.house);
	});
</script>

{#if $PostsList}
	<div class="page">
		<nav>
			<img class="logo" src="/amar_school_branded_nocredit.png" alt="amar_vote_logo" />
			<div class="info">
				<div class="info__name_class">
					<p>{$Voter?.name[0].toUpperCase()}{$Voter?.name.slice(1)}</p>
					<span>{$Voter?.class} - {$Voter?.section}</span>
				</div>

				<p class="info__house house__{$Voter?.house[0].toLowerCase()}">{$Voter?.house}</p>
			</div>
		</nav>
		{#if $CurrentPostIndex < Object.keys($PostsList!).length && Object.values($PostsList)[$CurrentPostIndex].length > 0}
			{#if $PostsList}
				<VotePost
					post={Object.keys($PostsList)[$CurrentPostIndex]}
					candidates={Object.values($PostsList)[$CurrentPostIndex]}
				></VotePost>
				<img class="credit" src="/credit.png" alt="credit" />
			{/if}
		{:else}
			<VoteVerify />
		{/if}
	</div>
{:else}
	<Loader></Loader>
{/if}

<script lang="ts">
	import './vote_post.scss';
	import Card from '../card/card.svelte';
	import Modal from '../modal/modal.svelte';

	import { PB_URL } from '$lib/api';

	import { CurrentPostIndex, ShowModal, Votes } from '../../../state';
	import type { Candidate } from '../../logic';

	interface Props {
		post: string; candidates: Candidate[] 
	}

	let { post, candidates }: Props= $props();
</script>

<div class="post__wrapper">
	{#if $ShowModal}
		<Modal {post} {PB_URL} />
	{/if}
	<div class="nav">
		<button
			class="nav__btn nav__btn--back"
			onclick={() => {
				$CurrentPostIndex > 0 ? $CurrentPostIndex-- : null;
			}}><span class="material-icons"> arrow_back_ios </span> Previous</button
		>
		<div class="nav__info">
			<p class="post__title">{post}</p>
			<p class="post__count">{candidates.length} candidate{candidates.length > 1 ? 's' : ''}</p>
			<p class="post__info">
				{$Votes[`${post}`] != undefined
					? `Click on the "Vote" button of a different candidate should you wish to change your selection`
					: ''}
			</p>
		</div>
		<button
			class="nav__btn nav__btn--next"
			onclick={() => {
				$ShowModal = true;
			}}
		>
			Next <span class="material-icons"> arrow_forward_ios </span></button
		>
	</div>
	<div class="can">
		{#each candidates as candidate}
			{@const voted = $Votes[`${post}`] != undefined}
			{@const isSelected = voted ? $Votes[`${post}`].name == candidate.name : false}

			<Card {voted} {isSelected} {candidate} {post} {PB_URL} vote={true} />
		{/each}
	</div>
</div>

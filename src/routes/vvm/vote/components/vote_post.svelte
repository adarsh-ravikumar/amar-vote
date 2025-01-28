<script lang="ts">
	import { PB_URL } from '$lib/api';
	import { CurrentPostIndex, Votes } from '../../state';
	import type { Candidate } from '../logic';
	import './style.scss';

	let { post, candidates }: { post: string; candidates: Candidate[] } = $props();
	let showModal: boolean = $state(false);

	Votes.subscribe(() => {
		console.log('Hallo! Someone voted!');
	});
</script>

<div class="wrapper">
	{#if showModal}
		<div class="modal__wrapper">
			<div class="modal">
				{#if $Votes[post] == undefined}
					<p class="modal__title">Not Voted!</p>
					<p class="modal__content">
						You have not voted a candidate for the post "{post}". Please Select a candidate to
						continue to the next section.
					</p>
					<button
						class="modal__button"
						onclick={() => {
							showModal = !showModal;
						}}>Continue To Vote</button
					>
				{:else}
					<p class="modal__title">Verify Vote</p>

					<div class="can__card">
						<div class="card__img">
							<img
								src="{PB_URL}/api/files/candidates/{$Votes[post].id}/{$Votes[post].image}"
								alt="candidate_image"
								class="img__candidate"
							/>
							<img
								src="{PB_URL}/api/files/candidates/{$Votes[post].id}/{$Votes[post].icon}"
								alt="candidate_icon"
								class="img__icon"
							/>
						</div>
						<div class="card__info">
							<p class="info__name">{$Votes[post].name}</p>
							<p class="info__class">{$Votes[post].class} - {$Votes[post].section}</p>
						</div>
					</div>
					<p class="modal__content">
						If you'd like to change your choice, please do so now, as you will not be permitted to
						do so later.
					</p>

					<div class="modal__buttons">
						<button
							class="modal__button modal__button--error"
							onclick={() => {
								showModal = !showModal;
							}}>Change Vote</button
						>
						<button
							class="modal__button"
							onclick={() => {
								showModal = !showModal;
								$CurrentPostIndex++;
							}}>Continue To Next Section</button
						>
					</div>
				{/if}
			</div>
		</div>
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
				showModal = true;
			}}
		>
			Next <span class="material-icons"> arrow_forward_ios </span></button
		>
	</div>
	<div class="can">
		{#each candidates as c}
			{@const voted = $Votes[`${post}`] != undefined}
			{@const isSelected = voted ? $Votes[`${post}`].name == c.name : false}

			<div class="can__card {voted && !isSelected ? 'card--disabled' : ''}">
				<div class="card__img">
					<img
						src="{PB_URL}/api/files/candidates/{c.id}/{c.image}"
						alt="candidate_image"
						class="img__candidate"
					/>
					<img
						src="{PB_URL}/api/files/candidates/{c.id}/{c.icon}"
						alt="candidate_icon"
						class="img__icon"
					/>
				</div>
				<div class="card__info">
					<p class="info__name">{c.name}</p>
					<p class="info__class">{c.class} - {c.section}</p>
				</div>
				<button
					class="vote"
					onclick={() => {
						$Votes[post] = c;
					}}
					><span class="material-icons"> {isSelected ? 'verified' : 'ballot'} </span>
					{isSelected ? 'Selected' : 'Vote'}
				</button>
			</div>
		{/each}
	</div>
</div>

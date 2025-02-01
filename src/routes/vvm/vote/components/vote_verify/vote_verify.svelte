<script lang="ts">
	import './vote_verify.scss';
	import Card from '../card/card.svelte';

	import { PB_URL } from '$lib/api';

	import { PostsList, Votes } from '../../../state';
	import { SubmitVote } from '../../logic';
	import { PB } from '$lib/state';
	import { goto } from '$app/navigation';
</script>

<div class="verify__wrapper">
	<div class="nav">
		<div class="nav__info">
			<p class="page__title">Confirm Votes</p>
			<p class="page__count">
				You voted for <strong>{Object.keys($PostsList!).length}</strong> posts
			</p>
		</div>
	</div>
	<div class="can">
		{#each Object.keys($Votes) as post}
			<div class="post_card">
				<p class="post_card__title">{post}</p>
				<Card
					voted={false}
					isSelected={false}
					candidate={$Votes[post]}
					{post}
					{PB_URL}
					vote={false}
				/>
			</div>
		{/each}
	</div>
	<hr />
	<div class="submit">
		<div class="submit__warning">
			<div class="warning__icon">
				<span class="material-icons">priority_high</span>
			</div>
			<p class="warning__text">
				By submitting your vote, you acknowledge that your <strong>selections are final</strong> and
				that you <strong>will not dispute them</strong> on the basis of incorrect voting.
			</p>
		</div>

		<button
			class="submit__btn"
			onclick={async () => {
				await SubmitVote($PB);
				goto("/vvm/thankyou")
			}}
		>
			<span class="material-icons">ballot</span> Submit Vote
		</button>
	</div>
</div>

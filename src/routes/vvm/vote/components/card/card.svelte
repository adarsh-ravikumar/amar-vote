<script lang="ts">
	import './card.scss';
	import { Votes } from '../../../state';
	import type { Candidate } from '../../logic';

	interface Props {
		voted: boolean;
		isSelected: boolean;
		vote: boolean;
		PB_URL: string;
		post: string;
		candidate: Candidate;
	}

	let { voted, isSelected, PB_URL, candidate, post, vote }: Props = $props();
</script>

<div class="can__card {voted && !isSelected ? 'card--disabled' : ''}">
	<div class="card__img">
		<img
			src="{PB_URL}/api/files/candidates/{candidate.id}/{candidate.image}"
			alt="candidate_image"
			class="img__candidate"
		/>
		<img
			src="{PB_URL}/api/files/candidates/{candidate.id}/{candidate.icon}"
			alt="candidate_icon"
			class="img__icon"
		/>
	</div>
	<div class="card__info">
		<p class="info__name">{candidate.name}</p>
		<p class="info__class">{candidate.class} - {candidate.section}</p>
	</div>
	{#if vote}
		<button
			class="vote"
			onclick={() => {
				$Votes[post] = candidate;
			}}
			><span class="material-icons"> {isSelected ? 'verified' : 'ballot'} </span>
			{isSelected ? 'Selected' : 'Vote'}
		</button>
	{/if}
</div>

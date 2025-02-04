<script lang="ts">
	import './modal.scss';

	import { Votes, CurrentPostIndex, ShowModal } from '../../../state';
	import Card from '../card/card.svelte';

	interface Props {
		post: string;
		PB_URL: string;
	}

	let { post, PB_URL }: Props = $props();
</script>

<div class="modal__wrapper">
	<div class="modal">
		{#if $Votes[post] == undefined}
			<p class="modal__title">Not Voted!</p>
			<p class="modal__content">
				You have not voted a candidate for the post "{post}". Please Select a candidate to continue
				to the next section.
			</p>
			<button
				class="modal__button"
				onclick={() => {
					$ShowModal = !$ShowModal;
				}}>Continue To Vote</button
			>
		{:else}
			<p class="modal__title">Verify Vote</p>

			<Card
				voted={false}
				isSelected={false}
				candidate={$Votes[post]}
				{post}
				{PB_URL}
				vote={false}
			/>

			<p class="modal__content" style="text-align:center">
				For the post "{post}"
			</p>

			<div class="modal__buttons">
				<button
					class="modal__button modal__button--error"
					onclick={() => {
						$ShowModal = !$ShowModal;
					}}>Change Vote</button
				>
				<button
					class="modal__button"
					onclick={() => {
						$ShowModal = !$ShowModal;
						$CurrentPostIndex++;
					}}>Continue To Next Section</button
				>
			</div>
		{/if}
	</div>
</div>

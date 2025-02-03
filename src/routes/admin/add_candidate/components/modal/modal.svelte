<script lang="ts">
	import './modal.scss';

	import { CandidateData, Posts, ShowModal } from '../../state';
	import { goto } from '$app/navigation';
</script>

<div class="modal__wrapper">
	<div class="modal">
		{#if $CandidateData !== undefined}
			<p class="modal__title">Candidate Information</p>
			<p class="modal__content">
				Before you continue, ensure that all the details entered are correct. You will not be
				allowed to edit this data later.
			</p>
			<div class="modal__candidate">
				<p><strong>Name: </strong>{$CandidateData.name}</p>
				<p><strong>Class: </strong>{$CandidateData.class} - {$CandidateData.section}</p>
				<p><strong>Post: </strong>{$Posts[$CandidateData.post]}</p>
				<p><strong>Email: </strong>{$CandidateData.email}</p>
			</div>
			<div class="modal__buttons">
				<button
					class="modal__button modal__button--error"
					onclick={() => {
						$ShowModal = !$ShowModal;
					}}>Edit Data</button
				>
				<button
					class="modal__button"
					onclick={() => {
						$ShowModal = !$ShowModal;
						goto("/admin/add_candidate/image")
					}}>Continue</button
				>
			</div>
		{:else}
			<p class="modal__title">Fill all the fields</p>
			<p class="modal__content">
				Ensure that you have entered data into all the fields before continuing.
			</p>
			<button
				class="modal__button"
				onclick={() => {
					$ShowModal = !$ShowModal;
				}}>Ok</button
			>
		{/if}
	</div>
</div>

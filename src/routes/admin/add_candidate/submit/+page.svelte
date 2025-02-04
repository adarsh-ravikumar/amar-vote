<script lang="ts">
	import { goto } from '$app/navigation';
	import { PB } from '$lib/state';
	import { onMount } from 'svelte';
	import { FetchIcon, RegisterCandidate } from '../logic';
	import { CandidateData, Posts } from '../state';
	import './style.scss';
	import { PB_URL } from '$lib/api';
	import Loader from '../../../../components/loader.svelte';
	import { transformWithEsbuild } from 'vite';

	let registered: boolean = $state(false);
	let requestedRegister: boolean = $state(false);
	let icon: { collection: string; id: string; icon: string } | null = $state(null);

	onMount(async () => {
		icon = await FetchIcon($PB);
		$CandidateData!.icon = icon.id;
	});
</script>

{#if !$CandidateData || requestedRegister}
	<Loader></Loader>
{/if}

{#if $CandidateData && icon}
	<div class="page">
		{#if registered}
			{(requestedRegister = false)}
			<div class="modal__wrapper">
				<div class="modal">
					<p class="modal__title">Candidate Registered</p>
					<p class="modal__content">
						Candidate reigstered successfully! You will recieve the details and your symbol to the
						registered mail id.
					</p>
					<button
						class="modal__button"
						onclick={() => {
							$CandidateData = undefined;
							goto('/admin/add_candidate');
						}}>Continue <span class="material-icons">arrow_forward_ios</span></button
					>
				</div>
			</div>
		{/if}
		<img class="logo" src="/amar_school_branded_nocredit.png" alt="amar_logo" />
		<img class="credit" src="/credit.png" alt="amar_logo" />

		<p class="page__title">Verify Details</p>

		<div class="details">
			<img src={$CandidateData.image} alt="candidate_image" />
			<div class="imgs">
				<div class="icon">
					<p>Campaign Icon</p>
					<img
						src={`${PB_URL}/api/files/${icon.collection}/${icon.id}/${icon.icon}`}
						alt="campaign_icon"
					/>
				</div>
				<div class="data">
					<p><strong>Name: </strong>{$CandidateData.name}</p>
					<p><strong>Class: </strong>{$CandidateData.class} - {$CandidateData.section}</p>
					<p><strong>Post: </strong>{$Posts[$CandidateData.post]}</p>
					<p><strong>Email: </strong>{$CandidateData.email}</p>
				</div>
			</div>
		</div>

		<button
			onclick={async () => {
				requestedRegister = true;
				registered = await RegisterCandidate($PB, $CandidateData!);
			}}><span class="material-icons">person_add</span> Register Candidate</button
		>
	</div>
{/if}

<style lang="scss">
	.details {
		.imgs {
			display: flex;
			gap: 2rem;
			.icon {
				p {
					font-weight: 600;
				}
			}
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import './components/style.scss';
	import PostResult from './components/post_result.svelte';
	import { goto } from '$app/navigation';
	import { ResetData } from './logic';
	import { PB } from '$lib/state';
	import Loader from '../../../components/loader.svelte';

	onMount(() => {
		$Page = 'Results';
	});

	let createModalFlyOut: boolean = $state(false);
	let downloadReport: boolean = $state(false);
	let reportFmt: string = $state('PDF');

	let resetModal: boolean = $state(false);
	let requestedReset: boolean = $state(false);
	let resetVote: boolean = $state(false);
	let resetPost: boolean = $state(false);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=download,reset_settings"
	/>
</svelte:head>

{#if requestedReset}
	<Loader></Loader>
{/if}

{#if resetModal}
	<div class="modal">
		<div class="modal_content">
			<p class="title">This Action Cannot Be Undone!</p>
			<p class="content">Select the data to be reset</p>
			<div class="container">
				<input type="checkbox" bind:checked={resetVote} /> <label for="">Votes</label>
			</div>
			<div class="container">
				<input type="checkbox" bind:checked={resetPost} />
				<label for="">Posts, Candidates, Campaign Icons</label>
			</div>

			<button
				class="del"
				onclick={async () => {
					resetModal = false;
					requestedReset = true;
					await ResetData($PB, resetPost, resetVote);
					requestedReset = false;
				}}
			>
				Reset Data
			</button>
		</div>
	</div>
{/if}

<div class="page">
	<Sidebar></Sidebar>
	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">list_alt</span> Results
			</p>

			<div class="election_actions">
				<button
					class="action_btn reset"
					onclick={() => {
						resetModal = true;
						// if (downloadReport == false) {
						// 	return (downloadReport = true);
						// }
						// if (downloadReport == true) {
						// 	createModalFlyOut = true;
						// 	const flyOut = setTimeout(() => {
						// 		createModalFlyOut = false;
						// 		downloadReport = false;
						// 		clearTimeout(flyOut);
						// 	}, 300);
						// }
					}}
				>
					<span class="material-symbols-outlined"> reset_settings </span>Reset Elections
				</button>
				<div class="create">
					<button
						class="action_btn download_reoprt"
						onclick={() => {
							if (downloadReport == false) {
								return (downloadReport = true);
							}
							if (downloadReport == true) {
								createModalFlyOut = true;

								const flyOut = setTimeout(() => {
									createModalFlyOut = false;
									downloadReport = false;
									clearTimeout(flyOut);
								}, 300);
							}
						}}
					>
						<span class="material-symbols-outlined">download</span> Download report
					</button>

					{#if downloadReport}
						<div
							class="create_modal {createModalFlyOut ? 'fly-out' : ''}"
							style="min-width: 20rem;"
						>
							<div class="container">
								<label for="house">Report Format</label>
								<select name="house" bind:value={reportFmt}>
									<option value="PDF">PDF</option>
								</select>
							</div>
							<button
								class="submit"
								onclick={async () => {
									// handle report generation and download
									goto('/admin/results/generate');
								}}>Download</button
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<PostResult></PostResult>
	</div>
</div>

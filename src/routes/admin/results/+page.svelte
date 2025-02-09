<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import './components/style.scss';
	import PostResult from './components/post_result.svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		$Page = 'Results';
	});

	let createModalFlyOut: boolean = $state(false);
	let downloadReport: boolean = $state(false);
	let reportFmt: string = $state('PDF');
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=download"
	/>
</svelte:head>

<div class="page">
	<Sidebar></Sidebar>
	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">list_alt</span> Results
			</p>

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
					<div class="create_modal {createModalFlyOut ? 'fly-out' : ''}" style="min-width: 20rem;">
						<div class="container">
							<label for="house">Report Format</label>
							<select name="house" bind:value={reportFmt}>
								<option value="PDF">PDF</option>
								<option value="JSON">JSON</option>
								<option value="CSV">CSV</option>
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
		<PostResult></PostResult>
	</div>
</div>

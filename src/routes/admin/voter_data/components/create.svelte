<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { PB } from '$lib/state';
	import { RequestedUpload } from '../state';
	import { type VoterData } from '../types.d';

	import Papa from 'papaparse';

	let uploadIcon: boolean = $state(false);

	let uploadRegionDrag: boolean = $state(false);

	let browseBtn: HTMLInputElement | null = $state(null);

	let createModalFlyOut: boolean = $state(false);

	let voterData: VoterData[] = $state([]);

	function ParseCSV(src: string) {
		const parsed = Papa.parse<VoterData>(src, {
			header: true,
			skipEmptyLines: true
		});

		voterData = parsed.data;
	}

	async function HandleUpload() {
		if (!voterData) return;

		$RequestedUpload = true;

		for (let i = 0; i < voterData.length; i++) {
			const d: VoterData = voterData[i];
			console.log(d);
			await $PB.collection('voter_data').create(
				{
					name: d.name,
					class: d.class,
					section: d.section,
					house: d.house
				},
				{ requestKey: null }
			);
		}

		$RequestedUpload = false;

		// refresh
		// https://stackoverflow.com/questions/75960306/sveltekit-how-to-reload-current-page-via-the-client-side-router-using-goto
		const thisPage = window.location.pathname;
		goto('/').then(() => goto(thisPage));
	}
</script>

<div class="create">
	<button
		class="action_btn create_icon"
		onclick={() => {
			if (uploadIcon == false) {
				return (uploadIcon = true);
			}
			if (uploadIcon == true) {
				createModalFlyOut = true;

				const flyOut = setTimeout(() => {
					createModalFlyOut = false;
					uploadIcon = false;
					clearTimeout(flyOut);
				}, 300);
			}
		}}
	>
		<span class="material-icons">add</span> Upload Voter Data
	</button>

	{#if uploadIcon}
		<div class="create_modal {createModalFlyOut ? 'fly-out' : ''}">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="upload {uploadRegionDrag ? 'drag' : ''}"
				ondragover={(e) => {
					e.preventDefault();
					uploadRegionDrag = true;
				}}
				ondragend={(e) => {
					e.preventDefault();
					uploadRegionDrag = false;
				}}
				ondrop={async (e) => {
					uploadRegionDrag = false;

					e.preventDefault();
					if (e.dataTransfer!.items) {
						const file = e.dataTransfer!.items[0].getAsFile();
						const text = await file?.text();
						if (!text) return;
						ParseCSV(text);
					}
				}}
			>
				<p>Drop CSV File Here</p>
				<p class="or">Or</p>
				<button
					class="upload_file"
					onclick={() => {
						if (!browseBtn) return;
						browseBtn.click();
					}}>Browse File</button
				>
				<input
					type="file"
					name="file"
					id="file"
					accept=".csv"
					class="hide"
					bind:this={browseBtn}
					onchange={async (e) => {
						uploadRegionDrag = false;

						e.preventDefault();
						if (browseBtn && browseBtn.files) {
							const file = browseBtn.files[0];
							const text = await file?.text();
							if (!text) return;
							ParseCSV(text);
						}
					}}
				/>
				{#if voterData.length !== 0}
					<p class="count">
						File Containing {voterData.length} Row{voterData.length == 1 ? '' : 's'} Uploaded
					</p>
				{/if}
			</div>
			<button
				class="submit"
				onclick={async () => {
					createModalFlyOut = true;
					HandleUpload();
					const flyOut = setTimeout(() => {
						createModalFlyOut = false;
						uploadIcon = false;
						clearTimeout(flyOut);
					}, 300);
				}}>Submit</button
			>
		</div>
	{/if}
</div>

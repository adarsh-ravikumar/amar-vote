<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import './style.scss';
	import Loader from '../../../components/loader.svelte';
	import Table from '../components/table/table.svelte';
	import { type RecordModel } from 'pocketbase';
	import { PB_URL } from '$lib/api';
	import { PB } from '$lib/state';
	import { RefreshTable } from '../components/table/state';

	let uploadIcon: boolean = $state(false);
	let uploadData: FormData[] = $state([]);

	let uploadRegionDrag: boolean = $state(false);

	let browseBtn: HTMLInputElement | null = $state(null);

	let requestedUpload: boolean = $state(false);

	let createModalFlyOut: boolean = $state(false);

	async function HandleUpload() {
		if (uploadData.length === 0) return;

		const numItems = uploadData.length;

		uploadData.forEach(async (item, i) => {
			requestedUpload = true;
			await $PB.collection('icons').create(item, { requestKey: null });

			if (i === numItems - 1) {
				requestedUpload = false;
				$RefreshTable = true;
			}
		});
	}

	onMount(() => {
		$Page = 'Campaign Icons';
	});
</script>

{#if requestedUpload}
	<Loader></Loader>
{/if}

<div class="page">
	<Sidebar></Sidebar>

	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">image</span> Icons
			</p>

			<div class="create">
				<button
					class="action_btn create_icon"
					onclick={() => {
						uploadData = [];
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
					<span class="material-icons">add</span> Upload Icon
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
							ondrop={(e) => {
								uploadRegionDrag = false;

								e.preventDefault();
								if (e.dataTransfer!.items) {
									Array.from(e.dataTransfer!.items).forEach((item, i) => {
										if (item.kind === 'file') {
											const file = item.getAsFile();

											const form = new FormData();
											form.append('icon', file!);

											uploadData.push(form);
										}
									});
								}
							}}
						>
							<p>Drop Files Here</p>
							<p class="or">Or</p>
							<button
								class="upload_file"
								onclick={() => {
									if (!browseBtn) return;
									browseBtn.click();
								}}>Browse Files</button
							>
							<input
								type="file"
								name="file"
								id="file"
								accept="image/*"
								multiple
								class="hide"
								bind:this={browseBtn}
								onchange={(e) => {
									e.preventDefault();
									if (browseBtn && browseBtn.files) {
										Array.from(browseBtn.files).forEach((file) => {
											const form = new FormData();
											form.append('icon', file!);
											uploadData.push(form);
										});
									}
								}}
							/>
							{#if uploadData.length !== 0}
								<p class="count">
									{uploadData.length} file{uploadData.length > 1 ? 's' : ''} uploaded
								</p>
							{/if}
						</div>
						<button
							class="submit"
							onclick={async () => {
								createModalFlyOut = true;
								await HandleUpload();

								uploadData = [];
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
		</div>

		<Table
			collection="icons"
			expand="assigned_to, assigned_to.post"
			buildFields={(data: RecordModel) => {
				return [
					`${data.id}`,
					`${PB_URL}/api/files/icons/${data.id}/${data.icon}`,
					`${data.expand!.assigned_to ? data.expand!.assigned_to.name : '-'}`,
					`${data.expand!.assigned_to ? data.expand!.assigned_to.expand!.post.title : '-'}`
				];
			}}
			headers={['ID', 'img:Icon', 'Assigned To', 'Post']}
			colWidths="10% 5% 40% 40% 5%"
			name="icons"
		></Table>
	</div>
</div>

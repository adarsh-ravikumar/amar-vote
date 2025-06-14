<script lang="ts">
	import { PB } from "$lib/state";
	import { RefreshTable } from "../../components/table/state";
	import { RequestedUpload } from "../state";

	let uploadIcon: boolean = $state(false);
	let uploadData: FormData[] = $state([]);

	let uploadRegionDrag: boolean = $state(false);

	let browseBtn: HTMLInputElement | null = $state(null);

	let createModalFlyOut: boolean = $state(false);

	async function HandleUpload() {
		if (uploadData.length === 0) return;

		const numItems = uploadData.length;

		$RequestedUpload = true;

		for (const item of uploadData) {
			await $PB.collection('icons').create(item, { requestKey: null });
		}

		$RequestedUpload = false;
		$RefreshTable = true;
	}
</script>
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
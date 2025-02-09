<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import Loader from '../../../components/loader.svelte';
	import Table from '../components/table/table.svelte';
	import { type RecordModel } from 'pocketbase';
	import { PB_URL } from '$lib/api';

	let createCandidate: boolean = $state(false);

	let requestedCreate: boolean = $state(false);

	let createModalFlyOut: boolean = $state(false);
	
	onMount(() => {
		$Page = 'Candidates';
	});
</script>

{#if requestedCreate}
	<Loader></Loader>
{/if}

<div class="page">
	<Sidebar></Sidebar>

	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">person</span> Candidates
			</p>

			<div class="create">
				<button
					class="action_btn create_candidate"
					onclick={() => {
						if (createCandidate == false) {
							return (createCandidate = true);
						}
						if (createCandidate == true) {
							createModalFlyOut = true;

							const flyOut = setTimeout(() => {
								createModalFlyOut = false;
								createCandidate = false;
								clearTimeout(flyOut);
							}, 300);
						}
					}}
				>
					<span class="material-icons">add</span> Create New Candidate
				</button>

				{#if createCandidate}
					<div class="create_modal {createModalFlyOut ? 'fly-out' : ''}">
						<p>
							Scan this QR Code using a <br /> mobile device to access the <br />candidate
							registration interface
						</p>
						<img src="/qr_add_candidate.png" alt="qr_code" />
						<button
							class="submit"
							onclick={async () => {
								createModalFlyOut = true;

								const flyOut = setTimeout(() => {
									createModalFlyOut = false;
									createCandidate = false;
									clearTimeout(flyOut);
								}, 300);
							}}>Ok</button
						>
					</div>
				{/if}
			</div>
		</div>

		<Table
			collection="candidates"
			expand="post,icon"
			buildFields={(data: RecordModel) => {
				return [
					`${data.id}`,
					`${PB_URL}/api/files/candidates/${data.id}/${data.image}`,
					`${PB_URL}/api/files/icons/${data.expand!.icon.id}/${data.expand!.icon.icon}`,
					`${data.name}`,
					`${data.class} - ${data.section}`,
					`${data.email}`,
					`${data.expand!.post.title}`
				];
			}}
			headers={['ID', 'img:Image', 'img:Icon', 'Name', 'Class', 'Email', 'Post']}
			colWidths="7% 5% 5% 20% 10% 30% 20% 3%"
			name="candidates"
		></Table>
	</div>
</div>

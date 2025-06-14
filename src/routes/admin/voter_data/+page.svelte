<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import './style.scss';
	import Loader from '../../../components/loader.svelte';
	import { RequestedUpload } from './state';
	import Create from './components/create.svelte';
	import { FetchVoterDataLength } from './logic';
	import { PB } from '$lib/state';
	import PocketBase, { type RecordModel } from 'pocketbase';

	let voterDataLength: number = $state(0);
	let clearModal: boolean = $state(false);

	onMount(async () => {
		$Page = 'Voter Data';
		$RequestedUpload = true;
		voterDataLength = await FetchVoterDataLength($PB);
		$RequestedUpload = false;
	});

	export async function ResetData(pb: PocketBase) {
		(await pb.collection('voter_data').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('voter_data').delete(rec.id);
			}
		);

		voterDataLength = 0;
	}
</script>

{#if $RequestedUpload}
	<Loader></Loader>
{/if}

{#if clearModal}
	<div class="modal">
		<div class="modal_content">
			<p class="title">This Action Cannot Be Undone!</p>
			<p class="content">Continuing will clear all the voter data.</p>

			<button
				class="del"
				onclick={async () => {
					clearModal = false;
					$RequestedUpload = true;
					await ResetData($PB);
					$RequestedUpload = false;
				}}
			>
				Clear Data
			</button>
		</div>
	</div>
{/if}

<div class="page">
	<Sidebar></Sidebar>

	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">groups</span> Voter Data
			</p>

			<div class="election_actions">
				<button
					class="action_btn reset"
					onclick={() => {
						clearModal = true;
					}}
				>
					<span class="material-icons-outlined">delete</span> Clear Data
				</button>
				<Create></Create>
			</div>
		</div>

		<div class="summary">
			<p>{voterDataLength} entire{voterDataLength == 1 ? '' : 's'} found</p>
		</div>

		<div class="instructions">
			<p class="title">How to upload</p>
			<div class="s1">
				<p><b>Step 1:</b> Download the template</p>
				<span>
					<button
						onclick={() => {
							const blob = new Blob(["sno, name, class, section, house\n1,,,,\n"], { type: 'text/csv' });
							const url = URL.createObjectURL(blob);

							const link = document.createElement('a');
							link.href = url;
							link.download = "voter_data_template.csv";
							document.body.appendChild(link);
							link.click();
							link.remove();

							URL.revokeObjectURL(url);
						}}
					>
						<span class="material-icons-outlined">download</span> Download
					</button>
				</span>
			</div>
			<p><b>Step 2:</b> Open the template in Excel or Google Sheets to edit</p>
			<p><b>Step 3:</b> Enter the details of each voter. Type out the entire house name.</p>
			<p><b>Step 4:</b> Save the file as "CSV" without changing any configuration.</p>
			<p><b>Step 5:</b> Upload it to <i>amar vote</i> using the "Upload Voter Data" button</p>
			<p>
				<b>Step 6:</b> If you want to update the data, or upload a new list, click on the "Clear Data"
				button to delete all the uploaded data first.
			</p>

			<div class="note">
				<p class="title">Note</p>
				<ul>
					<li>Do not change the headers (sno, name, class etc.). Leave them as they are.</li>
					<li>
						The details of all voters must be put within the single sheet. Do not create addition
						sheets within the workbook
					</li>
					<li>The data entered will be stored in capital case, to ensure ease of search</li>
					<li>Refrain from using special characters, emojis, etc.</li>
				</ul>
			</div>
		</div>
	</div>
</div>

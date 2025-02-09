<script lang="ts">
	import { PB } from '$lib/state';
	import type { RecordModel } from 'pocketbase';
	import './table.scss';
	import { RefreshTable } from './state';
	import { onMount, type Snippet } from 'svelte';
	import Loader from '../../../../components/loader.svelte';

	interface Props {
		collection: string;
		buildFields: (data: RecordModel) => string[];
		headers: string[];
		colWidths: string;
		name: string;
		editSnippet?: Snippet<[string[]]>;
		expand?: string;
		noActions?: boolean;
	}

	let { collection, buildFields, headers, colWidths, name, editSnippet, expand, noActions }: Props =
		$props();

	let headersCorrected: string[] = $state([]);
	let requestedData: boolean = $state(false);

	let requestedDelete: boolean = $state(false);

	let data: string[][] = $state([]);
	let deleting: string = $state('');
	let deleteModalFlyOut: boolean = $state(false);

	onMount(() => {
		PB.subscribe(async (v) => {
			if (v === undefined) return;
			$RefreshTable = true;
		});

		RefreshTable.subscribe(async (v) => {
			headersCorrected = [];
			headers.forEach((title, i) => {
				let toPush = title;
				if (toPush.slice(0, 4) == 'img:') {
					toPush = toPush.slice(4);
				}
				headersCorrected.push(toPush);
			});

			if (v === false) return;
			data = [];
			try {
				requestedData = true;
				const rawData = await $PB.collection(collection).getFullList({ requestKey: null, expand });
				rawData.forEach((record) => {
					data.push(buildFields(record));
				});
				requestedData = false;
			} catch (e) {
				alert(`Something went wrong: ${e}`);
			}

			$RefreshTable = false;
		});
	});

	async function HandleDelete() {
		try {
			requestedDelete = true;
			if (collection === 'candidates') {
				const data = await $PB.collection(collection).getOne(deleting);
				console.log(data);
				await $PB.collection('icons').update(data.icon, { assigned: false, assigned_to: null });
			}
			await $PB.collection(collection).delete(deleting);
			deleting = '';
			$RefreshTable = true;
		} catch (e) {
			alert(e);
		} finally {
			requestedDelete = false;
		}
	}
</script>

{#if requestedDelete}
	<Loader></Loader>
{/if}

<div class="table">
	<div class="count">
		{data.length}
		{data.length === 1 ? name.toLowerCase().slice(0, name.length - 1) : name.toLowerCase()} found
		<button
			class={$RefreshTable ? 'refreshing' : ''}
			onclick={() => {
				$RefreshTable = true;
			}}><span class="material-icons">autorenew</span></button
		>
	</div>
	<div class="header" style="grid-template-columns: {colWidths};">
		{#each headersCorrected as header}
			<p class="item">{header}</p>
		{/each}
	</div>
	<div class="data">
		{#if requestedData}
			<div class="loading">
				<p class="">Loading Data...</p>
				<div class="loader"></div>
			</div>
		{:else}
			{#if data.length === 0}
				<div class="row">
					<p class="cell">No Data Found</p>
				</div>
			{/if}
			{#each data as row}
				<div class="row" style="grid-template-columns: {colWidths};">
					{#each row as cell, i}
						{#if headers[i] !== headersCorrected[i]}
							<img src={cell} alt="candidate_image" class="cell--img" />
						{:else}
							<p class="cell {i == 0 ? 'cell--dull' : ''}">
								{cell}
							</p>
						{/if}
					{/each}
					{#if !noActions}
						<div class="actions">
							{#if editSnippet}
								{@render editSnippet(row)}
							{/if}
							<div class="delete">
								<button
									onclick={() => {
										if (deleting == '') {
											deleting = row[0];
											return;
										}
									}}><span class="material-icons-outlined delete-icon">delete</span></button
								>
								{#if deleting == row[0]}
									<div class="modal {deleteModalFlyOut ? 'fly-out' : ''}">
										<div class="container">
											<div class="title_wrapper">
												<h4>Are you sure?</h4>
												<button
													class="close"
													onclick={() => {
														deleteModalFlyOut = true;

														const flyOut = setTimeout(() => {
															deleteModalFlyOut = false;
															deleting = '';
															clearTimeout(flyOut);
														}, 300);
													}}
												>
													<span class="material-icons">close</span>
												</button>
											</div>
											<p>This cannot be undone</p>
										</div>

										<button
											class="submit delete-btn"
											onclick={async () => {
												await HandleDelete();
											}}
											><span class="material-icons-outlined delete-icon">delete</span> Delete</button
										>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>

	<div class="spacer" style="height: 10svh; width: 100%;"></div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import { PB } from '$lib/state';
	import Loader from '../../../components/loader.svelte';
	import Table from '../components/table/table.svelte';
	import { type RecordModel } from 'pocketbase';
	import { RefreshTable } from '../components/table/state';

	let createPost: boolean = $state(false);

	let createPostTitle: string = $state('');
	let createHouse: string = $state('Any');

	let createError: string = $state('');

	let requestedCreate: boolean = $state(false);

	let editing: string = $state('');
	let requestedEdit: boolean = $state(false);
	let editTitle: string = $state('');
	let editHouse: string = $state('');
	let editError: string = $state('');


	let createModalFlyOut: boolean = $state(false);
	let editModalFlyOut: boolean = $state(false);

	onMount(() => {
		$Page = 'Posts';
	});

	async function HandleCreate() {
		if (createPostTitle.length == 0) {
			return (createError = 'Enter post title');
		}

		try {
			requestedCreate = true;
			await $PB.collection('posts').create({
				title: createPostTitle,
				house: createHouse
			});
			createPost = false;
		} catch {
			createError = 'Error creating post. Please try again or contact admin';
		} finally {
			requestedCreate = false;
			$RefreshTable = true;
		}
	}

	async function HandleEdit() {
		if (editTitle.length == 0) {
			return (editError = 'Enter post title');
		}

		try {
			requestedEdit = true;
			await $PB.collection('posts').update(editing, {
				title: editTitle,
				house: editHouse
			});
			editing = '';
			$RefreshTable = true;
		} catch {
			editError = 'Error creating post. Please try again or contact admin';
		} finally {
			requestedEdit = false;
		}
	}
</script>

{#if requestedCreate || requestedEdit}
	<Loader></Loader>
{/if}

<div class="page">
	<Sidebar></Sidebar>

	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">flag</span> Posts
			</p>

			<div class="create">
				<button
					class="action_btn create_post"
					onclick={() => {
						if (createPost == false) {
							return (createPost = true);
						}
						if (createPost == true) {
							createModalFlyOut = true;

							const flyOut = setTimeout(() => {
								createModalFlyOut = false;
								createPost = false;
								clearTimeout(flyOut);
							}, 300);
						}
					}}
				>
					<span class="material-icons">add</span> Create New Post
				</button>

				{#if createPost}
					<div class="create_modal {createModalFlyOut ? 'fly-out' : ''}">
						<div class="container">
							<label for="title">Post Title</label>
							<input type="text" bind:value={createPostTitle} />
						</div>
						<div class="container">
							<label for="house">House</label>
							<select name="house" bind:value={createHouse}>
								<option value="Any">Any</option>
								<option value="Rig">Rig</option>
								<option value="Yajur">Yajur</option>
								<option value="Sama">Sama</option>
								<option value="Atharvana">Atharvana</option>
							</select>
						</div>
						{#if createError}
							<p class="error">{createError}</p>
						{/if}
						<button
							class="submit"
							onclick={async () => {
								await HandleCreate();
							}}>Submit</button
						>
					</div>
				{/if}
			</div>
		</div>

		{#snippet edit(row: string[])}
			<div class="edit">
				<button
					onclick={() => {
						if (editing == '') {
							editing = row[0];
							editTitle = row[1];
							editHouse = row[2];
							return;
						}
					}}><span class="material-icons-outlined edit-icon">edit</span></button
				>
				{#if editing == row[0]}
					<div class="modal {editModalFlyOut ? 'fly-out' : ''}">
						<div class="container">
							<div class="title_wrapper">
								<label for="title">Post Title</label>
								<button
									class="close"
									onclick={() => {
										editModalFlyOut = true;

										const flyOut = setTimeout(() => {
											editModalFlyOut = false;
											editing = '';
											clearTimeout(flyOut);
										}, 300);
									}}
								>
									<span class="material-icons">close</span>
								</button>
							</div>
							<input type="text" bind:value={editTitle} />
						</div>
						<div class="container">
							<label for="house">House</label>
							<select name="house" bind:value={editHouse}>
								<option value="Any">Any</option>
								<option value="Rig">Rig</option>
								<option value="Yajur">Yajur</option>
								<option value="Sama">Sama</option>
								<option value="Atharvana">Atharvana</option>
							</select>
						</div>
						{#if editError}
							<p class="error">{editError}</p>
						{/if}
						<button
							class="submit"
							onclick={async () => {
								await HandleEdit();
							}}>Submit</button
						>
					</div>
				{/if}
			</div>
		{/snippet}

		<Table
			collection="posts"
			buildFields={(data: RecordModel) => {
				return [`${data.id}`, `${data.title}`, `${data.house}`, `${data.candidates.length}`];
			}}
			headers={['ID', 'Title', 'House', 'Candidates Count']}
			colWidths="10% 30% 20% 30% 10%"
			name="Posts"
			editSnippet={edit}
		></Table>
	</div>
</div>

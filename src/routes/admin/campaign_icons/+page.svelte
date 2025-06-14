<script lang="ts">
	import '../style.scss';
	import './style.scss';
	
	import { onMount } from 'svelte';

	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';
	import Loader from '../../../components/loader.svelte';
	import Table from '../components/table/table.svelte';
	import Create from './components/create.svelte';

	import { type RecordModel } from 'pocketbase';
	import { PB_URL } from '$lib/api';
	import { RequestedUpload } from './state';

	onMount(() => {
		$Page = 'Campaign Icons';
	});
</script>

{#if $RequestedUpload}
	<Loader></Loader>
{/if}

<div class="page">
	<Sidebar></Sidebar>

	<div class="wrapper">
		<div class="nav">
			<p class="page__title">
				<span class="material-icons-outlined">image</span> Icons
			</p>

			<Create></Create>
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

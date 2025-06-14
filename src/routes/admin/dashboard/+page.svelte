<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Sidebar from '../components/sidebar/sidebar.svelte';
	import { Page } from '../components/sidebar/state';

	import '../style.scss';
	import './style.scss';
	import { NumCandidates, NumPosts, NumVotes, NumVVMS } from './state';
	import { GetDynamicData, GetStaticData, UnsubscribeDynamic } from './logic';
	import { PB } from '$lib/state';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	import Table from '../components/table/table.svelte';
	import { FetchVoterDataLength } from '../voter_data/logic';
	import Loader from '../../../components/loader.svelte';

	let numVoters: number = $state(0);

	let requestLoad: boolean = $state(false);

	onMount(async () => {
		$Page = 'Dashboard';

		requestLoad = true;

		numVoters = await FetchVoterDataLength($PB);

		await GetStaticData($PB);
		await GetDynamicData($PB);

		requestLoad = false;

		onDestroy(() => {
			UnsubscribeDynamic($PB);
		});
	});
</script>

{#if requestLoad}
	<Loader></Loader>
{/if}

<div class="page">
	<Sidebar></Sidebar>
	<div class="wrapper">
		<div class="info">
			<div class="count">
				<p class="count__title"><span class="material-icons-outlined">flag</span>Number Of Posts</p>
				<p class="count__num">{$NumPosts}</p>
			</div>
			<div class="count">
				<p class="count__title">
					<span class="material-icons-outlined">person</span>Number Of Candidates
				</p>
				<p class="count__num">{$NumCandidates}</p>
			</div>
			<div class="count">
				<div class="count__title column">
					<span>
						<span class="material-icons-outlined">how_to_vote</span>
						 Number Of Votes Casted
					</span>
					<span>Out of {numVoters} registered voters</span>
				</div>
				<p class="count__num">{$NumVotes}</p>
			</div>
			<div class="count">
				<p class="count__title">
					<span class="material-icons-outlined">laptop</span>Number of VVM
				</p>
				<p class="count__num">{$NumVVMS}</p>
			</div>
		</div>
	</div>
</div>

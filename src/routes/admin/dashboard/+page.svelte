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

	onMount(async () => {
		$Page = 'Dashboard';

		ConnectPocketBase(PB_URL);

		GetStaticData($PB);
		GetDynamicData($PB);

		onDestroy(() => {
			UnsubscribeDynamic($PB);
		});
	});
</script>

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
				<p class="count__title">
					<span class="material-icons-outlined">how_to_vote</span>Number Of Votes Casted
				</p>
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

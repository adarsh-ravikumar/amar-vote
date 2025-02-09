<script lang="ts">
	import { onMount } from 'svelte';
	import './interface.css';
	import Acknowledgement from './pages/ack.svelte';
	import Cover from './pages/cover.svelte';
	import Positions from './pages/positions.svelte';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	import type { RecordModel } from 'pocketbase';
	import { PB } from '$lib/state';
	import { AnalyticsData, PositionsData, ResultsData } from './pages/state';
	import Results from './pages/results.svelte';
	import Analytics from './pages/analytics.svelte';
	import Conclusion from './pages/conclusion.svelte';

	let posts: RecordModel[] = $state([]);

	let loadComplete: boolean = $state(false);

	onMount(() => {
		ConnectPocketBase(PB_URL);
		PB.subscribe(async () => {
			if (!$PB) return;
			posts = await $PB
				.collection('posts')
				.getFullList({ requestKey: null, expand: 'candidates, candidates.icon' });

			$PositionsData = [];
			$ResultsData = [];
			posts.forEach((post) => {
				// positions
				$PositionsData.push({
					pos: post.title,
					can: post.candidates.length
				});

				// results
				let winner: null | RecordModel = null;
				let candidates: { name: string; image: string; icon: string; votes: string }[] = [];

				if (post.expand!.candidates) {
					post.expand!.candidates.forEach((candidate: RecordModel) => {
						if (!winner || candidate.votes > winner.votes) winner = candidate;

						candidates.push({
							name: candidate.name,
							image: `${PB_URL}/api/files/candidates/${candidate.id}/${candidate.image}`,
							icon: `${PB_URL}/api/files/icons/${candidate.expand!.icon.id}/${candidate.expand!.icon.icon}`,
							votes: candidate.votes
						});
					});

					$ResultsData.push({
						pos: post.title,
						name: winner!.name,
						image: `${PB_URL}/api/files/candidates/${winner!.id}/${winner!.image}`,
						icon: `${PB_URL}/api/files/icons/${winner!.expand!.icon.id}/${winner!.expand!.icon.icon}`
					});

					$AnalyticsData.push({
						pos: post.title,
						candidates: candidates
					});
				}
			});

			loadComplete = true;

			setTimeout(() => {
				print();
			}, 5000);
		});
	});
</script>

<svelte:head>
	{#if loadComplete}
		<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
	{/if}
</svelte:head>

{#if loadComplete}
	<Cover />
	<Acknowledgement />
	<Positions />
	<Results />
	<Analytics />
	<Conclusion />
{:else}
	<div class="print__loading">
		<p >Generating Report...</p>
		<div class="print__loader"></div>
	</div>
{/if}

<style lang="scss">
	@use '../../../../styles/vars' as *;

	@page {
		@bottom-center {
			font-family: 'PT Serif Caption', serif;
			content: 'Page ' counter(page) ' of ' counter(pages);
		}
	}

	.print__loading {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 2rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	// src: https://css-loaders.com/circle/
	.print__loader {
		width: 65px;
		aspect-ratio: 1;
		position: relative;
		scale: 50%;
	}
	.print__loader:before,
	.print__loader:after {
		content: '';
		position: absolute;
		border-radius: 50px;
		box-shadow: 0 0 0 3px inset $latte-text;
		animation: l4 2.5s infinite;
	}
	.print__loader:after {
		animation-delay: -1.25s;
	}
	@keyframes l4 {
		0% {
			inset: 0 35px 35px 0;
		}
		12.5% {
			inset: 0 35px 0 0;
		}
		25% {
			inset: 35px 35px 0 0;
		}
		37.5% {
			inset: 35px 0 0 0;
		}
		50% {
			inset: 35px 0 0 35px;
		}
		62.5% {
			inset: 0 0 0 35px;
		}
		75% {
			inset: 0 0 35px 35px;
		}
		87.5% {
			inset: 0 0 35px 0;
		}
		100% {
			inset: 0 35px 35px 0;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Posts } from './state';
	import { GetPosts } from './logic';
	import { PB } from '$lib/state';
	import { ConnectPocketBase, PB_URL } from '$lib/api';

	let loadingPosts: boolean = $state(false);

	onMount(async () => {
		ConnectPocketBase(PB_URL);
		loadingPosts = true;
		$Posts = await GetPosts($PB);
		loadingPosts = false;
		$PB.collection('candidates').subscribe('*', async () => {
			$Posts = await GetPosts($PB);
		});
	});
</script>

{#if loadingPosts}
	<div class="loading">
		<p class="">Loading Data...</p>
		<div class="loader"></div>
	</div>
{/if}
{#if !loadingPosts && $Posts!.length === 0}
	<div class="loading">
		<p>No Data Found</p>
	</div>
{/if}
<div class="post_results">
	{#each $Posts as post}
		{@const titleColor = post.house.toLowerCase()}
		<div class="post">
			<p class="title {titleColor}">{post.title}</p>
			<div class="container">
				{#each post.candidates as candidate}
					<div class="candidate">
						<p class="name">{candidate.name}</p>
						<p class="class">{candidate.class}</p>
						<div class="info">
							<div class="images">
								<img src={candidate.image} alt="candidate " class="img" />
								<img src={candidate.icon} alt="icon" class="icon" />
							</div>
						</div>
					</div>
					<div class="votes" style="width: {(parseInt(candidate.votes) / post.maxVotes) * 100}%">
						<p class="num_votes">{candidate.votes}</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '../../../../styles/vars' as *;

	.post_results {
		width: 100%;
		overflow: scroll;
		min-height: fit-content;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin-top: 1rem;
		gap: 2rem;
		padding-inline: 0.5rem;

		.post {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			.title {
				width: 100%;
				text-align: center;
				padding: 0.5rem;
				background: $latte-teal;
				color: white;
				border-radius: 0.3rem;
				font-weight: 600;

				&.rig {
					background: $latte-maroon;
				}

				&.yajur {
					background: $latte-yellow;
					color: $latte-text;
				}

				&.sama {
					background: $latte-sky;
				}

				&.atharvana {
					background: $latte-green;
				}
			}

			.container {
				display: grid;
				grid-template-columns: 20% 80%;
				gap: 2rem 2rem;
				width: 100%;
				align-items: center;
				.candidate {
					width: fit-content;

					.name {
						font-size: 1rem;
						font-weight: 500;
						line-height: 0.9;
						white-space: nowrap;
					}

					.class {
						font-size: 0.8rem;
						font-weight: 400;
					}

					.info {
						display: flex;

						.images {
							display: flex;
							gap: 0.5rem;

							img {
								border-radius: 0.3rem;
								width: 3rem;
								aspect-ratio: 1;
								object-fit: cover;
							}
						}
					}
				}

				.votes {
					height: fit-content;
					background: $latte-sapphire;
					padding: 0.2rem;
					border-radius: 0.3rem;
					max-width: 90%;
					min-width: fit-content;

					.num_votes {
						text-align: right;
						color: white;
						font-weight: 600;
						margin-right: 0.5rem;
						font-size: 0.8rem;
					}
				}

				position: relative;
				.candidate::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateY(1rem) translateX(-50%);

					background: rgba(0, 0, 0, 0.062);
					width: 100%;
					height: 2px;
				}
			}
		}
	}

	.loading {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	// src: https://css-loaders.com/circle/
	/* HTML: <div class="loader"></div> */
	.loader {
		width: 65px;
		aspect-ratio: 1;
		position: relative;
		scale: 50%;
	}
	.loader:before,
	.loader:after {
		content: '';
		position: absolute;
		border-radius: 50px;
		box-shadow: 0 0 0 3px inset $latte-text;
		animation: l4 2.5s infinite;
	}
	.loader:after {
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

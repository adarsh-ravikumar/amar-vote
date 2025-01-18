<script lang="ts">
	import type PocketBase from 'pocketbase';
	import { CreateVoter, GetVVM, SendVoterData, type VoterData } from './logic';
	import { Machine } from './state';
	import { PB } from '$lib/state';

	let name: string = $state('');
	let _class: string = $state('');
	let sec: string = $state('');
	let house: string = $state('');

	async function RegisterVoter() {
		if (!name || !_class || !sec || !house) return;
		const data: VoterData = {
			id: undefined,
			class: _class,
			section: sec,
			name,
			house
		};

		// create voter
		const voter = await CreateVoter($PB, data);

		// check for free machines
		// if no machine free, keep polling and keep waiting
		GetVVM($PB);

		// once machine free, send voter data to the machine
		Machine.subscribe(async (vvm) => {
			if (!vvm) return;
			await SendVoterData($PB, voter);
		});

		// clear
		name = '';
		house = '';
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=how_to_vote"
	/>
</svelte:head>

<div class="wrapper">
	{#if $Machine}
		<div class="modal">
			<div class="modal_content">
				{#if !$Machine!.id}
					<p class="content wait_text">Waiting for a machine</p>
					<p class="content">This won't take long...</p>
					<div class="loader"></div>
				{:else}
					<p class="content">Your machine is</p>
					<p class="content_display">
						{`${$Machine.machine_num}`.length == 1 ? '0' : ''}{$Machine.machine_num}
					</p>
					<button
						class="reg"
						onclick={() => {
							$Machine = undefined;
						}}>Proceed To Vote</button
					>
				{/if}
			</div>
		</div>
	{/if}
	<div class="form">
		<img src="/logo_light.svg" alt="amar_logo" />
		<div class="container">
			<label for="name">Name</label>
			<input type="text" name="name" bind:value={name} />
		</div>

		<div class="row">
			<div class="container">
				<label for="class">Class</label>
				<input type="text" name="class" bind:value={_class} />
			</div>

			<div class="container">
				<label for="sec">Section</label>
				<select name="section" bind:value={sec}>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
					<option value="D">D</option>
				</select>
			</div>
		</div>

		<div class="row">
			<button
				class={`house house__r ${house == 'r' ? 'house--sel' : ''}`}
				onclick={() => (house = 'r')}>R</button
			>
			<button
				class={`house house__y ${house == 'y' ? 'house--sel' : ''}`}
				onclick={() => (house = 'y')}>Y</button
			>
			<button
				class={`house house__s ${house == 's' ? 'house--sel' : ''}`}
				onclick={() => (house = 's')}>S</button
			>
			<button
				class={`house house__a ${house == 'a' ? 'house--sel' : ''}`}
				onclick={() => (house = 'a')}>A</button
			>
		</div>

		<button class="reg" onclick={RegisterVoter}
			><span class="material-symbols-outlined"> how_to_vote </span> Register Voter</button
		>
	</div>
</div>

<style lang="scss">
	@use '../../styles/vars' as *;

	.wrapper {
		display: grid;
		height: 100svh;
		place-content: center;
	}

	.modal {
		z-index: 5;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(41, 43, 57, 0.9);
		width: 100vw;
		height: 100vh;
		display: grid;
		place-content: center;

		.modal_content {
			background: $latte-base;
			width: fit-content;
			padding: 3rem 10rem;
			border-radius: 0.3rem;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			text-align: center;

			.content_display {
				font-size: clamp(150px, 10vw, 250px);
				margin-top: 1rem;
			}

			button {
				margin-inline: auto;
				margin-block: 2rem;
				padding-inline: 2rem;
			}

			.wait_text {
				font-size: 1.5rem;
				font-weight: 600;
			}

			// src: https://css-loaders.com/circle/
			/* HTML: <div class="loader"></div> */
			.loader {
				width: 65px;
				aspect-ratio: 1;
				position: relative;
				margin-inline: auto;
				margin-block: 2rem;
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
		}
	}

	button {
		cursor: pointer;
		transition: scale 0.1s ease;

		&:hover {
			scale: 105%;
		}

		&:active {
			scale: 100%;
		}
	}

	.form {
		width: fit-content;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		img {
			width: 70%;
			margin-inline: auto;
		}

		.row {
			display: flex;
			justify-content: space-between;
		}

		.container {
			display: flex;
			flex-direction: column;
			gap: 0.3rem;
		}

		input {
			outline: 1px solid $latte-overlay0;
			border: none;
			border-radius: 0.2rem;
			padding: 0.5rem 0.5rem;
			font-size: 1.1rem;

			&[name='class'] {
				width: 80%;
			}
		}

		select {
			outline: 1px solid $latte-overlay0;
			border: none;
			border-radius: 0.2rem;
			padding: 0.5rem 0.5rem;
			height: 100%;
			font-size: 1.1rem;
			background: white;
		}

		.house {
			margin-block: 1rem;
			aspect-ratio: 1;
			padding: 2rem;

			display: grid;
			place-content: center;

			font-size: 1.2rem;
			font-weight: 600;

			color: white;

			outline: none;
			border: none;
			border-radius: 0.2rem;

			&.house--sel {
				outline: 5px solid $latte-subtext0;
				scale: 105%;
			}

			&.house__r {
				background: $latte-maroon;
			}

			&.house__y {
				background: $latte-yellow;
			}

			&.house__s {
				background: $latte-sky;
			}

			&.house__a {
				background: $latte-green;
			}
		}
	}

	.reg {
		outline: none;
		border: none;
		background: $latte-teal;
		padding: 0.5rem;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		border-radius: 0.2rem;
		cursor: pointer;

		&,
		span {
			color: white;
		}
	}
</style>

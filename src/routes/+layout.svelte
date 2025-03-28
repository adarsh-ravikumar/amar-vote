<script lang="ts">
	import '../styles/global.scss';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	import { onMount } from 'svelte';
	import { LoggedIn } from '$lib/state';

	let { children } = $props();
	let pwd: string = $state('');
	let wrongPass: boolean = $state(false);

	onMount(() => {
		ConnectPocketBase(PB_URL);
		if (localStorage.getItem('logedin') == 'true') {
			$LoggedIn = true;
		}
	});

	function Password() {
		if (pwd === 'vote@chinmaya') {
			$LoggedIn = true;
			localStorage.setItem('logedin', 'true');
		} else {
			wrongPass = true;
		}
	}
</script>

{#if $LoggedIn}
	{@render children()}
{:else}
	<div class="login">
		<img src="/amar_school_branded.png" alt="amar_logo" />
		<div class="container">
			<label for="pass">Password</label>
			<input type="password" bind:value={pwd} />
		</div>
		{#if wrongPass}
			<p class="error">Wrong password</p>
		{/if}
		<button onclick={Password}>Login <span class="material-icons">login</span></button>
	</div>
{/if}

<style lang="scss">
	@use '../styles/vars' as *;

	.login {
		display: flex;
		flex-direction: column;
		
    width: 30%;

		@media only screen and (max-width: 800px) {
			width: 90%;
		}
    
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		gap: 2rem;

		img {
			width: 100%;
		}

		.container {
			display: flex;
			flex-direction: column;
			gap: 0.3rem;
		}

		.error {
			color: $latte-red;
			text-align: center;
		}

		input {
			outline: 1px solid $latte-overlay0;
			border: none;
			border-radius: 0.2rem;
			padding: 0.5rem 0.5rem;
			font-size: 1.1rem;
		}

		button {
			cursor: pointer;
			transition: scale 0.1s ease;
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

			&:hover {
				scale: 105%;
			}

			&:active {
				scale: 100%;
			}
		}
	}
</style>

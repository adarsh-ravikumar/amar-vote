<script lang="ts">
	import { onMount } from 'svelte';
	import './style.scss';
	import { FetchIcon, FetchPosts } from './logic';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	import { PB } from '$lib/state';
	import { CandidateData, Icon, Posts, ShowModal } from './state';
	import Modal from './components/modal/modal.svelte';
	import Loader from '../../../components/loader.svelte';

	let name: string = $state('');
	let _class: string = $state('');
	let sec: string = $state('');
	let post: string = $state('');
	let email: string = $state('');

	let requestedPosts: boolean = $state(false);
	let noIcon: boolean = $state(false);

	onMount(async () => {
		ConnectPocketBase(PB_URL);
		requestedPosts = true;

		try {
			$Icon = await FetchIcon($PB);
			noIcon = false;
		} catch (e) {
			noIcon = true;
		}
		
		await FetchPosts($PB);
		requestedPosts = false;
	});

	function ContinueForm() {
		if (!name || !_class || !sec || !post || !email) return ($ShowModal = true);
		$CandidateData = {
			name: name,
			class: _class,
			section: sec,
			post: post,
			email: email,
			image: '',
			icon: ''
		};
		$ShowModal = true;
	}
</script>

{#if requestedPosts}
	<Loader></Loader>
{/if}

{#if noIcon}
	<div class="page">
		<div class="form">
			<img class="logo" src="/amar_school_branded_nocredit.png" alt="amar_logo" />
			<img class="credit" src="/credit.png" alt="amar_logo" />
			<div style="text-align: center;">
				<h2>No campaign icons found!</h2>
				<h4> Upload more campaign icons in the admin panel to continue...</h4>
			</div>
		</div>
	</div>
{/if}

{#if Object.keys($Posts).length > 0 && !noIcon}
	{#if $ShowModal}
		<Modal />
	{/if}
	<div class="page">
		<div class="form">
			<img class="logo" src="/amar_school_branded_nocredit.png" alt="amar_logo" />
			<img class="credit" src="/credit.png" alt="amar_logo" />

			<p class="page__title">Register Candidate</p>
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

			<div class="container">
				<label for="posts">Post</label>
				<select name="posts" bind:value={post}>
					{#each Object.keys($Posts) as post}
						<option value={post}>{$Posts[post]}</option>
					{/each}
				</select>
			</div>

			<div class="container">
				<label for="name">E-mail</label>
				<input type="email" name="name" bind:value={email} />
			</div>
		</div>

		<button class="continue" onclick={ContinueForm}>
			Continue <span class="material-icons"> arrow_forward_ios </span>
		</button>
	</div>
{/if}

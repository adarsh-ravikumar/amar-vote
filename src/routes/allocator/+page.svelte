<script lang="ts">
	import './style.scss';
	import { CreateVoter, CheckIfVoted, GetVVM, SendVoterData, type VoterData } from './logic';
	import { Machine } from './state';
	import { PB } from '$lib/state';

	let name: string = $state('');
	let _class: string = $state('');
	let sec: string = $state('');
	let house: string = $state('');

	let dataNotFilled: boolean = $state(false);
	let alreadyVoted: boolean = $state(false);
	let showModal: boolean = $state(false);

	const HOUSE_RIG = 'Rig';
	const HOUSE_SAMA = 'Sama';
	const HOUSE_YAJUR = 'Yajur';
	const HOUSE_ATHARVANA = 'Atharvana';

	async function RegisterVoter() {
		if (!name || !_class || !sec || !house) {
			dataNotFilled = true;
			showModal = true;
			return;
		}

		const data: VoterData = {
			id: undefined,
			class: _class,
			section: sec,
			name,
			house
		};

		// check if voter already voted. if yes, then display an error
		const hasVoted = await CheckIfVoted($PB, data);
		if (hasVoted) {
			alreadyVoted = true;
			showModal = true;
			return;
		}

		// create voter
		const voter = await CreateVoter($PB, data);
		showModal = true;
		// check for free machines
		// if no machine free, keep polling and keep waiting
		GetVVM($PB);

		// once machine free, send voter data to the machine
		Machine.subscribe(async (vvm) => {
			if (!vvm) return;
			await SendVoterData($PB, voter);
			showModal = true;
		});

		// clear
		name = '';
		house = '';
	}
</script>

<div class="wrapper">
	{#if showModal}
		<div class="modal">
			<div class="modal_content">
				{#if dataNotFilled}
					<p class="content wait_text">Incomplete Data</p>
					<p class="content">
						Please ensure that all the fields are filled before registering to vote.
					</p>
					<button
						class="reg"
						onclick={() => {
							dataNotFilled = false;
							showModal = false;
						}}>Ok</button
					>
				{:else if alreadyVoted}
					<p class="content wait_text">You have already Voted!</p>
					<p class="content">
						If you think this is a mistake, kindly approach a member of the Student Elections
						Department
					</p>
					<button
						class="reg"
						onclick={() => {
							alreadyVoted = false;
							showModal = false;
						}}>Ok</button
					>
				{:else if $Machine}
					{#if !$Machine!.id}
						<p class="content wait_text">Waiting for a machine</p>
						<p class="content">This won't take long...</p>
						<div class="loader"></div>
					{:else}
						<p class="content">Your machine is</p>
						<p class="content_display">
							{`${$Machine!.machine_num}`.length == 1 ? '0' : ''}{$Machine!.machine_num}
						</p>
						<button
							class="reg"
							onclick={() => {
								$Machine = undefined;
								showModal = false;
							}}>Proceed To Vote</button
						>
					{/if}
				{/if}
			</div>
		</div>
	{/if}
	<div class="form">
		<img src="/amar_school_branded.png" alt="amar_logo" />
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
				class={`house house__r ${house == HOUSE_RIG ? 'house--sel' : ''}`}
				onclick={() => (house = HOUSE_RIG)}>R</button
			>
			<button
				class={`house house__y ${house == HOUSE_YAJUR ? 'house--sel' : ''}`}
				onclick={() => (house = HOUSE_YAJUR)}>Y</button
			>
			<button
				class={`house house__s ${house == HOUSE_SAMA ? 'house--sel' : ''}`}
				onclick={() => (house = HOUSE_SAMA)}>S</button
			>
			<button
				class={`house house__a ${house == HOUSE_ATHARVANA ? 'house--sel' : ''}`}
				onclick={() => (house = HOUSE_ATHARVANA)}>A</button
			>
		</div>

		<button class="reg" onclick={RegisterVoter}
			><span class="material-icons"> how_to_vote </span> Register Voter</button
		>
	</div>
</div>

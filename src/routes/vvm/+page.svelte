<script lang="ts">
	import './style.scss';

	import { onMount } from 'svelte';
	import { ConnectVVM, WatchForVoterInfo } from './logic';
	import { PB } from '$lib/state';
	import { Voter, VVM } from './state';
	import { goto } from '$app/navigation';

	onMount(() => {
		ConnectVVM($PB);
		WatchForVoterInfo($PB);
	});
</script>

{#if $VVM}
	<div class="wrapper">
		{#if !$VVM.session_active}
			<p class="content">Machine Number</p>
			<p class="content_display">
				{`${$VVM.machine_num}`.length == 1 ? '0' : ''}{$VVM.machine_num}
			</p>

			<div class="locked">
				<span class="material-icons"> lock </span>
				<p class="content">Locked</p>
			</div>
		{:else if $Voter}
			<div class="row">
				<div class="col">
					<p class="content">Machine Number</p>
					<p class="content_display">
						{`${$VVM.machine_num}`.length == 1 ? '0' : ''}{$VVM.machine_num}
					</p>
				</div>
				<div class="col">
					<div class="details">
						<p class="title">Voter Information</p>
						<p class="content"><strong>Name:</strong>{$Voter.name}</p>
						<p class="content"><strong>Class:</strong>{$Voter.class} {$Voter.section}</p>
						<p class="content"><strong>House:</strong>{$Voter.house}</p>
					</div>
					<button
						class="vote"
						onclick={() => {
							goto('/vvm/vote');
						}}><span class="material-icons"> how_to_vote </span>Proceed To Vote</button
					>
				</div>
			</div>

		{/if}

		<img src="/amar_school_branded.png" alt="amar_logo" />
	</div>
{/if}

<script lang="ts">
	import { goto } from '$app/navigation';
	import './style.scss';

	let confirmed: boolean = $state(false);
</script>

<div class="page">
	<p class="page__title">Instructions For Voter</p>
	<div class="sec">
		<p class="sec__title">General Instructions</p>
		<ul style="list-style: none">
			<li>
				<strong>✔ Vote Honestly </strong>– Choose the candidate you truly believe will improve the
				school.
			</li>
			<li>
				<strong>✔ One Vote Per Person</strong> – You can only vote once; duplicate votes cannot be cast
			</li>
			<li>
				<strong>✔ Respect Others’ Choices</strong> – Everyone has the right to vote freely, so avoid
				influencing or pressuring others.
			</li>
			<li>
				<strong>✔ Keep It Fair</strong> – Do not attempt to cheat, manipulate, or interfere with the
				voting process.
			</li>
		</ul>
	</div>

	<hr />

	<div class="sec">
		<p class="sec__title">How To Vote</p>
		<p class="sec__sub">Step 1. Select a Candidate</p>
		<ul>
			<li>
				Candidates for the position will be displayed with their name, photo, and campaign icon.
			</li>
			<li>
				Click the "Vote" button under your chosen candidate. This will grey out other options, but
				you can change your selection by clicking another candidate’s "Vote" button.
			</li>
		</ul>
		<p class="sec__sub">Step 2. Proceed to Next Position</p>
		<ul>
			<li>
				Once you’ve made your choice, click "Next" to move to the next position. You can always use
				the previous button to come back to the positions that you have already voted for.
			</li>
			<li>Repeat the process for all positions.</li>
		</ul>
		<p class="sec__sub">Step 3. Review & Submit</p>
		<ul>
			<li>At the end, you’ll see a summary of all your choices.</li>
			<li>If everything looks good, click "Submit Vote" to finalize your selections.</li>
		</ul>
	</div>

	<hr />

	<div class="continue">
		<div class="check">
			<input type="checkbox" bind:checked={confirmed} /> I have read and understood all the instructions
		</div>
		<button
			class={!confirmed ? 'disabled' : ''}
			onclick={() => {
				if (!confirmed) return;
				goto('/vvm/vote');
			}}>Continue <span class="material-icons">arrow_forward_ios</span></button
		>
	</div>
</div>

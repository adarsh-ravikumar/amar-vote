<script>
	import { goto } from '$app/navigation';
</script>

<div class="grid">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="card"
		onclick={() => {
			goto('/admin');
		}}
	>
		<span class="material-icons">settings</span>
		<p>Admin</p>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="card"
		onclick={() => {
			goto('/allocator');
		}}
	>
		<span class="material-icons">ballot</span>
		<p>Allocator</p>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="card"
		onclick={() => {
			goto('/vvm');
		}}
	>
		<span class="material-icons">how_to_vote</span>
		<p>VVM</p>
	</div>
</div>

<style lang="scss">
	@use '../styles/vars' as *;
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		height: 50vh;
		width: 70vw;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		.card {
			cursor: pointer;
			background: $latte-crust;
			display: grid;
			gap: 2rem;
			place-items: center;
			place-content: center;
			border-radius: 0.5rem;

			transition: scale 0.2s ease;

			&:hover {
				scale: 110%;
			}

			span {
				font-size: 5rem;
			}

			p {
				font-size: 2rem;
				font-weight: 600;
			}
		}
	}
</style>

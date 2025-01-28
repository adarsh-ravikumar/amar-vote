<script lang="ts">
	import '../styles/global.scss';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	ConnectPocketBase(PB_URL);
</script>

<slot></slot>

<p class="credits">Made with ❤️ by <span>Adarsh Ravikumar</span> - Batch of 2025</p>

<style lang="scss">
	@use '../styles/vars' as *;
	
	.credits {
		position: fixed;
		bottom: 0;
		right: 0;
		font-size: 1.1rem;
		font-weight: 500;
		padding: 0.2rem;

		span {
			color: $latte-blue;
			font-weight: 600;
		}
	}
</style>

<script lang="ts">
	import '../styles/global.scss';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	import { onMount } from 'svelte';

	onMount(() => {
		ConnectPocketBase(PB_URL);
	});
</script>

<slot></slot>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { Page } from './state';

	interface Props {
		icon: string;
		text: string;
	}

	let { icon, text }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="item {$Page == text ? 'item--selected' : ''}"
	onclick={() => {
		goto(`/admin/${text.toLowerCase().replaceAll(' ', '_')}`);
	}}
>
	<span class="material-icons-outlined">{icon}</span>
	{text}
</div>

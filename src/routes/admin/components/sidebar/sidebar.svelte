<script lang="ts">
	import Item from './item.svelte';
	import './style.scss';
</script>

<div class="sidebar">
	<div class="logo">
		<img src="/amar_school_branded_nocredit.png" alt="logo" />
		<img src="/credit.png" alt="logo" />
	</div>

	<div class="items">
		<Item icon="dashboard" text="Dashboard" />
		<Item icon="list_alt" text="Results" />
		<Item icon="flag" text="Posts" />
		<Item icon="person" text="Candidates" />
		<Item icon="image" text="Campaign Icons" />
		<Item icon="groups" text="Voter Data" />
	</div>

</div>

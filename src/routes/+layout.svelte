<script lang="ts">
	import '../styles/global.scss';
	import { ConnectPocketBase, PB_URL } from '$lib/api';
	ConnectPocketBase(PB_URL);
</script>

<slot></slot>

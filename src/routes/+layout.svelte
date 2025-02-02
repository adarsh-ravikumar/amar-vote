<script lang="ts">
	import '../styles/global.scss';
	import { ConnectPocketBase } from '$lib/api';
	ConnectPocketBase('http://127.0.0.1:8090');
</script>

<slot></slot>
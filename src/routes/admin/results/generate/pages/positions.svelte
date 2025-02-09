<script lang="ts">
	import { PositionsData } from './state';
</script>

<div class="page">
	<p class="title">Positions</p>

	<table>
		<thead>
			<tr>
				<th>S.No</th>
				<th>Position</th>
				<th>No. Candidates</th>
			</tr>
		</thead>
		<tbody>
			{#each $PositionsData as position, i}
				<tr>
					<td>{i + 1}</td>
					<td>{position.pos}</td>
					<td>{position.can}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	* {
		font-family: 'PT Serif Caption', serif;
		color: black;
	}

	.title {
		font-size: 1.3rem;
		font-weight: bold;
		text-decoration: underline;
		text-align: center;
		margin-bottom: 0.5rem;
	}
	.page {
		break-after: always;
		break-inside: avoid;
	}

	table {
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		border: 1px solid black;

		th,
		td {
			padding: 0.5rem;
			border: 1px solid black;
		}

		thead {
			background-color: rgb(221, 221, 221);
			th:nth-child(1) {
				width: 10%;
			}

			th:nth-child(2) {
				width: 60%;
			}

			th:nth-child(3) {
				width: 30%;
			}
		}

		tbody {
			td:nth-child(1),
			td:nth-child(3) {
				text-align: center;
			}
			td:nth-child(1) {
				background-color: rgb(240, 240, 240);
				font-weight: bolder;
			}
		}
	}
</style>

<script lang="ts">
	import { PositionsData, ResultsData } from './state';
</script>

<div class="page page--center">
	<p>RESULTS</p>
</div>

<div class="page">
	<p class="title">Results</p>

	<table>
		<thead>
			<tr>
				<th>S.No</th>
				<th>Position</th>
				<th>Name</th>
				<th>Icon</th>
				<th>Image</th>
			</tr>
		</thead>
		<tbody>
			{#each $ResultsData as res, i}
				<tr>
					<td>{i + 1}</td>
					<td>{res.pos}</td>
					<td>{res.name}</td>
					<td><img src={res.icon} alt="campaign icon" /></td>
					<td><img src={res.image} alt="candidate" /></td>
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

	.page--center {
		display: grid;
		place-items: center;
        height: 100%;
		p {
			font-size: 3rem;
			font-weight: bolder;
		}
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
			text-align: center;
		}

		thead {
			background-color: rgb(221, 221, 221);
			th:nth-child(1) {
				width: 10%;
			}

			th:nth-child(2) {
				width: 35%;
			}

			th:nth-child(3) {
				width: 30%;
			}

			th:nth-child(4) {
				width: 15%;
			}

			th:nth-child(5) {
				width: 15%;
			}
		}

		tbody {
			td {
				vertical-align: center;

				img {
					width: 100%;
					aspect-ratio: 1;
					object-fit: cover;
					border-radius: 0.3rem;
				}
			}

			td:nth-child(1) {
				background-color: rgb(240, 240, 240);
				font-weight: bolder;
			}
		}
	}
</style>

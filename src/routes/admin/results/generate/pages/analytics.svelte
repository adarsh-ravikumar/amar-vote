<script lang="ts">
	import { AnalyticsData, PositionsData, ResultsData } from './state';
</script>

<div class="print__page page--center">
	<p>ANALYTICS</p>
</div>

{#each $AnalyticsData as post}
	<div class="print__page">
		<p class="print__title">{post.pos}</p>

		<table>
			<thead>
				<tr>
					<th>S.No</th>
					<th>Image</th>
					<th>Icon</th>
					<th>Name</th>
					<th>Votes</th>
				</tr>
			</thead>
			<tbody>
				{#each post.candidates as res, i}
					<tr>
						<td>{i + 1}</td>
						<td><img src={res.image} alt="candidate" /></td>
						<td><img src={res.icon} alt="campaign icon" /></td>
						<td>{res.name}</td>
						<td>{res.votes}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<hr />
	</div>
{/each}

<style lang="scss">
	* {
		font-family: 'PT Serif Caption', serif;
		color: black;
	}

	.print__title {
		font-size: 1.3rem;
		font-weight: bold;
		text-decoration: underline;
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.print__page {
		break-inside: avoid;
	}

	.page--center {
		break-after: always;
		break-inside: avoid;

		display: grid;
		place-items: center;
		height: 100%;

		p {
			font-size: 3rem;
			font-weight: bolder;
		}
	}

	hr {
		margin-top: 3rem;
        opacity: 0;
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
				width: 15%;
			}

			th:nth-child(3) {
				width: 15%;
			}

			th:nth-child(4) {
				width: 40%;
			}

			th:nth-child(5) {
				width: 20%;
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

<div class="wrapper">
	<div class="container">
		<img class="logo" src="/amar_school_branded.png" alt="amar_logo" />
		<div class="loader"></div>
		<div class="text">
			<p class="title">Processing Your Request...</p>
			<p class="sub">This won't take long</p>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../styles/vars' as *;
	.wrapper {
		display: grid;
		place-content: center;
		height: 100svh;
		width: 100svw;
		text-align: center;
		gap: 2rem;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.3);
        z-index: 10;
	}

    .container {
        background: $latte-base;
        padding: 2rem 5rem;
        border-radius: 0.3rem;
    }

	.logo {
		width: 40vw;
	}
	.title {
		font-size: 1.4rem;
		font-weight: 600;
	}
	.sub {
		font-size: 1.2rem;
		font-weight: 400;
	}
	// src: https://css-loaders.com/circle/
	/* HTML: <div class="loader"></div> */
	.loader {
		width: 65px;
		aspect-ratio: 1;
		position: relative;
		margin-inline: auto;
		margin-block: 2rem;
	}
	.loader:before,
	.loader:after {
		content: '';
		position: absolute;
		border-radius: 50px;
		box-shadow: 0 0 0 3px inset $latte-text;
		animation: l4 2.5s infinite;
	}
	.loader:after {
		animation-delay: -1.25s;
	}
	@keyframes l4 {
		0% {
			inset: 0 35px 35px 0;
		}
		12.5% {
			inset: 0 35px 0 0;
		}
		25% {
			inset: 35px 35px 0 0;
		}
		37.5% {
			inset: 35px 0 0 0;
		}
		50% {
			inset: 35px 0 0 35px;
		}
		62.5% {
			inset: 0 0 0 35px;
		}
		75% {
			inset: 0 0 35px 35px;
		}
		87.5% {
			inset: 0 0 35px 0;
		}
		100% {
			inset: 0 35px 35px 0;
		}
	}
</style>

<script>
	import Layout from "./components/Layout.svelte";
</script>

<style global lang="postcss">
	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
	@tailwind base;
	@tailwind components;
	/* purgecss end ignore */

	@tailwind utilities;
	body {
		background-color: #1c1917;
	}
</style>

<main>
	<Layout />
</main>

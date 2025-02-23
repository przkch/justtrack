<script lang="ts">
	import type { watchlistT } from '$lib/server/db/schema';

	import { Button, Dialog } from 'm3-svelte';
	import { onMount } from 'svelte';

	let { open = $bindable(), name, itemId } = $props();

	let watchlists: (typeof watchlistT.$inferSelect)[] | undefined = $state();
	let selectedWatchlist: number | undefined = $state();

	onMount(async () => {
		watchlists = await fetch('/api/watchlists').then((res) => res.json());
	});

	const onsubmit = async (event: MouseEvent) => {
		const url = `/api/watchlists/${selectedWatchlist}/item/${itemId}`;
		console.log(url);

		const res = await fetch(url, {
			method: 'PUT'
		});

		console.log(res);
	};
</script>

<Dialog bind:open headline={`Add ${name} to watchlist`}>
	<form>
		{#if watchlists}
			<select bind:value={selectedWatchlist}>
				{#each watchlists as watchlist (watchlist.watchlistId)}
					<option value={watchlist.watchlistId}>{watchlist.name}</option>
				{/each}
			</select>
		{/if}
	</form>
	<svelte:fragment slot="buttons">
		<Button type="elevated" on:click={onsubmit}>Add</Button>
	</svelte:fragment>
</Dialog>

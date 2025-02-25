<script lang="ts">
	import { page } from '$app/state';
	import MaterialSymbolsPerson from '~icons/material-symbols/person';

	const user = page.data.session?.user;
	const initials = ((): string | undefined => {
		if (user?.name) {
			let userName = user?.name?.toUpperCase().split(' ');
			if (userName?.length > 1) {
				return `${userName[0][0]}${userName[1][0]}`;
			}
		}
	})();
</script>

{#if user?.image}
	<img
		src={user.image}
		class="max-h-10 min-h-10 max-w-10 min-w-10 rounded-full"
		alt="User Avatar"
	/>
{:else}
	<div
		class="flex size-8 items-center justify-center rounded-full p-5"
		style:background-color="rgb(var(--m3-scheme-surface-container-low))"
	>
		{#if initials}
			{initials}
		{:else}
			<MaterialSymbolsPerson />
		{/if}
	</div>
{/if}

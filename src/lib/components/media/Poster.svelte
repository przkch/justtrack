<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {
		posterPath?: string | null;
	}

	const { alt, posterPath, class: className, ...rest }: Props = $props();
</script>

{#if posterPath}
	<img
		src={`https://image.tmdb.org/t/p/original/${posterPath}`}
		class={['max-h-80 w-auto rounded-xl lg:max-h-[120rem]', className]}
		{...rest}
	/>
{/if}

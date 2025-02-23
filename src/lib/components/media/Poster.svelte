<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {
		posterPath?: string | null;
		size?: 'sm' | 'xl';
	}

	const { alt, posterPath, class: className, size = 'xl', ...rest }: Props = $props();
</script>

{#if posterPath}
	<img
		src={`https://image.tmdb.org/t/p/original/${posterPath}`}
		class={[
			' w-auto rounded-xl',
			{
				'max-h-40': size === 'sm',
				'max-h-80 lg:max-h-[120rem]': size === 'xl'
			},
			className
		]}
		{...rest}
	/>
{/if}

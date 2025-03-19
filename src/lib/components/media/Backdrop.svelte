<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends HTMLImgAttributes {
		backdropPath?: string | null;
	}

	const { alt, backdropPath, class: className, ...rest }: Props = $props();
</script>

{#if backdropPath}
	<div
		class="invisible fixed top-0 right-0 left-0 -z-[1000] flex h-screen w-screen flex-col overflow-hidden brightness-[0.3] dark:visible"
	>
		<img
			src={`https://image.tmdb.org/t/p/original/${backdropPath}`}
			class={['aspect-[2/3] h-screen max-w-screen object-cover object-center', className]}
			width={1920}
			height={540}
			decoding="async"
			{...rest}
		/>
	</div>
{/if}

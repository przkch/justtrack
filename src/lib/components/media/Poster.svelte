<script lang="ts">
	interface Props {
		alt?: string | null;
		posterPath?: string | null;
	}

	const { alt, posterPath }: Props = $props();
</script>

{#if alt && posterPath}
	<div>
		<img
			src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
			{alt}
			class="h-full max-h-64 w-auto rounded-xl lg:max-h-96"
		/>
	</div>
{/if}

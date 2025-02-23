<script lang="ts">
	let { children } = $props();
</script>

<ul class="list-inside list-disc">
	{@render children?.()}
</ul>

<script lang="ts">
	let { children } = $props();
</script>

<li>
	{@render children?.()}
</li>

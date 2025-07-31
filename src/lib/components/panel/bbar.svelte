<script>
  import Bar from './bar.svelte';

  let { children, ...restProps } = $props();
</script>

<Bar {...restProps} resizePosition="before">{@render children?.()}</Bar>

<script>
  import { getUserRoles } from '$lib/utils';

  const roles = getUserRoles();
  let { requiredRoles = [], children, noAccessChildren } = $props();
</script>

{#if requiredRoles.length > 0 && !roles.some((r) => requiredRoles.includes(r))}
  {@render noAccessChildren?.()}
{:else}
  {@render children?.()}
{/if}

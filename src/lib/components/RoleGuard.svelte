<script>
  import { getUserRoles, getUserComponents } from '$lib/utils';

  const roles = getUserRoles();
  const components = getUserComponents() || [];
  let { requiredRoles = [], children, noAccessChildren, requiredComponents = [] } = $props();

  let allowedByRoles =
    !requiredRoles.length ||
    (!!requiredRoles?.length && roles.some((r) => requiredRoles.includes(r)));
  let allowedByComponents =
    !requiredComponents.length ||
    (!!requiredComponents?.length && components.some((r) => requiredComponents.includes(r)));
</script>

{#if allowedByRoles && allowedByComponents}
  {@render children?.()}
{:else}
  {@render noAccessChildren?.()}
{/if}

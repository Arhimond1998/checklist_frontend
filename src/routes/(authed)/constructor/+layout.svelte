<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  let { children } = $props();
</script>

<RoleGuard requiredRoles={['admin']}>
  {@render children()}
</RoleGuard>

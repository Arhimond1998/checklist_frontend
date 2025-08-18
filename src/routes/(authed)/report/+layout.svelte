<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  let { children } = $props();
</script>

<RoleGuard requiredRoles={['admin', 'report_user']}>
  {@render children()}
</RoleGuard>

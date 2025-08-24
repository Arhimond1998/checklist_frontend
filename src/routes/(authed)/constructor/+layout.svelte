<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  let { children } = $props();
</script>

<RoleGuard requiredComponents={['constructor']}>
  {@render children()}
</RoleGuard>

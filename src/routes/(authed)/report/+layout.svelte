<script>
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  let { children } = $props();
</script>

<RoleGuard requiredComponents={['report']}>
  {@render children()}
</RoleGuard>

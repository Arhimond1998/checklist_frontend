<script>
  import AddRole from '../../add-role.svelte';
  let { data } = $props();
  let item = $state(data.data);
</script>

<AddRole bind:item></AddRole>

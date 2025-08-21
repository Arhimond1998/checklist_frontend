<script>
  import AddRole from '../add-role.svelte';
  let item = $state({
    id_role: null,
    name: '',
    code: '',
  });
</script>

<AddRole bind:item></AddRole>

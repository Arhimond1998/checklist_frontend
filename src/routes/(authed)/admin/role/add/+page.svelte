<script>
  import AddRole from '../add-role.svelte';
  let item = $state({
    id_role: null,
    name: '',
    code: '',
    id_parent: null,
  });
</script>

<AddRole bind:item></AddRole>

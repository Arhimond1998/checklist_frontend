<script>
  import AddStore from '../add-store.svelte';
  let item = $state({
    id_store: null,
    name: '',
    code: '',
  });
</script>

<AddStore bind:item></AddStore>

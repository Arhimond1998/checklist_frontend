<script>
  import AddComponent from '../add-component.svelte';
  let item = $state({
    id_component: null,
    name: '',
    code: '',
  });
</script>

<AddComponent bind:item></AddComponent>

<script>
  import AddUser from '../../add-user.svelte';
  let { data } = $props();
  let item = $state(data.data);
</script>

<AddUser bind:item></AddUser>

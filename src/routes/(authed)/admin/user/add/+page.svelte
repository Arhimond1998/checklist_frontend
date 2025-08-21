<script>
  import AddUser from '../add-user.svelte';
  let item = $state({
    id_user: null,
      name: '',
      surname: '',
      patronymic: '',
      mail: '',
      login: '',
      password: ''
    });
</script>

<AddUser bind:item></AddUser>

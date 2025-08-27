<script>
  import AddUserRole from '../add-user-role.svelte';
  let item = $state({
    id_user_role: null,
    id_user: null,
    id_role: null,
    name: '',
    surname: '',
    patronymic: '',
    login: '',
    name_role: ''
  });
</script>

<AddUserRole bind:item></AddUserRole>

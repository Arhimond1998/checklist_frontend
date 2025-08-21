<script>
  import AddEmployee from '../add-employee.svelte';
  let item = $state({
    id_employee: null,
    name: '',
    surname: '',
    patronymic: '',
    mail: ''
  });
</script>

<AddEmployee bind:item></AddEmployee>

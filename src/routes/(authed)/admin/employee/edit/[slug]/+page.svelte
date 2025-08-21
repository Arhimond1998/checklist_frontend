<script>
    import AddEmployee from "../../add-employee.svelte";
    let {data} = $props()
    let item = $state(data.data)
</script>

<AddEmployee bind:item></AddEmployee>
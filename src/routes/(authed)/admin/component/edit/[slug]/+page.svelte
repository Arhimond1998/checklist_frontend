<script>
    import AddComponent from "../../add-component.svelte";
    let {data} = $props()
    let item = $state(data.data)
</script>

<AddComponent bind:item></AddComponent>
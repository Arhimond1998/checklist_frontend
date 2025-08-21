<script>
    import AddStore from "../../add-store.svelte";
    let {data} = $props()
    let item = $state(data.data)
</script>

<AddStore bind:item></AddStore>
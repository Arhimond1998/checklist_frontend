<script>
    import Panel from "$lib/components/panel.svelte";
</script>

<Panel>
    {#snippet lbar()}
        <div>1</div>
    {/snippet}
    {#snippet tbar()}
        <div>2</div>
    {/snippet}
    {#snippet rbar()}
        <div>3</div>
    {/snippet}
    {#snippet bbar()}
        <div>4</div>
    {/snippet}
    <div>123</div>
</Panel>
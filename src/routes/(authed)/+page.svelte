<script>
    import Panel from "$lib/components/panel/panel.svelte";
    import Lbar from "$lib/components/panel/lbar.svelte";
    import Bbar from "$lib/components/panel/bbar.svelte";
    import Rbar from "$lib/components/panel/rbar.svelte";
    import Tbar from "$lib/components/panel/tbar.svelte";
</script>

<Panel>
    {#snippet lbar()}
        <Lbar resizable={true}>left</Lbar>
    {/snippet}
    {#snippet tbar()}
        <Tbar resizable={true}>top</Tbar>
    {/snippet}
    {#snippet bbar()}
        <Bbar resizable={true}>bot</Bbar>
    {/snippet}
    {#snippet rbar()}
        <Rbar resizable={true}>right</Rbar>
    {/snippet}
    center
</Panel>
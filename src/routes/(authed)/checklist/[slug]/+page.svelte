<script>
  import Bbar from '$lib/components/panel/bbar.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChecklistItem from './checklist-item.svelte';

  const { data } = $props();
  $inspect(data, 'data');
  const onSave = async (event) => {
    console.log(data.data);
  };
</script>

<Panel>
  {#snippet bbar()}
    <Bbar collapsible={false} defaultSize={15}>
      <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
    </Bbar>
  {/snippet}
  

  <div class="checklist-container w-full">
    {#each data.data as item, i (item.id)}
      <ChecklistItem {item} files={item.files} index={i} />
    {/each}
  </div>
</Panel>

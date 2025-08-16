<script>
  import Bbar from '$lib/components/panel/bbar.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Progress from '$lib/components/ui/progress/progress.svelte';
  import ChecklistItem from './checklist-item.svelte';
  const { data } = $props();

  let items = $state(data.data);
  let total = $derived(items.length);
  let filled = $derived(items.filter((rec) => rec.checked !== 2).length);
  let maxScore = $derived(
    items.reduce((prev, cur) => prev + (cur.checked !== 2 ? cur.weight : 0), 0)
  );
  let score = $derived(items.reduce((prev, cur) => prev + (cur.checked === 1 ? cur.weight : 0), 0));
  const onSave = async (event) => {
    console.log($state.snapshot(items));
  };
</script>

<Panel>
  {#snippet tbar()}
    <Progress max={maxScore} value={score} />
  {/snippet}
  {#snippet bbar()}
    <Bbar collapsible={false} defaultSize={15}>
      <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
    </Bbar>
    <div>
      {filled}/{total}
    </div>
    <div>
      maxScore={maxScore}, value={score}
    </div>
  {/snippet}

  <div class="checklist-container w-full">
    {#each items as item, i (item.id)}
      <ChecklistItem bind:item={items[i]} files={item.files} index={i} />
    {/each}
  </div>
</Panel>

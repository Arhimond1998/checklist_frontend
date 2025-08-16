<script>
  import Bbar from '$lib/components/panel/bbar.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Progress from '$lib/components/ui/progress/progress.svelte';
  import { bffPost } from '$lib/utils';
  import ChecklistItem from './checklist-item.svelte';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
    import { goto } from '$app/navigation';
  const { data } = $props();
  let id_checklist = data.id_checklist;
  let items = $state(data.data);
  let total = $derived(items.length);
  let isDialogOpen = $state(false);
  let filled = $derived(items.filter((rec) => rec.checked !== 2).length);
  let maxScore = $derived(
    items.reduce((prev, cur) => prev + (cur.checked !== 2 ? cur.weight : 0), 0)
  );
  let score = $derived(items.reduce((prev, cur) => prev + (cur.checked === 1 ? cur.weight : 0), 0));
  function onSave() {
    isDialogOpen = true;
  }
  function closeDialog() {
    isDialogOpen = false;
  }
  async function saveReport() {
    const saveData = {
      id_checklist: id_checklist,
      data: {data:$state.snapshot(items)},
      max_score: $state.snapshot(maxScore),
      score: $state.snapshot(score)
    };
    console.log({saveData})
    try {
      const resp = await bffPost('api/checklist_user_report', saveData);
      goto('/checklist')
    } catch (error) {
      alert(error)
    }
    
  }
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

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Подтверждение сохранения</DialogTitle>
    </DialogHeader>
    <Button variant="default" onclick={saveReport}>Сохранить</Button>
    <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
  </DialogContent>
</Dialog>

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
  const { data, editable } = $props();
  let id_checklist = data.id_checklist;
  let items = $state(data.data);
  //   let total = $derived(items.reduce((prev, cur) => prev + cur.items.length, 0));
  let total = $derived.by(() => {
    let total_ = 0;
    for (const group of items) {
      total_ += group.items.length;
    }
    return total_;
  });
  let isDialogOpen = $state(false);
  let filled = $derived.by(() => {
    let filled_ = 0;
    for (const group of items) {
      filled_ += group.items.filter((rec) => rec.checked !== 2).length;
    }
    return filled_;
  });
  let maxScore = $derived.by(() => {
    let maxScore_ = 0;
    for (const group of items) {
      maxScore_ += group.items.reduce(
        (prev, cur) => prev + (cur.checked !== 2 ? cur.weight : 0),
        0
      );
    }
    return maxScore_;
  });
  let score = $derived.by(() => {
    let score_ = 0;
    for (const group of items) {
      score_ += group.items.reduce(
        (prev, cur) => prev + (cur.checked === 1 ? cur.weight : 0),
        0
      );
    }
    return score_;
  });

  function onSave() {
    isDialogOpen = true;
  }
  function closeDialog() {
    isDialogOpen = false;
  }
  async function saveReport() {
    const saveData = {
      id_checklist: id_checklist,
      data: { data: $state.snapshot(items) },
      max_score: $state.snapshot(maxScore),
      score: $state.snapshot(score)
    };
    console.log({ saveData });
    try {
      const resp = await bffPost('api/checklist_user_report', saveData);
      goto('/checklist');
    } catch (error) {
      alert(error);
    }
  }
</script>

<Panel>
  {#snippet tbar()}
    <div class="p-3">
      <Progress max={maxScore} value={score} />
    </div>
  {/snippet}
  {#snippet bbar()}
    {#if editable}
      <Bbar collapsible={false} defaultSize={15}>
        <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
      </Bbar>
    {/if}

    <div>
      {filled}/{total}
    </div>
    <div>
      value={score} maxScore={maxScore}
    </div>
  {/snippet}

  <div class="checklist-container w-full">
    {#each items as group, groupId (group.id)}
      <div class="border-b-2">
        <h1><strong class="p-3 text-2xl">{group.text}</strong></h1>
        <div class="ml-3">
          {#each group.items as item, i (item.id)}
            <ChecklistItem bind:item={group.items[i]} index={i} {editable} />
          {/each}
        </div>
      </div>
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

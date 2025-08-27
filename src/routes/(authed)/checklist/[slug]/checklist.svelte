<script>
  import Bbar from '$lib/components/panel/bbar.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Progress from '$lib/components/ui/progress/progress.svelte';
  import { bffPost } from '$lib/utils';
  import ChecklistItem from './checklist-item.svelte';

  import EmployeeCombobox from '$lib/components/combobox/EmployeeCombobox.svelte';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';

  import { goto } from '$app/navigation';
  import { Textarea } from '$lib/components/ui/textarea';
  import Label from '$lib/components/ui/label/label.svelte';
  const { data, editable } = $props();
  let id_checklist = data.id_checklist;
  let items = $state(data.data);
  let id_employee = $state([]);
  let commentary = $state(data.commentary);
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
      score_ += group.items.reduce((prev, cur) => prev + (cur.checked === 1 ? cur.weight : 0), 0);
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
    if (id_employee?.length !== 1) {
      alert('Выберите 1 работника');
      return;
    }
    const saveData = {
      id_checklist: id_checklist,
      commentary: commentary,
      data: { data: $state.snapshot(items) },
      max_score: $state.snapshot(maxScore),
      score: $state.snapshot(score),
      id_employee: id_employee[0]
    };
    console.log({ saveData });
    try {
      const resp = await bffPost('api/checklist_user_reports', saveData);
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
        {#if !!data.id_store.length}
          <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
        {:else}
          <div>Нельзя сохранить, чеклист не привязан к магазину</div>
        {/if}
      </Bbar>
    {/if}

    <div>
      {Math.floor((score / Math.max(maxScore, 1)) * 100 * 100) / 100}%
    </div>
  {/snippet}

  <div class="checklist-container w-full">
    {#each items as group, groupId (group.id)}
      <div class="border-b-2">
        <h1><strong class="p-3 text-2xl">{group.text}</strong></h1>
        <div class="ml-3">
          {#each group.items as item, i (item.id)}
            <ChecklistItem bind:item={group.items[i]} index={i + 1} {editable} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
  {#if editable || (!editable && commentary?.length)}
    <div class="outline-1">
      <Label for="comment">Комментарий:</Label>
      <Textarea
        class="rounded-md p-4"
        id="comment"
        placeholder="Тут можно оставить комментарий"
        bind:value={commentary}
        readonly={!editable}
      ></Textarea>
    </div>
  {/if}
</Panel>

<Dialog bind:open={isDialogOpen}>
  <DialogContent class="w-full overflow-hidden">
    <DialogHeader>
      <DialogTitle>Подтверждение сохранения</DialogTitle>
    </DialogHeader>
    <EmployeeCombobox
      isSingle={true}
      bind:values={id_employee}
      filters={[{ property: 'id_store', value: data.id_store, operator: 'in' }]}
    ></EmployeeCombobox>
    <Button variant="default" onclick={saveReport}>Сохранить</Button>
    <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
  </DialogContent>
</Dialog>

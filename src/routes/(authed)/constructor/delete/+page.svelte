<script>
  import ChecklistCard from '../../checklist/checklist-card.svelte';
  import { bffDelete } from '$lib/utils';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';
    import { goto } from '$app/navigation';
  let { data } = $props();
  let colsNum = $state(6);
  let items = $state(data.data);
  let curDeleteId = $state();
  let isDialogOpen = $state(false);
  $inspect(items);

  async function deleteChecklist() {
    try {
      isDialogOpen = false;
      const resp = await bffDelete(`api/checklists/${curDeleteId}`);
      items = items.filter((rec) => rec.id_checklist !== curDeleteId);
    } catch (error) {
      alert(error);
    }
  }

  function onclick(id_checklist) {
    return () => {
      curDeleteId = id_checklist;
      isDialogOpen = true;
    };
  }

  function closeDialog() {
    isDialogOpen = false;
    curDeleteId = null;
  }

  function handleResize(event) {
    const windowWidth = event.target.innerWidth;

    let cardsNum = Math.floor(Math.min(Math.max(windowWidth / 300, 1), 6));
    if (cardsNum !== 1 && cardsNum !== 6) {
      if (cardsNum > 3) {
        cardsNum = 3;
      } else {
        cardsNum = 1;
      }
    }

    colsNum = cardsNum;
  }
</script>

<svelte:window on:resize={handleResize} />

{#if items.length > 0}
<div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
  {#each items as checklistItem (checklistItem.id_checklist)}
    <ChecklistCard
      title={checklistItem.title}
      id_checklist={checklistItem.id_checklist}
      onclick={onclick(checklistItem.id_checklist)}
      text={'Удалить'}
    ></ChecklistCard>
  {/each}
</div>
{:else}
<label for="return_btn">Удалять нечего.</label>
<Button id="return_btn" onclick={() =>  {goto('/constructor')}}>Вернуться</Button>
{/if}
<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Подтверждение удаления</DialogTitle>
    </DialogHeader>
    <Button variant="destructive" onclick={deleteChecklist}>Удалить</Button>
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
  </DialogContent>
</Dialog>

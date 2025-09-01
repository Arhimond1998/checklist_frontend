<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from '../checklist/checklist-card.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import { bffDelete } from '$lib/utils';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_checklist = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/checklists/${id_checklist}`);
      if (resp) {
        items = items.filter((rec) => rec.id_checklist !== id_checklist);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={false}>
      <Button onclick={() => goto('/constructor/add')}>Добавить запись</Button>
    </Tbar>
  {/snippet}

  {#if items.length > 0}
    <div class="mt-2 grid max-w-500 grid-cols-1 gap-2">
      {#each items as checklistItem (checklistItem.id_checklist)}
        <Card
          item={checklistItem}
          onDelete={() => {
            isDialogOpen = true;
            id_checklist = checklistItem.id_checklist;
          }}
          onUpdate={() => goto(`/constructor/edit/${checklistItem.id_checklist}`)}
          onDuplicate={() => goto(`/constructor/duplicate/${checklistItem.id_checklist}`)}
          
        ></Card>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Пользователей нет.</label>
  {/if}
</Panel>
<ConfirmDialog onConfirmAsync={onclick} bind:isDialogOpen btnVariant="destructive" delay={1}
></ConfirmDialog>

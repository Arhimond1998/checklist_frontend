<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import StoreChecklistCard from '../store-checklist-card.svelte';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_store_checklist = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/store_checklists/${id_store_checklist}`);
      if (resp) {
        items = items.filter((rec) => rec.id_store_checklist !== id_store_checklist);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as storeChecklistItem (storeChecklistItem.id_store_checklist)}
      <StoreChecklistCard
        item={storeChecklistItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_store_checklist = storeChecklistItem.id_store_checklist}}
        btnVariant="destructive"
      ></StoreChecklistCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Удалять нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/user');
    }}>Вернуться</Button
  >
{/if}
<ConfirmDialog
  onConfirmAsync={onclick}
  bind:isDialogOpen
  btnVariant="destructive"
  delay={1}
></ConfirmDialog>

<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import StoreCard from '../store-card.svelte';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_store = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/stores/${id_store}`);
      if (resp) {
        items = items.filter((rec) => rec.id_store !== id_store);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as storeItem (storeItem.id_store)}
      <StoreCard
        item={storeItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_store = storeItem.id_store}}
        btnVariant="destructive"
      ></StoreCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Удалять нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/store');
    }}>Вернуться</Button
  >
{/if}
<ConfirmDialog
  onConfirmAsync={onclick}
  bind:isDialogOpen
  btnVariant="destructive"
  delay={1}
></ConfirmDialog>

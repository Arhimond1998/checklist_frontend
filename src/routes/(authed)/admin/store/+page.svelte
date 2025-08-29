<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from './store-card.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import { bffDelete } from '$lib/utils';

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

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={false}>
      <Button onclick={() => goto('/admin/store/add')}>Добавить запись</Button>
    </Tbar>
  {/snippet}

  {#if items.length > 0}
    <div class="mt-2 grid max-w-500 grid-cols-1 gap-2">
      {#each items as storeItem (storeItem.id_store)}
        <Card
          item={storeItem}
          onDelete={() => {
            isDialogOpen = true;
            id_store = storeItem.id_store;
          }}
        ></Card>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Пользователей нет.</label>
  {/if}
</Panel>
<ConfirmDialog onConfirmAsync={onclick} bind:isDialogOpen btnVariant="destructive" delay={1}
></ConfirmDialog>

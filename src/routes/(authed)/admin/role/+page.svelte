<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import Card from './role-card.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import { bffDelete } from '$lib/utils';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_role = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/roles/${id_role}`);
      if (resp) {
        items = items.filter((rec) => rec.id_role !== id_role);
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
      <Button onclick={() => goto('/admin/role/add')}>Добавить запись</Button>
    </Tbar>
  {/snippet}

  {#if items.length > 0}
    <div class="mt-2 grid max-w-500 grid-cols-1 gap-2">
      {#each items as roleItem (roleItem.id_role)}
        <Card
          item={roleItem}
          onDelete={() => {
            isDialogOpen = true;
            id_role = roleItem.id_role;
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

<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import UserCard from './user-card.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import { bffDelete } from '$lib/utils';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_user = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/users/${id_user}`);
      if (resp) {
        items = items.filter((rec) => rec.id_user !== id_user);
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
      <Button onclick={() => goto('/admin/user/add')}>Добавить запись</Button>
    </Tbar>
  {/snippet}

  {#if items.length > 0}
    <div class="mt-2 grid gap-2 grid-cols-1 max-w-500">
      {#each items as userItem (userItem.id_user)}
        <UserCard
          item={userItem}
          onDelete={() => {
            isDialogOpen = true;
            id_user = userItem.id_user;
          }}
        ></UserCard>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Пользователей нет.</label>
  {/if}
</Panel>
<ConfirmDialog onConfirmAsync={onclick} bind:isDialogOpen btnVariant="destructive" delay={1}
></ConfirmDialog>

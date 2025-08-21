<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import UserCard from '../user-card.svelte';

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

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as userItem (userItem.id_user)}
      <UserCard
        item={userItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_user = userItem.id_user}}
        btnVariant="destructive"
      ></UserCard>
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

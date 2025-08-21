<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import RoleCard from '../role-card.svelte';

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

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as roleItem (roleItem.id_role)}
      <RoleCard
        item={roleItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_role = roleItem.id_role}}
        btnVariant="destructive"
      ></RoleCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Удалять нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/role');
    }}>Вернуться</Button
  >
{/if}
<ConfirmDialog
  onConfirmAsync={onclick}
  bind:isDialogOpen
  btnVariant="destructive"
  delay={1}
></ConfirmDialog>

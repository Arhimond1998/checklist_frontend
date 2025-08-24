<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import RoleComponentCard from '../role-component-card.svelte';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_role_component = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/role_components/${id_role_component}`);
      if (resp) {
        items = items.filter((rec) => rec.id_role_component !== id_role_component);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as roleComponentItem (roleComponentItem.id_role_component)}
      <RoleComponentCard
        item={roleComponentItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_role_component = roleComponentItem.id_role_component}}
        btnVariant="destructive"
      ></RoleComponentCard>
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

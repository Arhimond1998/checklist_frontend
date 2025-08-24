<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import ComponentCard from '../component-card.svelte';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);
  let id_component = $state();

  async function onclick() {
    try {
      const resp = await bffDelete(`api/components/${id_component}`);
      if (resp) {
        items = items.filter((rec) => rec.id_component !== id_component);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as componentItem (componentItem.id_component)}
      <ComponentCard
        item={componentItem}
        text={'Удалить'}
        onclick={() => {isDialogOpen = true; id_component = componentItem.id_component}}
        btnVariant="destructive"
      ></ComponentCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Удалять нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/component');
    }}>Вернуться</Button
  >
{/if}
<ConfirmDialog
  onConfirmAsync={onclick}
  bind:isDialogOpen
  btnVariant="destructive"
  delay={1}
></ConfirmDialog>

<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import ComponentCard from '../component-card.svelte';

  let { data } = $props();

  function onclick(id_component) {
    return () => {
      goto(`/admin/component/edit/${id_component}`);
    };
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-1 max-w-500">
    {#each data.data as componentItem (componentItem.id_component)}
      <ComponentCard item={componentItem} text={'Редактировать'} onclick={() => goto(`/admin/component/edit/${componentItem.id_component}`)}></ComponentCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/component');
    }}>Вернуться</Button
  >
{/if}

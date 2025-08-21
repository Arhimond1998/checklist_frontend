<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import StoreCard from '../store-card.svelte';

  let { data } = $props();

  function onclick(id_store) {
    return () => {
      goto(`/admin/store/edit/${id_store}`);
    };
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-1 max-w-500">
    {#each data.data as storeItem (storeItem.id_store)}
      <StoreCard item={storeItem} text={'Редактировать'} onclick={() => goto(`/admin/store/edit/${storeItem.id_store}`)}></StoreCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/store');
    }}>Вернуться</Button
  >
{/if}

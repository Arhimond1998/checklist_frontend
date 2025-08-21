<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import RoleCard from '../role-card.svelte';

  let { data } = $props();

  function onclick(id_role) {
    return () => {
      goto(`/admin/role/edit/${id_role}`);
    };
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-1 max-w-500">
    {#each data.data as roleItem (roleItem.id_role)}
      <RoleCard item={roleItem} text={'Редактировать'} onclick={() => goto(`/admin/role/edit/${roleItem.id_role}`)}></RoleCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/role');
    }}>Вернуться</Button
  >
{/if}

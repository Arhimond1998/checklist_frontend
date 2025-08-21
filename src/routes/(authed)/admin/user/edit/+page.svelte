<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import UserCard from '../user-card.svelte';

  let { data } = $props();

  function onclick(id_user) {
    return () => {
      goto(`/admin/user/edit/${id_user}`);
    };
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-1 max-w-500">
    {#each data.data as userItem (userItem.id_user)}
      <UserCard item={userItem} text={'Редактировать'} onclick={() => goto(`/admin/user/edit/${userItem.id_user}`)}></UserCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/user');
    }}>Вернуться</Button
  >
{/if}

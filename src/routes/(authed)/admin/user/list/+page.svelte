<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import UserCard from '../user-card.svelte';

  let { data } = $props();
  let colsNum = $state(6);

  $inspect(data, 'data');
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as userItem (userItem.id_user)}
      <UserCard item={userItem}></UserCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Пользователей нет.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/user');
    }}>Назад</Button
  >
{/if}

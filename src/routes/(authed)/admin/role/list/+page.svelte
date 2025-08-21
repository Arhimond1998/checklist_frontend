<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import RoleCard from '../role-card.svelte';

  let { data } = $props();
  let colsNum = $state(6);

  $inspect(data, 'data');
</script>

<svelte:window on:resize={handleResize} />
{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as roleItem (roleItem.id_role)}
      <RoleCard item={roleItem}></RoleCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Ролей нет.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/role');
    }}>Назад</Button
  >
{/if}

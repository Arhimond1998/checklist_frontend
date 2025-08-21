<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
    import EmployeeCard from '../employee-card.svelte';

  let { data } = $props();
  let colsNum = $state(6);
    
  $inspect(data, 'data');

</script>

<svelte:window on:resize={handleResize} />
{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as employeeItem (employeeItem.id_employee)}
      <EmployeeCard item={employeeItem}></EmployeeCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Работников нет.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/employee');
    }}>Назад</Button
  >
{/if}

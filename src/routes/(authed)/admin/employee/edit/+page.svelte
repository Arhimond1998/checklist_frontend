<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import EmployeeCard from '../employee-card.svelte';

  let { data } = $props();

  function onclick(id_employee) {
    return () => {
      goto(`/admin/employee/edit/${id_employee}`);
    };
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-1 max-w-500">
    {#each data.data as employeeItem (employeeItem.id_employee)}
      <EmployeeCard item={employeeItem} text={'Редактировать'} onclick={() => goto(`/admin/employee/edit/${employeeItem.id_employee}`)}></EmployeeCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/employee');
    }}>Вернуться</Button
  >
{/if}

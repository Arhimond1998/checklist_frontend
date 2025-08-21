<script>
  import { goto } from '$app/navigation';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffDelete } from '$lib/utils';
  import EmployeeCard from '../employee-card.svelte';

  let { data } = $props();
  let items = $state(data.data);
  let isDialogOpen = $state(false);

  let id_employee = $state();
  async function onclick() {
    try {
      const resp = await bffDelete(`api/employees/${id_employee}`);
      if (resp) {
        items = items.filter((rec) => rec.id_employee !== id_employee);
      }
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  }
</script>

{#if items.length > 0}
  <div class="mt-8 grid max-w-500 grid-cols-1 gap-8">
    {#each items as employeeItem (employeeItem.id_employee)}
      <EmployeeCard
        item={employeeItem}
        text={'Удалить'}
        onclick={() => {
          isDialogOpen = true;
          id_employee = employeeItem.id_employee;
        }}
        btnVariant="destructive"
      ></EmployeeCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Удалять нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/admin/employee');
    }}>Вернуться</Button
  >
{/if}
<ConfirmDialog onConfirmAsync={onclick} bind:isDialogOpen btnVariant="destructive" delay={1}
></ConfirmDialog>

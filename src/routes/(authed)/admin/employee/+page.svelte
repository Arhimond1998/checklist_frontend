<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import EmployeeCard from './employee-card.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import { bffDelete } from '$lib/utils';

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

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={false}>
      <Button onclick={() => goto('/admin/employee/add')}>Добавить запись</Button>
    </Tbar>
  {/snippet}

  {#if items.length > 0}
    <div class="mt-2 grid max-w-500 grid-cols-1 gap-2">
      {#each items as employeeItem (employeeItem.id_employee)}
        <EmployeeCard
          item={employeeItem}
          onDelete={() => {
            isDialogOpen = true;
            id_employee = employeeItem.id_employee;
          }}
        ></EmployeeCard>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Работников нет.</label>
  {/if}
</Panel>
<ConfirmDialog onConfirmAsync={onclick} bind:isDialogOpen btnVariant="destructive" delay={1}
></ConfirmDialog>

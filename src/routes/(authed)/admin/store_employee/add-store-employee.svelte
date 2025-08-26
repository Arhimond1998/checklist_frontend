<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import StoreCombobox from '$lib/components/combobox/StoreCombobox.svelte';
  import EmployeeCombobox from '$lib/components/combobox/EmployeeCombobox.svelte';

  let isLoading = $state(false);

  let employeeValues = $state([]);
  let storeValues = $state([]);

  async function onclick() {
    isLoading = true;
    try {
      for (const employee of employeeValues) {
        for (const store of storeValues) {
          const resp = await bffPost('api/store_employees', { id_employee: employee, id_store: store });
        }
      }
      goto('/admin/store_employee/list');
    } catch (error) {
      console.log({ error });
      alert(error.msg);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="mx-auto max-w-md p-6">
  <div class="space-y-2">
    <EmployeeCombobox bind:values={employeeValues}></EmployeeCombobox>
  </div>

  <div class="space-y-2">
    <StoreCombobox bind:values={storeValues}></StoreCombobox>
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

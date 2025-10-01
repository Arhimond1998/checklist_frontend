<script>
  import ChecklistCombobox from '$lib/components/combobox/ChecklistCombobox.svelte';
  import EmployeeCombobox from '$lib/components/combobox/EmployeeCombobox.svelte';
  import StoreCombobox from '$lib/components/combobox/StoreCombobox.svelte';
  import UserCombobox from '$lib/components/combobox/UserCombobox.svelte';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { DatePicker } from 'bits-ui';
  import Button from '$lib/components/ui/button/button.svelte';
  import DateField from '$lib/components/date-field.svelte';
  let { isDialogOpen = $bindable(false), filters = $bindable([]) } = $props();
  let userValues = $state([]);
  let checklistValues = $state([]);
  let storeValues = $state([]);
  let employeeValues = $state([]);
  let dateValueFrom = $state();
  let dateValueTo = $state();
  let filterValues = $derived.by(() => {
    let result = [];
    if (userValues?.length) {
      result.push({
        property: 'id_user',
        operator: 'in',
        value: userValues
      });
    }
    if (storeValues?.length) {
      result.push({
        property: 'id_store',
        operator: 'in',
        value: storeValues
      });
    }
    if (checklistValues?.length) {
      result.push({
        property: 'id_checklist',
        operator: 'in',
        value: checklistValues
      });
    }
    if (employeeValues?.length) {
      result.push({
        property: 'id_employee',
        operator: 'in',
        value: employeeValues
      });
    }
    if (dateValueFrom) {
      result.push({
        property: 'dt',
        operator: 'date_ge',
        value: dateValueFrom
      });
    }
    if (dateValueTo) {
      result.push({
        property: 'dt',
        operator: 'date_le',
        value: dateValueTo
      });
    }
    return result;
  });

  function closeDialog() {
    isDialogOpen = false;
  }

  $effect(() => {
    filters = filterValues;
  });
</script>

<Dialog bind:open={isDialogOpen}>
  <DialogContent class="w-full max-w-full gap-1 p-1">
    <DialogHeader>
      <DialogTitle>Фильтрация</DialogTitle>
    </DialogHeader>
    <div class="mx-auto max-w-md gap-1 p-6">
      <UserCombobox bind:values={userValues}></UserCombobox>
      <ChecklistCombobox bind:values={checklistValues}></ChecklistCombobox>
      <StoreCombobox bind:values={storeValues}></StoreCombobox>
      <EmployeeCombobox bind:values={employeeValues}></EmployeeCombobox>
      <DateField label={'Дата с'} bind:value={dateValueFrom}></DateField>
      <DateField label={'Дата по'} bind:value={dateValueTo}></DateField>
    </div>

    <DialogFooter>
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import StoreCombobox from '$lib/components/StoreCombobox.svelte';
  import ChecklistCombobox from '$lib/components/ChecklistCombobox.svelte';

  let isLoading = $state(false);

  let checklistValues = $state([]);
  let storeValues = $state([]);

  async function onclick() {
    isLoading = true;
    try {
      for (const checklist of checklistValues) {
        for (const store of storeValues) {
          const resp = await bffPost('api/store_checklists', { id_checklist: checklist, id_store: store });
        }
      }
      goto('/admin/store_checklist/list');
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
    <ChecklistCombobox bind:values={checklistValues}></ChecklistCombobox>
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

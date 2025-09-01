<script>
  import { goto } from '$app/navigation';
  import RoleCombobox from '$lib/components/combobox/RoleCombobox.svelte';
  import StoreCombobox from '$lib/components/combobox/StoreCombobox.svelte';

  import Button from '$lib/components/ui/button/button.svelte';

  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { bffPut, bffPost } from '$lib/utils';

  let { saveData = $bindable(), isDialogOpen = $bindable(false) } = $props();
  let saveClick = async function () {
    if (!saveData.id_store?.length) {
      alert('Привяжите магазин');
      return;
    }
    if (!saveData.id_role?.length) {
      alert('Привяжите роль');
      return;
    }
    const data = $state.snapshot(saveData);
    const postData = {
      title: data.title,
      id_store: saveData.id_store[0],
      id_role: saveData.id_role[0],
      data: { ...data.items }
    };
    console.log({ postData });
    if (!checklist_name) {
      return;
    }
    try {
      let resp;
      if (data.id_checklist) {
        resp = await bffPut(`api/checklists/${data.id_checklist}`, postData);
      } else {
        resp = await bffPost('api/checklists', postData);
      }
      isDialogOpen = false;
      goto('/checklist');
    } catch (error) {
      console.log({ error });
    }
  };
  let closeDialog = function () {
    isDialogOpen = false;
  };
</script>

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Просмотр изображения</DialogTitle>
    </DialogHeader>
    <label for="checklist_name">Наименование:</label>
    <input
      class="outline-1"
      id="checklist_name"
      type="text"
      placeholder="Имя чеклиста"
      bind:value={saveData.title}
    />

    <StoreCombobox bind:values={saveData.id_store} isSingle={true}></StoreCombobox>
    <RoleCombobox bind:values={saveData.id_role} isSingle={true}></RoleCombobox>

    <DialogFooter>
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
      <Button variant="outline" onclick={saveClick}>Сохранить</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

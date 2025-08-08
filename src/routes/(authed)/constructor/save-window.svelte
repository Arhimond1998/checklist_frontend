<script>
  import Button from '$lib/components/ui/button/button.svelte';

  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { bffPost } from '$lib/utils';

  let checklist_name = $state('');

  let { saveData, isDialogOpen = $bindable(false) } = $props();
  let saveClick = async function () {
    if (!checklist_name) {
      return;
    }
    try {
      const postData = { title: checklist_name, data: {...saveData} };
      const resp = await bffPost('api/checklists', postData);
      isDialogOpen = false;
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
      bind:value={checklist_name}
    />

    <DialogFooter>
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
      <Button variant="outline" onclick={saveClick}>Сохранить</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

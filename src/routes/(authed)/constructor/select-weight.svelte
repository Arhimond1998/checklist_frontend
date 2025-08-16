<script>
  import { Button } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';

  let { isDialogOpen = $bindable(false), weight = $bindable(1)} = $props();

  let inputValue = $state(weight);

  let closeDialog = function () {
    isDialogOpen = false;
  };

  const saveAndClose = (event) => {
    weight = Math.min(100, Math.max(0, inputValue));
    inputValue = weight;
    closeDialog();

  };
</script>

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Изменить вес задачи</DialogTitle>
    </DialogHeader>

    <input type="number" name="weight" class="outline-1" bind:value={inputValue} />

    <DialogFooter>
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
      <Button variant="outline" onclick={saveAndClose}>Сохранить и закрыть</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

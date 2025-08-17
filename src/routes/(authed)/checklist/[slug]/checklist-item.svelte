<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import QuestionMarkIcon from '@lucide/svelte/icons/message-circle-question';
  import PhotoViewer from '$lib/components/photo-viewer/photo-viewer.svelte';
  import { XMarkCheckbox } from '$lib/components/ui/checkbox';

  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';

  let {
    item = $bindable(),
    editable = false,
    index,
    removeItem,
    updateItem,
    ref = $bindable(null)
  } = $props();
  let isDialogOpen = $state(false);

  let status = 0;

  let onCheckClick = function (event) {
    event.preventDefault();
    status = (status + 1) % 3;

    if (status === 1) {
      item.checked = 1;
    }
    if (status === 2) {
      item.checked = 0;
    }
    if (status === 0) {
      item.checked = 2;
    }
  };
</script>

<div class="checklist-item-total w-full">
  <div class="checklist-item w-full p-3">
    <XMarkCheckbox
      bind:ref
      disabled={!editable}
      indeterminate={item.checked === 2}
      onclick={onCheckClick}
      checked={item.checked === 1}
      name={item.id}
    />
    <!-- <XMarkCheckbox bind:ref {indeterminate} onclick={onCheckClick} {checked} name={item.id} /> -->
    {#if index !== null}
      <div class="mr-2">{index}.</div>
    {/if}
    <div class="flex-grow">{item.text}</div>
    <div class="flex items-center space-x-2">
      {#if item.description}
        <QuestionMarkIcon onclick={() => (isDialogOpen = true)} />
      {/if}
    </div>
  </div>
  <div>
    <PhotoViewer files={item.files} canDelete={false} isBlob={false} />
  </div>
</div>

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Описание задачи</DialogTitle>
    </DialogHeader>

    <span>{item.description}</span>

    <DialogFooter>
      <Button variant="outline" onclick={() => (isDialogOpen = false)}>Закрыть</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<style>
  .checklist-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    gap: 10px;
  }

  .checklist-item-total {
    border: 1px solid #0808082a;
  }
</style>

<script>
  import AttachButton from '$lib/components/attach-button/button.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import PhotoViewer from '$lib/components/photo-viewer/photo-viewer.svelte';
  let { item = $bindable(), files = $bindable([]), removeItem, updateItem } = $props();
</script>

<div class="checklist-item-total w-full">
  <div class="checklist-item w-full p-3">
    <Button class="remove-btn" onclick={() => removeItem(item.id)} title="Удалить задачу">✕</Button>
    <input
      type="text"
      value={item.text}
      oninput={(e) => updateItem(item.id, { text: e.target.value })}
      placeholder="Введите задачу"
      class="w-full"
    />
    <AttachButton bind:files />
    <Button
      onclick={() => updateItem(item.id, { showDesc: !item.showDesc })}
      title="Подсказка для задачи"
    >
      {#if item.showDesc}
        <ChevronDownIcon />
      {:else}
        <ChevronRightIcon />
      {/if}
    </Button>
  </div>
  <div>
    <PhotoViewer bind:files canDelete={true}/>
  </div>
  {#if item.showDesc}
    <div class="p-1">
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <textarea
        value={item.description}
        oninput={(e) => updateItem(item.id, { description: e.target.value })}
        placeholder="Введите подсказку"
        class="h-25 w-full resize-y outline"
      />
    </div>
  {/if}
</div>

<style>
  .checklist-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    gap: 10px;
  }

  .checklist-item-total:hover {
    border: 1px solid #080808;
  }

  input[type='text'],
  textarea {
    flex-grow: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  input[type='text']:focus,
  textarea:focus {
    outline: none;
    border-color: #646cff;
  }
</style>

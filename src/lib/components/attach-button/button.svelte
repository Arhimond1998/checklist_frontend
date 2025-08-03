<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import UploadIcon from '@lucide/svelte/icons/upload';
  let { files = $bindable([]) } = $props();
  let inputElement;

  // Открытие диалога выбора файлов
  function openFileDialog() {
    inputElement.click();
  }
  $inspect(inputElement)
  // Обработка выбранных файлов
  function handleFiles(event) {
    files = [...event.target.files]
  }
</script>

<Button onclick={openFileDialog} class="attach-button">
  <UploadIcon />
</Button>

<input
  type="file"
  multiple
  accept="image/*"
  bind:this={inputElement}
  onchange={handleFiles}
  class="hidden"
  onsubmit={()=>console.log(123)}
/>

<style>
  .hidden {
    display: none;
  }
</style>

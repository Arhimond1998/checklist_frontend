<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import { bffUploadFiles } from '$lib/utils';
  import UploadIcon from '@lucide/svelte/icons/upload';
  
  let { files = $bindable([]) } = $props();
  let inputElement;
  let isLoading = $state(false);

  function openFileDialog() {
    inputElement.click();
  }

  async function handleFiles(event) {
    const selectedFiles = event.target.files;
    if (!selectedFiles.length) return;
    
    isLoading = true;
    
    try {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append('files', file);
      }
      
      const resp = await bffUploadFiles('api/checklists/upload', formData);
      
      if (resp.status === 200) {
        files = [...files, ...resp.data]; // Сохраняем существующие + новые файлы
      } else {
        throw new Error(`Upload failed: ${resp.status}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      isLoading = false;
      inputElement.value = ''; // Сбрасываем input
    }
  }
</script>

<Button 
  onclick={openFileDialog} 
  class="attach-button"
  disabled={isLoading}
>
  {#if isLoading}
    <span>Uploading...</span>
  {:else}
    <UploadIcon />
  {/if}
</Button>

<input
  type="file"
  multiple
  accept="image/*"
  bind:this={inputElement}
  onchange={handleFiles}
  class="hidden"
/>


<style>
  .hidden {
    display: none;
  }
</style>
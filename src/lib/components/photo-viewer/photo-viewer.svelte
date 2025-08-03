<script>
  import { Button } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { onDestroy } from 'svelte';

  // Состояния компонента
  // let files = $state([]);
  let { files = $bindable([]), canDelete = false } = $props();

  let isDialogOpen = $state(false);
  let currentImageIndex = $state(null);

  $effect(() => {
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  });

  $inspect(files);

  let objectUrls = $derived.by(() => {
    let res = [];
    files.forEach((file) => {
      res.push(URL.createObjectURL(file));
    });
    return res;
  });

  // Закрытие диалога
  function closeDialog() {
    isDialogOpen = false;
    currentImageIndex = null;
  }

  // Открытие диалога просмотра изображения
  function openImageDialog(index) {
    currentImageIndex = index;
    isDialogOpen = true;
  }

  function removeByIndex(index) {
    return () => {
      currentImageIndex = index;
      removeImage();
    };
  }

  // Удаление изображения
  function removeImage() {
    if (currentImageIndex === null) return;

    // Освобождение ресурсов
    URL.revokeObjectURL(objectUrls[currentImageIndex]);

    // Удаление файла
    files.splice(currentImageIndex, 1);
    // Закрытие диалога
    isDialogOpen = false;
    currentImageIndex = null;
  }
  // Очистка при уничтожении компонента
  onDestroy(() => {
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
  });
</script>

{#if files.length > 0}
  <div class="mb-3">
    <div class="flex flex-wrap gap-3">
      {#each files as file, index}
        <!-- Контейнер с относительным позиционированием -->
        <div class="relative w-16">
          <!-- Обертка для изображения с относительным позиционированием -->
          <div class="relative">
            <img
              src={objectUrls[index]}
              alt="Preview"
              class="h-16 w-full cursor-pointer rounded-md border border-gray-200 object-cover transition-shadow hover:shadow-md"
              onclick={() => openImageDialog(index)}
            />

            {#if canDelete}
              <button
                onclick={removeByIndex(index)}
                class="absolute -top-2 -right-2 rounded-full bg-red-500 p-0.5 text-white transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                aria-label="Удалить изображение"
              >
                <!-- SVG иконка корзинки -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            {/if}
            <!-- Кнопка удаления -->
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
<!-- {#if files.length > 0}
  <div class="mb-3">
    <div class="flex flex-wrap gap-3">
      {#each files as file, index}
        <div class="flex w-16 flex-col items-center">
          <img
            src={objectUrls[index]}
            alt="Preview"
            class="h-16 w-full cursor-pointer rounded-md border border-gray-200 object-cover transition-shadow hover:shadow-md"
            onclick={() => openImageDialog(index)}
          />
          
        </div>
      {/each}
    </div>
  </div>
{/if} -->
<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Просмотр изображения</DialogTitle>
    </DialogHeader>

    {#if currentImageIndex !== null}
      <div class="image-preview">
        <img
          src={objectUrls[currentImageIndex]}
          alt="Full size preview"
          class="max-h-[70vh] max-w-full object-contain"
        />
      </div>
    {/if}

    <DialogFooter>
      {#if canDelete}
        <Button variant="destructive" onclick={removeImage}>Удалить</Button>
      {/if}
      <Button variant="outline" onclick={closeDialog}>Закрыть</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<style>
  .image-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    min-height: 300px;
  }
</style>

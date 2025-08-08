<!--- ChecklistBuilder.svelte -->
<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import Bbar from '$lib/components/panel/bbar.svelte';
  import ChecklistConstructorItem from './checklist-constructor-item.svelte';
  import SaveWindow from './save-window.svelte';

  // Инициализируем состояние чеклиста
  let items = $state([]);
  let saveWindowOpen = $state(false);
  // Функция добавления новой строки
  function addItem() {
    items.push({
      id: crypto.randomUUID(),
      text: `Новая задача ${items.length + 1}`,
      description: null,
      showDesc: false,
      files: []
    });
  }

  // Функция удаления строки
  function removeItem(id) {
    items = items.filter((item) => item.id !== id);
  }
  // Функция обновления текста
  function updateItem(id, newData) {
    items = items.map((item) => (item.id === id ? { ...item, ...newData } : item));
  }
  async function onSave(a, b, c) {
    console.log('Save', { items });
    saveWindowOpen = true;
  }
</script>

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={false} defaultSize={15}
      ><Button class="justify center mb-2 h-9/10 self-center" onclick={addItem}
        >+ Добавить задачу</Button
      ></Tbar
    >
  {/snippet}
  {#snippet bbar()}
    <Bbar collapsible={false} defaultSize={15}>
      <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
    </Bbar>
  {/snippet}

  <div class="checklist-container w-full">
    {#each items as item (item.id)}
      <ChecklistConstructorItem {item} bind:files={item.files} {removeItem} {updateItem}
      ></ChecklistConstructorItem>
    {/each}
  </div>
</Panel>

<SaveWindow bind:isDialogOpen={saveWindowOpen} saveData={items}></SaveWindow>

<!--- ChecklistBuilder.svelte -->
<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import Bbar from '$lib/components/panel/bbar.svelte';
  import ChecklistItem from './checklist-item.svelte';
  // Инициализируем состояние чеклиста
  let items = $state([]);

  // Функция добавления новой строки
  function addItem() {
    items = [
      ...items,
      {
        id: crypto.randomUUID(),
        text: `Новая задача ${items.length + 1}`,
        checked: false,
        description: null,
        showDesc: false
      }
    ];
  }

  // Функция удаления строки
  function removeItem(id) {
    items = items.filter((item) => item.id !== id);
  }

  // Функция обновления текста
  function updateItem(id, newData) {
    items = items.map((item) => (item.id === id ? { ...item, ...newData } : item));
  }

  async function onSave() {
    console.log('Save', { items });
  }
</script>

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={true} defaultSize={15}
      ><Button class="justify center mb-2 self-center h-full" onclick={addItem}>+ Добавить задачу</Button
      ></Tbar
    >
  {/snippet}
  {#snippet bbar()}
    <Bbar collapsible={true} defaultSize={15}>
      <Button onclick={onSave} class="justify center mb-2 self-center h-full">Сохранить</Button>
    </Bbar>
  {/snippet}

  <div class="checklist-container w-full">
    {#each items as item (item.id)}
      <ChecklistItem item={item} {removeItem} {updateItem}></ChecklistItem>
    {/each}
  </div>
</Panel>

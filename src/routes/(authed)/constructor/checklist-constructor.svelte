<!--- ChecklistBuilder.svelte -->
<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import Bbar from '$lib/components/panel/bbar.svelte';
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
    <Tbar
      collapsible={true} 
      defaultSize={10}
      ><Button class="justify center mb-2 self-center" onclick={addItem}>+ Добавить задачу</Button
      ></Tbar
    >
  {/snippet}
  {#snippet bbar()}
    <Bbar collapsible={true} defaultSize={10}>
      <Button onclick={onSave}>Сохранить</Button>
    </Bbar>
  {/snippet}

  <div class="checklist-container">
    {#each items as item (item.id)}
      <div class="checklist-item-total">
      <div class="checklist-item p-3">
        <Button class="remove-btn" onclick={() => removeItem(item.id)} title="Удалить задачу">
          ✕
        </Button>

        <input
          type="text"
          value={item.text}
          oninput={(e) => updateItem(item.id, { text: e.target.value })}
          placeholder="Введите задачу"
        />

        <Button
          class="remove-btn"
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
      {#if item.showDesc}
        <div class="p-1">
          <!-- svelte-ignore element_invalid_self_closing_tag -->
          <textarea
            value={item.description}
            oninput={(e) => updateItem(item.id, { description: e.target.value })}
            placeholder="Введите подсказку"
            class="h-50 w-full resize-none outline"
          />
        </div>
      {/if}
      </div>
    {/each}
    
  </div>
  
</Panel>

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

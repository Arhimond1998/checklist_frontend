<!--- ChecklistBuilder.svelte -->
<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
  import Panel from '$lib/components/panel/panel.svelte';
  import Tbar from '$lib/components/panel/tbar.svelte';
  import Bbar from '$lib/components/panel/bbar.svelte';
  import ChecklistConstructorItem from './checklist-constructor-item.svelte';
  import SaveWindow from './save-window.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import Trash_2 from '@lucide/svelte/icons/trash-2';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

  // Инициализируем состояние чеклиста
  let { checklistData = $bindable({ id_checklist: null, title: '', items: [] }) } = $props();
  let isDeleteOpen = $state(false);
  // let items = $state([]);
  let saveWindowOpen = $state(false);
  // Функция добавления новой строки
  function addItem() {
    checklistData.items.push({
      id: uuidv4(),
      text: `Новая группа ${checklistData.items.length + 1}`,
      items: [
        {
          id: uuidv4(),
          text: `Новая задача 1`,
          description: null,
          weight: 1,
          files: []
        }
      ]
    });
  }

  function addGroupItem(groupId) {
    return () => {
      for (const group of checklistData.items) {
        if (group.id === groupId) {
          group.items.push({
            id: uuidv4(),
            text: `Новая задача ${group.items.length + 1}`,
            description: null,
            weight: 1,
            files: []
          });
        }
      }
    };
  }

  // Функция удаления строки
  function removeItem(groupId) {
    return (id) => {
      for (const group of checklistData.items) {
        if (group.id === groupId) {
          group.items = group.items.filter((item) => item.id !== id);
        }
      }
    };
  }
  // Функция обновления текста
  function updateItem(groupId) {
    return (id, newData) => {
      for (const group of checklistData.items) {
        if (group.id === groupId) {
          group.items = group.items.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          );
        }
      }
    };
  }

  let onClickDelete = $state(() => {});

  function removeGroup(groupId) {
    return () => {
      onClickDelete = () => {
        checklistData.items = checklistData.items.filter((item) => item.id !== groupId);
      };
      isDeleteOpen = true;
    };
  }

  async function onSave(a, b, c) {
    saveWindowOpen = true;
  }
  $inspect(checklistData);
</script>

<Panel>
  {#snippet tbar()}
    <Tbar collapsible={false} defaultSize={15}
      ><Button class="justify center mb-2 h-9/10 self-center" onclick={addItem}>+ Группа</Button
      ></Tbar
    >
  {/snippet}
  {#snippet bbar()}
    <Bbar collapsible={false} defaultSize={15}>
      <Button onclick={onSave} class="justify center mb-2 h-full self-center">Сохранить</Button>
    </Bbar>
  {/snippet}

  <div class="checklist-container w-full">
    {#each checklistData.items as group, groupIndex (group.id)}
      <div class="p-3 outline-3">
        <div class="flex items-center gap-2.5">
          <Button class="remove-btn" onclick={removeGroup(group.id)} title="Удалить задачу"
            ><Trash_2 /></Button
          >

          <input type="text" bind:value={group.text} placeholder="Введите задачу" class="w-full" />
        </div>

        {#each group.items as item, i (item.id)}
          <ChecklistConstructorItem
            bind:item={group.items[i]}
            removeItem={removeItem(group.id)}
            updateItem={updateItem(group.id)}
          ></ChecklistConstructorItem>
        {/each}

        <div class="p-3">
          <Button onclick={addGroupItem(group.id)}>+ Задача</Button>
        </div>
      </div>
      <Separator></Separator>
    {/each}
  </div>
</Panel>

<SaveWindow bind:isDialogOpen={saveWindowOpen} bind:saveData={checklistData}></SaveWindow>
<ConfirmDialog delay={1} text="Удалить группу?" btnVariant='destructive' bind:isDialogOpen={isDeleteOpen} onConfirm={onClickDelete}
></ConfirmDialog>

<style>
  input[type='text'] {
    flex-grow: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 24px;
    font-weight: bold;
  }

  input[type='text']:focus {
    outline: none;
    border-color: #646cff;
    font-size: 24px;
    font-weight: bold;
  }
</style>

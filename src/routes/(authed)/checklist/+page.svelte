<script>
  import { goto } from '$app/navigation';
  import Card from '../checklist/checklist-card.svelte';
  import Panel from '$lib/components/panel/panel.svelte';

  let { data } = $props();
  let items = $state(data.data);

  function onclick(id_checklist) {
    return () => {
      goto(`/checklist/${id_checklist}`);
    };
  }
</script>

<Panel>
  {#if items.length > 0}
    <div class="mt-2 grid max-w-500 grid-cols-1 gap-2">
      {#each items as checklistItem (checklistItem.id_checklist)}
        <Card item={checklistItem} onClick={onclick(checklistItem.id_checklist)} text={'Открыть'}
        ></Card>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Пользователей нет.</label>
  {/if}
</Panel>

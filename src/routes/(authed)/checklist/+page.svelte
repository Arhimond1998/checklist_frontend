<script>
  import ChecklistCard from './checklist-card.svelte';

  let { data } = $props();

  $inspect(data, 'data');
</script>

<div class="grid-cols-3">
  {#each data.data as checklistItem (checklistItem.id_checklist)}
    <ChecklistCard title={checklistItem.title} id_checklist={checklistItem.id_checklist}
    ></ChecklistCard>
  {/each}
</div>

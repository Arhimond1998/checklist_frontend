<script>
  import ChecklistConstructor from '../../checklist-constructor.svelte';
  let { data } = $props();
  let checklistData = $state({
    id_checklist: data.data.id_checklist,
    title: data.data.title,
    items: Object.values(data.data.data)
  });
</script>

<ChecklistConstructor bind:checklistData />

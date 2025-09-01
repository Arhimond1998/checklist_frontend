<script>
  import ChecklistConstructor from '../../checklist-constructor.svelte';
  let { data } = $props();
  let checklistData = $state({
    id_checklist: null,
    id_store: data.data.id_store,
    id_role: data.data.id_role,
    title: data.data.title + '_duplicate',
    items: Object.values(data.data.data)
  });
</script>

<ChecklistConstructor bind:checklistData />

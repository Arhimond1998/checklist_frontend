<script>
    import { goto } from '$app/navigation';
    import Button from '$lib/components/ui/button/button.svelte';
  import ChecklistConstructor from './checklist-constructor.svelte';
  function add() {
    goto('/constructor/add');
  }
  function edit() {
    goto('/constructor/edit');
  }
  function delete_() {
    goto('/constructor/delete');
  }
</script>
<div class="mt-8 grid gap-8 grid-cols-1 max-w-55">
  <Button onclick={add}>Добавить чеклист</Button>
  <Button onclick={edit}>Редактировать чеклист</Button>
  <Button onclick={delete_}>Удалить чеклист</Button>
</div>

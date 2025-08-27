<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import Menu from './dropdown-action.svelte';

  let { item, onDelete } = $props();

  let fullname = $derived(
    ((item.name + ' ' + (item.surname || '')).trim() + ' ' + (item.patronymic || '')).trim()
  );
  //
</script>

<Card.Root class="relative w-full max-w-sm gap-2 py-2">
  <div class="absolute top-1 right-1">
    <Menu onUpdate={() => goto(`/admin/user/edit/${item.id_user}`)} {onDelete} />
  </div>
  <Card.Header>
    <Card.Title>{fullname}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Логин: {item.login}</div>
    <div>Роль: {item.name_role || ''}</div>
  </Card.Content>
</Card.Root>

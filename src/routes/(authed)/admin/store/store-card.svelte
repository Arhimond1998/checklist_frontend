<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import Menu from './dropdown-action.svelte';

  let { item, onDelete } = $props();
</script>

<Card.Root class="relative w-full max-w-sm gap-2 py-2">
  <div class="absolute top-1 right-1">
    <Menu onUpdate={() => goto(`/admin/store/edit/${item.id_store}`)} {onDelete} />
  </div>
  <Card.Header>
    <Card.Title>{item.name}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Код: {item.code ? item.code : ''}</div>
  </Card.Content>
</Card.Root>

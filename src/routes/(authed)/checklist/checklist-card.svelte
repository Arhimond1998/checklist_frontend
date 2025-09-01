<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import Menu from './dropdown-action.svelte';

  let { item, onDelete, onUpdate, onDuplicate, onClick, text } = $props();
</script>

<Card.Root class="relative w-full max-w-sm gap-2 py-2">
  {#if [onDelete, onUpdate, onDuplicate].some(Boolean)}
    <div class="absolute top-1 right-1">
      <Menu {onUpdate} {onDelete} {onDuplicate} />
    </div>
  {/if}
  <Card.Header>
    <Card.Title>{item.title}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Магазин: {item.name_store ? item.name_store : ''}</div>
    <div>Роль: {item.name_role ? item.name_role : ''}</div>
  </Card.Content>
  {#if onClick}
    <Card.Footer class="flex-col gap-2">
      <Button onclick={onClick} class="w-full">{text}</Button>
    </Card.Footer>
  {/if}
</Card.Root>

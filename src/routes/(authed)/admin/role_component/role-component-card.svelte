<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let { item, onclick, text, btnVariant = 'default' } = $props();
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Связка Роль - Компонента</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Роль: {item.name_role} ({item.code_role})</div>
    <div>
      Компонента: {item.name_component} ({item.code_component})
    </div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    {#if onclick}
      <Button variant={btnVariant} {onclick}>{text ? text : 'Перейти'}</Button>
    {/if}
  </Card.Footer>
</Card.Root>

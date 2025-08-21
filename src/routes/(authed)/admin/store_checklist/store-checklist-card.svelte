<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let { item, onclick, text, btnVariant = 'default' } = $props();
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Связка Магазин - Чеклист</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Магазин: {item.name_store} ({item.code_store})</div>
    <div>
      Чеклист: {item.title}
    </div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    {#if onclick}
      <Button variant={btnVariant} {onclick}>{text ? text : 'Перейти'}</Button>
    {/if}
  </Card.Footer>
</Card.Root>

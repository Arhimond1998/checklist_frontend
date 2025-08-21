<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let { item, onclick, text, btnVariant = 'default'} = $props();
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Пользователь {item.login}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div>Имя: {item.name || ''}</div>
    <div>Фамилия: {item.surname || ''}</div>
    <div>Отчество: {item.patronymic || ''}</div>
    <div>Почта: {item.mail || ''}</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    {#if onclick}
      <Button variant={btnVariant} {onclick}>{text ? text : 'Перейти'}</Button>
    {/if}
  </Card.Footer>
</Card.Root>

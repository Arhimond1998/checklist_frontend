<script>
  import { goto } from '$app/navigation';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { page } from '$app/state';
  import * as Card from '$lib/components/ui/card/index.js';

  let items = [
    {
        title: 'Создать',
        description: 'Создать нового работника',
        url: 'add'
    },
    {
        title: 'Редактировать',
        description: 'Редактировать работника',
        url: 'edit'
    },
    {
        title: 'Удалить',
        description: 'Удалить работника',
        url: 'delete'
    },
    {
        title: 'Список',
        description: 'Список работников',
        url: 'list'
    },
  ];
</script>

{#each items as item }
    <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>{item.title}</Card.Title>
    </Card.Header>
    <Card.Content>
      <div>{item.description}</div>
    </Card.Content>
    <Card.Footer class="flex-col gap-2">
      <Button onclick={() => goto(`${page.url.pathname}/${item.url}`)} class="w-full">Перейти</Button>
    </Card.Footer>
  </Card.Root>
{/each}
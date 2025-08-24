<script>
  import { goto } from '$app/navigation';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import { Description } from '$lib/components/ui/alert';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  let items = [
    {
      title: 'Панель админа',
      description: 'Управление всем и всеми',
      url: 'admin',
      roles: ['admin'],
      components: [],
    },
    {
      title: 'Конструктор',
      description: 'Создание, редактирование, удаление чеклистов',
      url: 'constructor',
      roles: [],
      components: ['constructor'],
    },
    {
      title: 'Чеклисты',
      description: 'Заполнение чеклистов',
      url: 'checklist',
      roles: [],
      components: ['checklist'],
    },
    {
      title: 'Отчеты',
      description: 'Отчеты по чеклистам',
      url: 'report',
      roles: [],
      components: ['report'],
    }
  ];
</script>

{#each items as item}
  <RoleGuard requiredRoles={item.roles} requiredComponents={item.components}>
    <Card.Root rd.Root class="w-full max-w-sm">
      <Card.Header>
        <Card.Title>{item.title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <div>{item.description}</div>
      </Card.Content>
      <Card.Footer class="flex-col gap-2">
        <Button onclick={() => goto(item.url)} class="w-full">Перейти</Button>
      </Card.Footer>
    </Card.Root>
  </RoleGuard>
{/each}

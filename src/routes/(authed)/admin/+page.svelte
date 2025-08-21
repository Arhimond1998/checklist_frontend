<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import RoleGuard from '$lib/components/RoleGuard.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let items = [
    {
      title: 'Пользователи',
      description: 'Создание и редактирование пользователей сервиса',
      url: 'user'
    },
    {
      title: 'Роли',
      description: 'Создание и редактирование ролей пользователей',
      url: 'role'
    },
    {
      title: 'Магазины',
      description: 'Создание и редактирование магазинов',
      url: 'store'
    },
    {
      title: 'Работники',
      description: 'Создание и редактирование работников магазинов',
      url: 'employee'
    },
    {
      title: 'Магазин-Пользователь',
      description: 'Создание и редактирование привязок',
      url: 'store_user'
    },
    {
      title: 'Магазин-Работник',
      description: 'Создание и редактирование привязок',
      url: 'store_employee'
    },
    {
      title: 'Магазин-Чеклист',
      description: 'Создание и редактирование привязок',
      url: 'store_checklist'
    }
  ];
</script>

{#each items as item}
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title>{item.title}</Card.Title>
    </Card.Header>
    <Card.Content>
      <div>{item.description}</div>
    </Card.Content>
    <Card.Footer class="flex-col gap-2">
      <Button onclick={() => goto(`${page.url.pathname}/${item.url}`)} class="w-full"
        >Перейти</Button
      >
    </Card.Footer>
  </Card.Root>
{/each}

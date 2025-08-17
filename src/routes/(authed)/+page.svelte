<script>
    import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Конструктор</Card.Title>

  </Card.Header>
  <Card.Content>
    <div>Создание, редактирование, удаление чеклистов</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button onclick={() => goto('/constructor')} class="w-full">Перейти</Button>
  </Card.Footer>
</Card.Root>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Чеклисты</Card.Title>

  </Card.Header>
  <Card.Content>
    <div>Заполнение чеклистов</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button onclick={() => goto('/checklist')} class="w-full">Перейти</Button>
  </Card.Footer>
</Card.Root>


<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>Отчеты</Card.Title>

  </Card.Header>
  <Card.Content>
    <div>Отчеты по чеклистам</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button onclick={() => goto('/report')} class="w-full">Перейти</Button>
  </Card.Footer>
</Card.Root>

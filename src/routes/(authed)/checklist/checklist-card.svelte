<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  let { title, id_checklist } = $props();
  const onOpen = function () {
    goto(`/checklist/${id_checklist}`);
  };
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>{title}</Card.Title>

  </Card.Header>
  <Card.Content>
    <div>content</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button onclick={onOpen} class="w-full">Открыть</Button>
  </Card.Footer>
</Card.Root>

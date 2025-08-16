<script>
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  let { title, id_checklist, onclick, text, ...restProps } = $props();
  
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header>
    <Card.Title>{title}</Card.Title>

  </Card.Header>
  <Card.Content>
    <div>content</div>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button {onclick} class="w-full">{text}</Button>
  </Card.Footer>
</Card.Root>

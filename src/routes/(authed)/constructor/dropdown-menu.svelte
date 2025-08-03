<script>
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import ElipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';

  let { isOpenWeightWin = $bindable(false), isOpenDesc = $bindable(false) } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props}>
        <ElipsisVertical />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-40" align="start">
    <DropdownMenu.Group>
      <DropdownMenu.Item onclick={() => (isOpenDesc = !isOpenDesc)}>
        {isOpenDesc ? 'Удалить' : 'Добавить'} описание
      </DropdownMenu.Item>
      <DropdownMenu.Item onclick={() => (isOpenWeightWin = !isOpenWeightWin)}>
        Изменить вес
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

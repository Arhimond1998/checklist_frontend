<script>
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { TrashIcon, PenIcon, WaypointsIcon, CopyIcon } from '@lucide/svelte';
  import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';
  let { onUpdate, onDelete, onDuplicate } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" class="size-1">...</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Group>
      {#if onUpdate}
        <DropdownMenu.Item onSelect={onUpdate}>
          <PenIcon></PenIcon>Редактировать
        </DropdownMenu.Item>
      {/if}
      {#if onDelete}
        <DropdownMenu.Item onSelect={onDelete}>
          <TrashIcon></TrashIcon>Удалить
        </DropdownMenu.Item>
      {/if}
      {#if onDuplicate}
        <DropdownMenu.Item onSelect={onDuplicate}>
          <CopyIcon></CopyIcon>Дублировать
        </DropdownMenu.Item>
      {/if}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

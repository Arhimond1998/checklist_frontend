<script>
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { TrashIcon, PenIcon, WaypointsIcon } from '@lucide/svelte';
  import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';
  let { onUpdate, onDelete, onChangePassword } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline" class="size-1">...</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Group>
      <DropdownMenu.Item onSelect={onUpdate}>
        <PenIcon></PenIcon>Редактировать
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={onDelete}>
        <TrashIcon></TrashIcon>Удалить
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenuSeparator></DropdownMenuSeparator>
    <DropdownMenu.Group>
      <DropdownMenu.Item onSelect={onChangePassword}>
        <PenIcon></PenIcon>Сменить пароль
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenuSeparator></DropdownMenuSeparator>
    <DropdownMenu.Group>
      <DropdownMenu.Item onSelect={() => console.log('roleeeeeeeee')}>
        <WaypointsIcon></WaypointsIcon>Привязать к роли
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => console.log('storeeeeee')}>
        <WaypointsIcon></WaypointsIcon>Привязать к магазину
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

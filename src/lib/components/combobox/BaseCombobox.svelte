<script>
  import CheckIcon from '@lucide/svelte/icons/check';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import XIcon from '@lucide/svelte/icons/x';
  import { onMount, tick } from 'svelte';
  import * as Command from '$lib/components/ui/command/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { bffPost, cn } from '$lib/utils.js';
  import Label from '$lib/components/ui/label/label.svelte';

  let {
    items = $bindable([]),
    isSingle = true,
    values = $bindable([]),
    url,
    label = $bindable(''),
    filters = $bindable([]),
    labelWidth = $bindable('w-25'),
    width = $bindable('w-30')
  } = $props();

  if (isSingle && values && !Array.isArray(values)) {
    values = [values];
  }

  if (values == null) {
    values = [];
  }

  let open = $state(false);
  let triggerRef = $state(null);

  onMount(async () => {
    if (!url || url === '') return;
    console.log('start request');
    const postData = {};
    if (filters) {
      postData.filters = filters;
    }
    try {
      const resp = await bffPost(url, postData);
      console.log({ resp });
      if (resp) {
        items = resp.data;
      }
    } catch (error) {
      alert(error);
      console.log({ error });
    }
  });

  const selectedValue = $derived.by(() => {
    if (values.length > 1) return `${values.length} опции(й)`;
    if (values.length == 1) return items.find((f) => f.value === values[0])?.label;
  });

  function handleClearClick(event) {
    event.stopPropagation();
    values = [];
  }

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <div class="flex w-full max-w-full min-w-0">
        <Label for="combobox" class="mr-2 {labelWidth}">{label}</Label>
        <Button
          variant="outline"
          class="justify-between truncate {width} max-w-50 shrink-0"
          {...props}
          role="combobox"
          id="combobox"
          aria-expanded={open}
        >
          <span class="max-w-50 truncate {width}">{selectedValue || 'Выберите...'}</span>
          <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
        <button
          onclick={handleClearClick}
          class="flex w-8 items-center justify-center rounded-r-md border border-l-0 border-input bg-background hover:bg-accent hover:text-accent-foreground"
        >
          <XIcon class="size-4 shrink-0 opacity-50" />
        </button>
      </div>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Поиск..." />
      <Command.List>
        <Command.Empty>Не найдено.</Command.Empty>
        <Command.Group>
          {#each items as checkboxItem}
            <Command.Item
              onSelect={() => {
                if (!isSingle) {
                  if (!values.find((item) => item === checkboxItem.value)) {
                    values.push(checkboxItem.value);
                  } else {
                    values = values.filter((item) => item !== checkboxItem.value);
                  }
                } else {
                  values = [checkboxItem.value];
                  closeAndFocusTrigger();
                }
              }}
            >
              <CheckIcon
                class={cn(
                  'mr-2 size-4',
                  values.find((item) => item === checkboxItem.value) === undefined &&
                    'text-transparent'
                )}
              />
              <span>{checkboxItem.label}</span>
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

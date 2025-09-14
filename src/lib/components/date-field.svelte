<script>
  import Calendar from '$lib/components/ui/calendar/calendar.svelte';
  import * as Select from '$lib/components/ui/select/index.js';
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import XIcon from '@lucide/svelte/icons/x';
  import { Label } from '$lib/components/ui/label/index.js';
  import { untrack } from 'svelte';
  import { CalendarDate } from '@internationalized/date';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import Button from './ui/button/button.svelte';
  let dropdown = $state('dropdown');

  let {
    isDialogOpen = $bindable(false),
    value = $bindable(),
    title = 'Выбор даты',
    labelWidth = $bindable('w-25'),
    label = $bindable('Дата'),
    width = $bindable('w-45'),
    ...props
  } = $props();

  let calendarValue = $state();
  const dropdownOptions = [
    {
      label: 'Month and Year',
      value: 'dropdown'
    },
    {
      label: 'Month Only',
      value: 'dropdown-months'
    },
    {
      label: 'Year Only',
      value: 'dropdown-years'
    }
  ];

  const selectedDropdown = $derived(
    dropdownOptions.find((option) => option.value === dropdown)?.label ?? 'Dropdown'
  );

  const humanValue = $derived.by(() => {
    if (!value) {
      return 'Выберите...';
    }
    let day = value.split('-').at(-1);
    let month = value.split('-').at(1);
    let year = value.split('-').at(0);
    return `${day}.${month}.${year}`;
  });

  const id = $props.id();

  $effect(() => {
    if (calendarValue) {
      isDialogOpen = false;
      untrack(() => {
        let day = String(calendarValue.day).padStart(2, '0');
        let month = String(calendarValue.month).padStart(2, '0');
        let year = String(calendarValue.year).padStart(2, '0');
        value = `${year}-${month}-${day}`;
      });
    }
  });

  function handleClearClick(event) {
    event.stopPropagation();
    value = null;
  }
</script>

<div class="flex w-full max-w-full min-w-0">
  <Label for="combobox" class="mr-2 {labelWidth}">{label}</Label>
  <Button
    variant="outline"
    class="justify-between truncate {width} max-w-50 shrink-0"
    {...props}
    role="combobox"
    id="combobox"
    onclick={() => (isDialogOpen = true)}
    aria-expanded={open}
  >
    <span class="max-w-50 truncate {width} {value ? '' : 'text-gray-400'}">{humanValue}</span>
    <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
  </Button>
  <button
    onclick={handleClearClick}
    class="flex w-8 items-center justify-center rounded-r-md border border-l-0 border-input bg-background hover:bg-accent hover:text-accent-foreground"
  >
    <XIcon class="size-4 shrink-0 opacity-50" />
  </button>
</div>

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
    </DialogHeader>

    <div class="flex w-full flex-col gap-4">
      <Calendar
        type="single"
        bind:value={calendarValue}
        class="rounded-lg border shadow-sm"
        captionLayout={dropdown}
        locale="ru-RU"
      />
    </div>

    <Button variant="outline" onclick={() => (isDialogOpen = false)} class="w-full">Закрыть</Button>
  </DialogContent>
</Dialog>

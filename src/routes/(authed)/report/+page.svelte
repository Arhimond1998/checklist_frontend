<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';
  import { bffPost, formatDateTime } from '$lib/utils.js';
  import Filters from './filters.svelte';
  let { data } = $props();
  let colsNum = $state(6);

  let items = $state(data.data);
  $inspect(data, 'data');

  let isDialogOpen = $state(false);
  let filters = $state([]);
  $inspect(filters, 'filters');

  function onclick(id_checklist_user_report) {
    return () => {
      goto(`/report/${id_checklist_user_report}`);
    };
  }

  async function onFindClick() {
    const postData = {
      filters: filters
    };
    try {
      const resp = await bffPost('api/checklist_user_reports/titles', postData);
      for (const rec of resp.data) {
        rec.dt = formatDateTime(rec.dt);
      }
      items = resp.data;
    } catch (error) {
      alert(error);
      console.log({ error });
    }
  }

  function calculateColor(score, maxScore) {
    let successPercent = score / maxScore;
    if (successPercent >= 0.8) {
      return 'bg-green-100';
    }
    if (successPercent >= 0.5) {
      return 'bg-yellow-100';
    }
    return 'bg-red-100';
  }
</script>

<Filters bind:isDialogOpen bind:filters></Filters>
<div class="mt-8 grid gap-1 grid-cols-{colsNum} max-w-500">
  <Button onclick={() => (isDialogOpen = true)}>Фильтры</Button>
  <Button onclick={onFindClick}>Найти</Button>

  {#if items.length > 0}
    <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
      {#each items as checklistItem (checklistItem.id_checklist_user_report)}
        <Card.Root
          class="w-full max-w-sm {calculateColor(checklistItem.score, checklistItem.max_score)}"
        >
          <Card.Header>
            <Card.Title>Чеклист: {checklistItem.title}</Card.Title>
          </Card.Header>
          <Card.Content>
            <div>ФИО: {checklistItem.user_fullname}</div>
            <div>Время сохранения: {checklistItem.dt}</div>
            <div>Магазин: {checklistItem.name_store} ({checklistItem.code_store})</div>
            <div>Работник: {checklistItem.employee_fullname}</div>
          </Card.Content>
          <Card.Footer class="flex-col gap-2">
            <div>
              {Math.floor((checklistItem.score / Math.max(checklistItem.max_score, 1)) * 100 * 100) /
                100}%
            </div>
            <Button onclick={onclick(checklistItem.id_checklist_user_report)} class="w-full"
              >Посмотреть</Button
            >
          </Card.Footer>
        </Card.Root>
      {/each}
    </div>
  {:else}
    <label for="return_btn">Чеклистов нет.</label>
    <Button
      id="return_btn"
      onclick={() => {
        goto('/');
      }}>На главную страницу</Button
    >
  {/if}
</div>
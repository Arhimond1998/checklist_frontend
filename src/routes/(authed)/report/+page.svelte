<script>
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card/index.js';

  let { data } = $props();
  let colsNum = $state(6);

  $inspect(data, 'data');

  function onclick(id_checklist_user_report) {
    return () => {
      goto(`/report/${id_checklist_user_report}`);
    };
  }

  function handleResize(event) {
    const windowWidth = event.target.innerWidth;

    let cardsNum = Math.floor(Math.min(Math.max(windowWidth / 300, 1), 6));
    if (cardsNum !== 1 && cardsNum !== 6) {
      if (cardsNum > 3) {
        cardsNum = 3;
      } else {
        cardsNum = 1;
      }
    }

    colsNum = cardsNum;
  }
</script>

<svelte:window on:resize={handleResize} />
{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as checklistItem (checklistItem.id_checklist_user_report)}
      <Card.Root class="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Чеклист: {checklistItem.title}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div>ФИО: {checklistItem.user_fullname}</div>
          <div>Время заполнения: {checklistItem.dt}</div>
        </Card.Content>
        <Card.Footer class="flex-col gap-2">
          <div>{(checklistItem.score / checklistItem.max_score) * 100}%</div>
          <Button onclick={onclick(checklistItem.id_checklist_user_report)} class="w-full">Посмотреть</Button>
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

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


  function calculateColor(score, maxScore) {
    let successPercent = score / maxScore;
    if (successPercent < 0.5) {
      return 'bg-red-100';
    }
    if (successPercent < 0.8) {
      return 'bg-yellow-100';
    }
    return 'bg-green-100';
  }
</script>

{#if data.data.length > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as checklistItem (checklistItem.id_checklist_user_report)}
      <Card.Root
        class="w-full max-w-sm {calculateColor(checklistItem.score, checklistItem.max_score)}"
      >
        <Card.Header>
          <Card.Title>Чеклист: {checklistItem.title}</Card.Title>
        </Card.Header>
        <Card.Content>
          <div>ФИО: {checklistItem.user_fullname}</div>
          <div>Время заполнения: {checklistItem.dt}</div>
        </Card.Content>
        <Card.Footer class="flex-col gap-2">
          <div>{(Math.floor((checklistItem.score / Math.max(checklistItem.max_score, 1)) * 100 * 100) / 100) }%</div>
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

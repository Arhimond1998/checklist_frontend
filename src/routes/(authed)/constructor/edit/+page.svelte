<script>
  import ChecklistCard from '../../checklist/checklist-card.svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';

  let { data } = $props();
  let colsNum = $state(6);
  $inspect(colsNum);

  function onclick(id_checklist) {
    return () => {
      goto(`/constructor/edit/${id_checklist}`);
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

{#if data.data > 0}
  <div class="mt-8 grid gap-8 grid-cols-{colsNum} max-w-500">
    {#each data.data as checklistItem (checklistItem.id_checklist)}
      <ChecklistCard
        title={checklistItem.title}
        id_checklist={checklistItem.id_checklist}
        onclick={onclick(checklistItem.id_checklist)}
        text={'Редактировать'}
      ></ChecklistCard>
    {/each}
  </div>
{:else}
  <label for="return_btn">Редактировать нечего.</label>
  <Button
    id="return_btn"
    onclick={() => {
      goto('/constructor');
    }}>Вернуться</Button
  >
{/if}

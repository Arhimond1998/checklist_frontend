<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<h1>{page.status} {page.error.message}</h1>
<span style="font-size: 1em"> Erorr goes brrrrrrrrrr... </span>
<Button onclick={() => goto('/')}>Вернуться на главную</Button>

<script>
  import Checklist from './checklist.svelte';

  let { data } = $props();
  let editable = $state(true);
  for (let rec of data.data) {
    rec.checked = 2;
  }
</script>

<Checklist {data} {editable}></Checklist>

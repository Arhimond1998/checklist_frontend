<script>
  import Checklist from './checklist.svelte';

  let { data } = $props();
  $inspect(data)
  let editable = $state(true);
  for (let group of data.data) {
    for (let rec of group.items) {
      rec.checked = 2;
    }
  }
  console.log({ data });
</script>

<Checklist {data} {editable}></Checklist>

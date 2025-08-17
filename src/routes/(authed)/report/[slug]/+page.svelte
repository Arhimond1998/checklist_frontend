<script>
  import Checklist from "../../checklist/[slug]/checklist.svelte";

  let { data } = $props();
  let editable = $state(false);

</script>

<Checklist {data} {editable}></Checklist>

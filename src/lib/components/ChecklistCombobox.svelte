<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Чеклист'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/checklists/combobox'}></MultiCheckbox>


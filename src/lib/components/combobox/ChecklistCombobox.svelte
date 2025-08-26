<script>
  import MultiCheckbox from '$lib/components/combobox/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Чеклист'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} bind:values {label} url={'api/checklists/combobox'}></MultiCheckbox>


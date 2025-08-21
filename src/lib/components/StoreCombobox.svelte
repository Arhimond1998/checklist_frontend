<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Магазин'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/stores/combobox'}></MultiCheckbox>


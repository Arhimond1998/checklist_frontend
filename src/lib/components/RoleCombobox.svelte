<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Роль'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/roles/combobox'}></MultiCheckbox>

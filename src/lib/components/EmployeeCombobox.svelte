<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Работник'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/employees/combobox'}></MultiCheckbox>

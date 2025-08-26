<script>
  import MultiCheckbox from '$lib/components/combobox/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Работник'), isSingle = false, filters=$bindable([]) } = $props();
</script>

<MultiCheckbox {isSingle} bind:values {label} url={'api/employees/combobox'} bind:filters></MultiCheckbox>

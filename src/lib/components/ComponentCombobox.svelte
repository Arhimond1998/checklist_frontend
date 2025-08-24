<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Компонента'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/components/combobox'}></MultiCheckbox>

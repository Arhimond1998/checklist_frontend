<script>
  import MultiCheckbox from '$lib/components/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Пользователь'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} {values} {label} url={'api/users/combobox'}></MultiCheckbox>

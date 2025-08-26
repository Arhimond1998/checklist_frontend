<script>
  import MultiCheckbox from '$lib/components/combobox/BaseCombobox.svelte';
  let { values = $bindable([]), label = $bindable('Пользователь'), isSingle = false } = $props();
</script>

<MultiCheckbox {isSingle} bind:values {label} url={'api/users/combobox'}></MultiCheckbox>

<script>
  import { onMount } from 'svelte';
  import Tree from './tree-view/tree.svelte';
  import { bffPost } from '$lib/utils';
  let items = $state([]);
  let treeValues = $state([]);
  let { value = $bindable(), mode = 'all', title = 'Роли' } = $props();
  let isLoading = $state(true);
  onMount(async () => {
    try {
      const resp = await bffPost('api/roles/tree_combobox');
      if (resp) {
        items = resp.data;
      }
    } catch (error) {
      alert(error);
      console.log({ error });
    } finally {
      isLoading = false;
    }
  });
  if (value) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    treeValues = value;
  }
  $effect(() => {
    if ((mode = 'single')) {
      if (treeValues?.length) {
        value = treeValues[0];
      } else {
        value = null;
      }
    } else {
      value = treeValues;
    }
  });
  $inspect(value, 'role tree value');
</script>

{#if isLoading}
  <div>Loading...</div>
{:else}
  <Tree {items} bind:values={treeValues} {mode} {title}></Tree>
{/if}

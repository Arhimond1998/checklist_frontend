<script>
  import { SquarePlus, SquareMinus } from '@lucide/svelte';
  import Self from './tree-node.svelte';
  let { nodes = $bindable([]), mode = 'all', updateParentState, values = $bindable([]) } = $props(); // mode: 'single' 'multi'

  function updateNodeState() {
    nodes.forEach((node) => {
      if (!!node.children?.length) {
        const allChecked = node.children.every((child) => child.checked);
        const someChecked = node.children.some((child) => child.checked || child.indeterminate);

        node.checked = allChecked;
        node.indeterminate = someChecked && !allChecked;
      }
    });
    if (updateParentState && mode === 'all') {
      updateParentState();
    }
  }

  function _toggleNode(node, value) {
    node.checked = value;
    node.indeterminate = false;

    if (mode === 'all' && !!node.children?.length) {
      for (const child of node.children) {
        _toggleNode(child, value);
      }
    }

    if (mode === 'multi') {
      if (value) {
        if (values.find((r) => r === node.id) === undefined) values.push(node.id);
      } else {
        values = values.filter((r) => r !== node.id);
      }
    }

    if (mode === 'single') {
      if (value) values = [node.id];
      else values = [];
    }
  }
  function toggleNode(node) {
    _toggleNode(node, !node.checked);
    if (updateParentState && mode === 'all') {
      updateParentState();
    }
  }

  function toggleExpand(node) {
    node.expanded = !node.expanded;
  }

  let iconClass = 'ml-1 h-4 w-4';
</script>

<div class="font-sans text-sm">
  {#each nodes as node (node.id)}
    <div class="select-none">
      <div class="flex items-center gap-1 py-1">
        {#if !!node.children?.length}
          <button
            class="h-4 w-4 rounded text-gray-500 hover:bg-gray-100"
            onclick={() => toggleExpand(node)}
          >
            {#if node.expanded}
              <SquareMinus class={iconClass}></SquareMinus>
            {:else}
              <SquarePlus class={iconClass}></SquarePlus>
            {/if}
          </button>
        {:else}
          <div class="w-4"></div>
        {/if}

        <input
          type="checkbox"
          class="h-4 w-4 rounded text-blue-600"
          bind:checked={node.checked}
          indeterminate={node.indeterminate}
          onclick={() => toggleNode(node)}
        />

        <span
          class="flex-1 cursor-pointer rounded px-2 outline-1 hover:bg-gray-100"
          onclick={() => toggleExpand(node)}
        >
          {node.name}
        </span>
      </div>

      {#if !!node.children?.length && node.expanded}
        <div class="ml-6 border-l border-gray-200 pl-2">
          <Self bind:nodes={node.children} updateParentState={updateNodeState} bind:values {mode} />
        </div>
      {/if}
    </div>
  {/each}
</div>

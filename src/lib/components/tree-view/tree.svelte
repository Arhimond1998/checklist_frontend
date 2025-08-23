<script>
  import { Ribbon } from '@lucide/svelte';
  import TreeNode from './tree-node.svelte';
  import { untrack } from 'svelte';

  let {
    values = $bindable([]),
    items = [],
    id_parent = 'id_parent',
    treeItems = $bindable([]),
    mode = 'all',
    title = 'Tree',
  } = $props();

  console.log('Tree init');
  $inspect(items, 'raw items');
  $inspect(values, 'tree values');
  $inspect(treeItems, 'tree');

  function buildTree() {
    const nodeMap = new Map();
    const buildItems = $state.snapshot(items);
    buildItems.forEach((r) => {
      r.id_parent = r[id_parent] || null;
      r.checked = r.checked == null ? false : r.checked;
      r.children = [];
      r.expanded = true; // r.expanded == null ? false : r.expanded;
    });
    buildItems.forEach((r) => nodeMap.set(r.id, r));

    buildItems.forEach((r) => {
      if (r.id_parent !== null) {
        const parentNode = nodeMap.get(r.id_parent);
        if (parentNode) {
          parentNode.children.push(r);
        }
      }
    });
    return buildItems;
  }
  $effect(() => {
    if (items?.length) {
      const buildItems = buildTree();
      untrack(() => {
        treeItems = buildItems.filter((r) => r.id_parent === null);
        values = !!values?.length ? values : buildItems.filter((r) => r.checked).map((r) => r.id);
        if (!!values?.length && !!treeItems?.length) {
          applyValuesToNodes();
        }
      });
    }
  });

  if (!!values?.length && !!treeItems?.length) {
    applyValuesToNodes();
  }

  function collectSelectedIds() {
    function _recursive(node, _newValues) {
      if (node.checked) {
        _newValues.push(node.id);
      }

      if (!node.children?.length) {
        return;
      }

      for (const childNode of node.children) {
        _recursive(childNode, _newValues);
      }
    }

    const newValues = [];

    for (const treeNode of treeItems) {
      _recursive(treeNode, newValues);
    }

    return newValues;
  }

  function applyValuesToNodes() {
    function _recursive(node, currentValues) {
      node.indeterminate = false;
      if (currentValues.find((r) => r === node.id)) {
        node.checked = true;
      } else {
        node.checked = false;
      }

      if (!node.children?.length) return;

      if (mode === 'all' && !!node.children?.length) {
        const allChecked = node.children.every((child) => child.checked);
        const someChecked = node.children.some((child) => child.checked || child.indeterminate);
        node.checked = allChecked;
        node.indeterminate = someChecked && !allChecked;
      }

      node.children.forEach((n) => {
        _recursive(n, currentValues);
        if (mode === 'all' && !!n.children?.length) {
          const allChecked = n.children.every((child) => child.checked);
          const someChecked = n.children.some((child) => child.checked || child.indeterminate);

          n.checked = allChecked;
          n.indeterminate = someChecked && !allChecked;
        }
      });
    }
    for (const treeNode of treeItems) {
      _recursive(treeNode, values);
    }
  }

  let syncing = false;
  // Эффект для синхронизации values при изменении nodes
  $effect(() => {
    if (syncing) return;
    syncing = true;
    treeItems;
    console.log('collectSelectedIds');
    untrack(() => {
      values = collectSelectedIds(treeItems);
    });

    syncing = false;
  });

  // Эффект для синхронизации nodes при изменении values
  $effect(() => {
    if (syncing) return;
    syncing = true;
    values;
    console.log('apply values');
    untrack(() => applyValuesToNodes());
    syncing = false;
  });

  function updateValuesRecursive(node, newValues) {
    if (node.checked) {
      newValues.push(node.id);
    }

    if (!!node.children?.length) {
      for (const childNode of node.children) {
        updateValuesRecursive(childNode, newValues);
      }
    }
  }

  function _updateValue() {
    let newValues = [];
    for (const node of treeItems) {
      updateValuesRecursive(node, newValues);
    }
    return newValues;
  }

  function updateValue() {
    values = _updateValue();
  }
</script>

<div class="mx-auto max-w-md p-4 outline-2">
  <h1 class="mb-4 text-xl font-bold">{title}</h1>
  <TreeNode bind:nodes={treeItems} updateParentState={updateValue} {mode} bind:values />
</div>

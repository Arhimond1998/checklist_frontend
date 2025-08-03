<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  let {
    children,
    withHandle = true,
    ref = $bindable(null),
    resizable = false,
    defaultSize = 10,
    minSize = 0,
    maxSize = 100,
    collapsed = false,
    resizePosition = 'after',
    collapsible = true,
    ...restProps
  } = $props();

  let draggingStartSize = $state(0);
  let draggingEndSize = $state(0);

  let onClickMimick = function () {
    if (collapsible) {
      if (ref.isCollapsed()) {
        ref.expand();
      } else {
        ref.collapse();
      }
    }
  };

  let onDraggingChange = function (isDraggingStart) {
    let currentSize = ref.getSize();
    if (isDraggingStart) {
      draggingStartSize = currentSize;
    } else {
      draggingEndSize = currentSize;
      if (Math.abs(draggingEndSize - draggingStartSize) < 0.0000001 || !resizable) onClickMimick();
    }
  };

</script>

{#snippet handle()}
  <Resizable.Handle {withHandle} {onDraggingChange} disabled={!resizable} />
{/snippet}

{#if (resizable || collapsible) && resizePosition === 'before'}
  {@render handle()}
{/if}

<Resizable.Pane
  class="bg-gray-100 h-full w-full p-1"
  bind:this={ref}
  collapsedSize={0}
  {defaultSize}
  {maxSize}
  {minSize}
  {collapsible}
  {...restProps}
>
  {@render children?.()}
</Resizable.Pane>

{#if (resizable || collapsible) && resizePosition === 'after'}
  {@render handle()}
{/if}
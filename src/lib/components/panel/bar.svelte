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

  if (!resizable) {
    maxSize = defaultSize;
    minSize = defaultSize;
  }

  let onClickMimick = function () {
    if (collapsible) {
      if (ref.isCollapsed()) {
        ref.expand();
      } else {
        ref.collapse();
      }
    }
  };

  $inspect(collapsed)
  $inspect(ref)
  let onDraggingChange = function (isDraggingStart) {
    let currentSize = ref.getSize();
    if (isDraggingStart) {
      draggingStartSize = currentSize;
    } else {
      draggingEndSize = currentSize;
      if (Math.abs(draggingEndSize - draggingStartSize) < 0.0000001) onClickMimick();
    }
  };
</script>

{#if (resizable || collapsible) && resizePosition === 'before'}
  <Resizable.Handle {withHandle} {onDraggingChange}/>
{/if}

<Resizable.Pane
  class={resizable || collapsible ? '' : 'outline'}
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
  <Resizable.Handle {withHandle} {onDraggingChange}/>
{/if}

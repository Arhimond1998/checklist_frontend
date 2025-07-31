<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import Bar from './bar.svelte';
  let {
    lbar, tbar, bbar, rbar, children
  } = $props()
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full w-full rounded-lg border">
  {@render lbar?.()}
  <Resizable.Pane defaultSize={75}>
    <Resizable.PaneGroup direction="vertical">
      {@render tbar?.()} 
      <Resizable.Pane defaultSize={200}>
          <div class="h-full overflow-auto">
              {@render children?.()}
          </div>
      </Resizable.Pane>
      {@render bbar?.()}
    </Resizable.PaneGroup>
  </Resizable.Pane>
  {@render rbar?.()}
</Resizable.PaneGroup>
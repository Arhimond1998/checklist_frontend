<script lang="ts">
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

  let { lbar, tbar, bbar, rbar, children } = $props();
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full w-full rounded-lg border">
  {@render lbar?.()}
  <Resizable.Pane defaultSize={75}>
    <Resizable.PaneGroup direction="vertical">
      {@render tbar?.()}
      <Resizable.Pane defaultSize={200}>
        <ScrollArea class="h-full">
          {@render children?.()}
        </ScrollArea>
      </Resizable.Pane>
      {@render bbar?.()}
    </Resizable.PaneGroup>
  </Resizable.Pane>
  {@render rbar?.()}
</Resizable.PaneGroup>

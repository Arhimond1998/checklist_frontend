<script>
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  let { children, breadcrumb } = $props();
</script>
<Sidebar.Provider class="h-screen w-screen">
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
      </div>
      <Separator orientation="vertical" />
    </header>

    {@render children()}
  </Sidebar.Inset>
</Sidebar.Provider>

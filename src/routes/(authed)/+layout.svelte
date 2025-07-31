<script>
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { setContext } from 'svelte';
  let { children } = $props();
  let breadcrumb = $state();
  onclick = function (event) {
    breadcrumb = event.target.innerText;
  }
</script>

<Sidebar.Provider class="h-screen w-screen">
  <AppSidebar {onclick}/>
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
      </div>
      <Separator orientation="vertical" />
      <h1 class="text-center font-serif text-4xl font-bold text-gray-800">
        {breadcrumb}
      </h1>
    </header>

    {@render children()}
  </Sidebar.Inset>
</Sidebar.Provider>

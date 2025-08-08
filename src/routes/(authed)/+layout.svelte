<script>
  import { page } from '$app/stores';
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { setContext } from 'svelte';

  let { children } = $props();
  let breadcrumbs = $derived($page.url.pathname.split('/').filter(Boolean));
</script>

{#snippet breadcrumb({ href, text })}
  <span>/ {text}</span>
  <!-- <a {href}>{text}</a> -->
{/snippet}

<Sidebar.Provider class="h-screen w-screen">
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
      </div>
      <Separator orientation="vertical" />
      {@render breadcrumb({ href: '/', text: 'home' })}

      {#each breadcrumbs as text, i}
        {@render breadcrumb({ href: text, text: text })}
      {/each}
      <!-- <h1 class="text-center font-serif text-4xl font-bold text-gray-800">
        
      </h1> -->
    </header>

    {@render children()}
  </Sidebar.Inset>
</Sidebar.Provider>

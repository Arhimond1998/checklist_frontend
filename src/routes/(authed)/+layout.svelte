<script>
  import { page } from '$app/stores';
  import AppSidebar from '$lib/components/app-sidebar.svelte';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import { setContext } from 'svelte';

  let { children } = $props();
  let breadcrumbs = $derived.by(() => {
    let result = [''];
    for (let rec of $page.url.pathname.split('/').filter(Boolean)) {
      result.push(result[result.length - 1] + '/' + rec);
    }
    result[0] = '/';
    return result;
  });
</script>

{#snippet breadcrumb({ href, text })}
  <!-- <span>/ {text}</span> -->
  <a {href}>/ {text == '/' ? 'home' : text.split('/').at(-1)}</a>
{/snippet}

<Sidebar.Provider class="h-screen w-screen">
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
      </div>
      <Separator orientation="vertical" />
      {#each breadcrumbs as text, i}
        {#if breadcrumbs.length - i <= 3}
          {@render breadcrumb({ href: text, text: text })}
        {/if}
      {/each}
    </header>
    <ScrollArea class="h-full w-full overflow-auto">
      {@render children()}
    </ScrollArea>
  </Sidebar.Inset>
</Sidebar.Provider>

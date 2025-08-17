<script module>
  import BookOpenIcon from '@lucide/svelte/icons/book-open';
  import BotIcon from '@lucide/svelte/icons/bot';
  import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
  import FrameIcon from '@lucide/svelte/icons/frame';
  import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
  import MapIcon from '@lucide/svelte/icons/map';
  import SendIcon from '@lucide/svelte/icons/send';
  import Settings2Icon from '@lucide/svelte/icons/settings-2';
  import BrickWallIcon from '@lucide/svelte/icons/brick-wall';
  import BookCheckIcon from '@lucide/svelte/icons/book-check';

  let userData = $state({});
  const data = $derived({
    user: userData,
    navMain: [
      {
        title: 'Конструктор чеклистов',
        url: '/constructor',
        icon: BrickWallIcon,
        isActive: true
      },
      {
        title: 'Чеклисты',
        url: '/checklist',
        icon: BookCheckIcon
      },
      {
        title: 'Отчеты',
        url: '/report',
        icon: BookOpenIcon
      }
    ],
    navSecondary: [
      // {
      //   title: 'Support',
      //   url: '#',
      //   icon: LifeBuoyIcon
      // },
      // {
      //   title: 'Feedback',
      //   url: '#',
      //   icon: SendIcon
      // }
    ],
    projects: [
      // {
      //   name: 'Design Engineering',
      //   url: '#',
      //   icon: FrameIcon
      // },
      // {
      //   name: 'Sales & Marketing',
      //   url: '#',
      //   icon: ChartPieIcon
      // },
      // {
      //   name: 'Travel',
      //   url: '#',
      //   icon: MapIcon
      // }
    ]
  });
</script>

<script>
  import NavMain from './nav-main.svelte';
  import NavProjects from './nav-projects.svelte';
  import NavSecondary from './nav-secondary.svelte';
  import NavUser from './nav-user.svelte';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import CommandIcon from '@lucide/svelte/icons/command';
  import { getUserData } from '$lib/utils';
  let { ref = $bindable(null), ...restProps } = $props();

  userData = getUserData();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <CommandIcon class="size-4" />
              </div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-medium">Сервис чеклистов</span>
                <span class="truncate text-xs">by Edoxus</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <!-- <NavProjects projects={data.projects} /> -->
    <!-- <NavSecondary items={data.navSecondary} class="mt-auto" /> -->
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={data.user} />
  </Sidebar.Footer>
</Sidebar.Root>

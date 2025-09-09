<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import UserTree from '$lib/components/RoleTree.svelte';

  let { data } = $props();
  let item = $state(data.data);

  let password = $state();
  let isLoading = $state(false);
  async function onclick() {
    isLoading = true;
    try {
      let resp;
      if (!password) {
        alert('Введите пароль');
        return;
      }
      const postData = {
        login: item.login,
        password: password
      };
      resp = await bffPost('api/users/change_password', postData);
      goto('/admin/user');
    } catch (error) {
      console.log({ error });
      alert(error.msg);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="mx-auto max-w-md p-6">
  <div class="space-y-2">
    <Label for="login" class="block text-sm font-medium">Логин</Label>
    <Input
      bind:value={item.login}
      id="login"
      class="w-full"
      placeholder="Введите логин"
      disabled={true}
    />
  </div>

  <div class="space-y-2">
    <Label for="password" class="block text-sm font-medium">Пароль</Label>
    <Input bind:value={password} type="password" id="password" class="w-full" placeholder="****" />
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

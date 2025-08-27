<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import UserTree from '$lib/components/RoleTree.svelte';

  let {
    item = $bindable({
      id_user: null,
      name: '',
      surname: '',
      patronymic: '',
      mail: '',
      login: '',
      password: '',
    })
  } = $props();

  let isLoading = $state(false);
  async function onclick() {
    isLoading = true;
    try {
      let resp;
      const postData = {
        name: item.name,
        surname: item.surname,
        patronymic: item.patronymic,
        mail: item.mail,
      };
      if (item.id_user) {
        resp = await bffPut(`api/users/${item.id_user}`, postData);
      } else {
        postData.login = item.login;
        postData.password = item.password;
        resp = await bffPost('api/users', postData);
      }
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
    <Label for="firstName" class="block text-sm font-medium">Имя</Label>
    <Input
      bind:value={item.name}
      id="firstName"
      required
      class="w-full"
      placeholder="Введите имя"
    />
  </div>

  <div class="space-y-2">
    <Label for="secondName" class="block text-sm font-medium">Фамилия</Label>
    <Input bind:value={item.surname} id="secondName" class="w-full" placeholder="Введите фамилию" />
  </div>

  <div class="space-y-2">
    <Label for="middleName" class="block text-sm font-medium">Отчество</Label>
    <Input
      bind:value={item.patronymic}
      id="middleName"
      class="w-full"
      placeholder="Введите отчество"
    />
  </div>

  <div class="space-y-2">
    <Label for="mail" class="block text-sm font-medium">Почта</Label>
    <Input
      bind:value={item.mail}
      id="mail"
      type="email"
      class="w-full"
      placeholder="Введите почту"
    />
  </div>

  <div class="space-y-2">
    <Label for="login" class="block text-sm font-medium">Логин</Label>
    <Input
      bind:value={item.login}
      id="login"
      class="w-full"
      placeholder="Введите логин"
      disabled={item.id_user !== null}
    />
  </div>

  <div class="space-y-2">
    <Label for="password" class="block text-sm font-medium">Пароль</Label>
    <Input
      bind:value={item.password}
      type="password"
      id="password"
      class="w-full"
      placeholder="****"
      disabled={item.id_user !== null}
    />
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

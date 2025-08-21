<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  let {
    item = $bindable({
      id_employee: null,
      name: '',
      surname: '',
      patronymic: '',
      mail: ''
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
        mail: item.mail
      };
      if (item.id_employee) {
        resp = await bffPut(`api/employees/${item.id_employee}`, postData);
      } else {
        resp = await bffPost('api/employees', postData);
      }
      goto('/admin/employee/list');
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
    <Label for="lastName" class="block text-sm font-medium">Фамилия</Label>
    <Input
      bind:value={item.surname}
      id="lastName"
      required
      class="w-full"
      placeholder="Введите фамилию"
    />
  </div>

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
    <Input bind:value={item.mail} id="mail" class="w-full" placeholder="Введите почту" />
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

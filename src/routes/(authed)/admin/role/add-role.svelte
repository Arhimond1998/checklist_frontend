<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import RoleTree from '$lib/components/RoleTree.svelte';

  let {
    item = $bindable({
      id_role: null,
      name: '',
      code: '',
      id_parent: null
    })
  } = $props();
  let isLoading = $state(false);
  async function onclick() {
    isLoading = true;
    try {
      let resp;
      const postData = {
        name: item.name,
        code: item.code,
        id_parent: item.id_parent
      };
      if (item.id_role) {
        resp = await bffPut(`api/roles/${item.id_role}`, postData);
      } else {
        resp = await bffPost('api/roles', postData);
      }
      goto('/admin/role');
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
    <Label for="firstName" class="block text-sm font-medium">Наименование</Label>
    <Input
      bind:value={item.name}
      id="firstName"
      required
      class="w-full"
      placeholder="Введите наименование"
    />
  </div>

  <div class="space-y-2">
    <Label for="middleName" class="block text-sm font-medium">Код</Label>
    <Input
      bind:value={item.code}
      id="middleName"
      class="w-full"
      placeholder="Введите код"
      disabled={item.id_role !== null}
    />
  </div>

  <div class="space-y-2">
    <RoleTree mode={'single'} bind:value={item.id_parent} title={'Прямой руководитель:'}></RoleTree>
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

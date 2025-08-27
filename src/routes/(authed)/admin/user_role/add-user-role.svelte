<script>
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import * as Card from '$lib/components/ui/card';
  import { bffPost, bffPut } from '$lib/utils';
  import { goto } from '$app/navigation';
  import Page from '../+page.svelte';
  import UserTree from '$lib/components/RoleTree.svelte';
  import UserCombobox from '$lib/components/combobox/UserCombobox.svelte';
  import RoleCombobox from '$lib/components/combobox/RoleCombobox.svelte';

  let {
    item = $bindable({
      id_user_role: null,
      id_user: null,
      id_role: null,
      name: '',
      surname: '',
      patronymic: '',
      login: '',
      name_role: ''
    })
  } = $props();
  let userValues = $state([]);
  let roleValues = $state([]);
  let isLoading = $state(false);
  async function onclick() {
    isLoading = true;
    try {
      if (!userValues?.length || !roleValues?.length) {
        alert('Выберите Пользователей и Роли для связки');
        return;
      }
      let resp;
      const postData = {
        id_user: userValues[0],
        id_role: roleValues[0]
      };

      resp = await bffPost('api/user_roles', postData);

      goto('/admin/user_role');
    } catch (error) {
      console.log({ error });
      alert(error.msg);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="mx-auto max-w-md gap-1 p-6">
  <div class="space-y-2">
    <UserCombobox bind:values={userValues}></UserCombobox>
  </div>
  <div class="space-y-2">
    <RoleCombobox bind:values={roleValues} isSingle={true}></RoleCombobox>
  </div>

  <Button
    disabled={isLoading}
    {onclick}
    class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
  >
    {isLoading ? 'Сохранение...' : 'Сохранить'}
  </Button>
</div>

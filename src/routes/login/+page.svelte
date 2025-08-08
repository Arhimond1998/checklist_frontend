<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Alert from '$lib/components/ui/alert';
  import { goto, invalidate } from '$app/navigation';
  import { isAuthorized, bffPost, setAuthToken, setUserData } from '$lib/utils';
  import axios from 'axios';

  const onsubmit = async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение

    // Собираем данные формы
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Конвертируем в объект
    const data = Object.fromEntries(formData);

    try {
      const resp = await bffPost('api/auth/login', data);
      console.log({ resp });
      if (resp.status == 200) {
        setAuthToken(resp.data.access_token);
        setUserData(resp.data);
      }
      goto('/');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Неправильный логин пароль');
    }
  };
</script>

{#await isAuthorized()}
  <h1 class="flex min-h-screen items-center justify-center">Проверяем данные...</h1>
{:then { isAuth }}
  {#if isAuth}
    <h1 class="flex min-h-screen items-center justify-center">Вы успешно залогинились!</h1>
    <div><a href="/">Вернуться в главное меню.</a></div>
  {:else}
    <div class="flex min-h-screen items-center justify-center">
      <Card.Root class="w-full max-w-sm">
        <form method="POST" {onsubmit}>
          <Card.Header>
            <Card.Title>Окно авторизации</Card.Title>
            <Card.Description>Введите почту в поле ниже</Card.Description>
            <!-- <Card.Action>
				<Button variant="link">Вход</Button>
			</Card.Action> -->
          </Card.Header>
          <Card.Content>
            <div class="flex flex-col gap-6">
              <div class="grid gap-2">
                <Label for="login">Логин</Label>
                <Input id="login" type="text" name="login" placeholder="Login" required />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <Label for="password" required>Пароль</Label>
                  <!-- <a href="##" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
								Забыли пароль?
							</a> -->
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
            </div>
          </Card.Content>
          <Card.Footer class="flex-col gap-2">
            <Button type="submit" class="w-full">Вход</Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </div>
  {/if}
{/await}

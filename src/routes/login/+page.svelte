<script>
  import { Button } from '$lib/components/ui/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Alert from '$lib/components/ui/alert';
  import { goto, invalidate } from '$app/navigation';

  let is_auth;
  try {
    is_auth = JSON.parse(localStorage.getItem('userData')) ? true : false;
  } catch (error) {
    console.log('Wrong user data')
    is_auth = false;
  }

  const onsubmit = async (event) => {
    event.preventDefault(); // Отменяем стандартное поведение

    // Собираем данные формы
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Конвертируем в объект
    const data = Object.fromEntries(formData);
    console.log('Отправляемые данные:', data);

    try {
      // проверить авторизован чи нет
      // авторизоваться если нет
      // Отправка на сервер
      // const response = await fetch('https://ваш-сервер.ru/api/login', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(data)
      // });
      const userData = {
        name: data.email.substring(0, data.email.indexOf('@')),
        email: data.email,
        avatar: null,
        authToken: 'token'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      goto('/');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      // Обработка ошибок (показать уведомление и т.д.)
    }
  };
</script>

{#if !is_auth}
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
              <Label for="email">Почта</Label>
              <Input id="email" type="email" name="email" placeholder="m@example.com" required />
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
{:else}
  <h1 class="flex min-h-screen items-center justify-center">
    You succesfully logged!
    <div><a href="/">Back to main menu.</a></div>
  </h1>
{/if}

<!--- ConfirmationDialog.svelte -->
<script>
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  let {
    isDialogOpen = $bindable(false),
    confirmText = 'Подтвердить',
    cancelText = 'Отмена',
    text = 'Подтвердите',
    delay = 0,
    onConfirm = () => {},
    onConfirmAsync = () => {},
    onCancel = () => {},
    onCancelAsync = () => {},
    btnVariant = 'outline'
  } = $props();

  // Состояние компонента
  let countdown = 0;
  let timerId = null;
  let btnDisabled = $state(false);

  // Запуск отсчета
  function startCountdown() {
    if (delay === 0) {
      btnDisabled = false;
      return;
    }
    resetCountdown();
    countdown = delay;

    if (delay > 0) {
      timerId = setInterval(() => {
        countdown = Math.max(0, countdown - 0.5);
        if (countdown === 0) {
          clearInterval(timerId);
          timerId = null;
          btnDisabled = false;
        }
      }, 500);
    }
  }

  async function onConfirmClick() {
    await onConfirmAsync();
    onConfirm();
    isDialogOpen = false;
  }

  async function onCancelClick() {
    await onCancelAsync();
    onCancel();
    isDialogOpen = false;
  }

  // Сброс таймера
  function resetCountdown() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    countdown = 0;
    btnDisabled = true;
  }

  // Реактивный блок для обработки открытия/закрытия
  $effect(() => {
    if (isDialogOpen) {
      startCountdown();
    } else {
      resetCountdown();
    }
    return () => resetCountdown();
  });
</script>

<Dialog bind:open={isDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{text}</DialogTitle>
    </DialogHeader>
    <Button variant={btnVariant} disabled={btnDisabled} onclick={onConfirmClick}>Удалить</Button>
    <Button variant="outline" onclick={onCancelClick}>Закрыть</Button>
  </DialogContent>
</Dialog>

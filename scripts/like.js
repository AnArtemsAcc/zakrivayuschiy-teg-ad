/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

const likeHeartArray = document.querySelectorAll('.like-icon');
const likeButtonArray = document.querySelectorAll('.card__like-button');
const iconButtonArray = document.querySelectorAll('.card__icon-button');
const saveButton = document.querySelector('.save-button');
const dialog = document.getElementById('dialog-id');
const dialogCloseButton = document.getElementById('dialog-close-button');

// Инициализация диалога
if (dialog) {
  // Открытие диалога при клике на кнопку "Сохранить на память"
  if (saveButton) {
    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      dialog.showModal();
    });
  }

  // Закрытие диалога при клике на кнопку "ок"
  if (dialogCloseButton) {
    dialogCloseButton.addEventListener('click', function() {
      dialog.close();
    });
  }

  // Закрытие диалога при клике на задний фон
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  // Закрытие диалога по клавише Escape
  dialog.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      dialog.close();
    }
  });
}

// Предотвращаем перезагрузку для всех кнопок
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    if (this.type === 'submit' || (this.classList.contains('save-button') && !this.classList.contains('card__like-button'))) {
      e.preventDefault();
    }
  });
});

iconButtonArray.forEach((iconButton, index) => {
  iconButton.onclick = (e) => {
    e.preventDefault();
    toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
  };
});

likeButtonArray.forEach((button, index) => {
  button.onclick = (e) => {
    e.preventDefault();
    toggleIsLiked(likeHeartArray[index], button);
  };
});

function toggleIsLiked(heart, button) {
  heart.classList.toggle('is-liked');
  setButtonText(heart, button);
}

function setButtonText(heart, button) {
  if ([...heart.classList].includes('is-liked')) {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Unlike'),
      500
    );
  } else {
    setTimeout(
      () => (button.querySelector('.button__text').textContent = 'Like'),
      500
    );
  }
}
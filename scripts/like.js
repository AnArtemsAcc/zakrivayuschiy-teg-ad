/* этот скрипт использует такие имена классов:
✦ like-icon — для svg-иконки анимированного сердца
✦ card__like-button — для кнопки Like рядом с иконкой
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ is-liked — для обозначения состояния лайкнутой иконки в виде сердца
✦ button__text — для обозначения текстового элемента внутри кнопки
Если эти классы поменять в HTML, скрипт перестанет работать. Будьте аккуратны.
*/

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  const likeHeartArray = document.querySelectorAll('.like-icon');
  const likeButtonArray = document.querySelectorAll('.card__like-button');
  const iconButtonArray = document.querySelectorAll('.card__icon-button');
  const saveButton = document.querySelector('.save-button');
  const dialog = document.getElementById('dialog-id');
  const dialogCloseButton = document.getElementById('dialog-close-button');

  // Функция для переключения состояния лайка
  function toggleIsLiked(heart, button) {
    if (!heart || !button) return;
    
    heart.classList.toggle('is-liked');
    setButtonText(heart, button);
  }

  // Функция для изменения текста кнопки
  function setButtonText(heart, button) {
    if (!heart || !button) return;
    
    const buttonText = button.querySelector('.button__text');
    if (!buttonText) return;
    
    if (heart.classList.contains('is-liked')) {
      setTimeout(() => {
        buttonText.textContent = 'Unlike';
      }, 500);
    } else {
      setTimeout(() => {
        buttonText.textContent = 'Like';
      }, 500);
    }
  }

  // Обработчики для кнопок с иконками
  iconButtonArray.forEach((iconButton, index) => {
    if (likeHeartArray[index] && likeButtonArray[index]) {
      iconButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleIsLiked(likeHeartArray[index], likeButtonArray[index]);
      });
    }
  });

  // Обработчики для кнопок Like
  likeButtonArray.forEach((button, index) => {
    if (likeHeartArray[index]) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        toggleIsLiked(likeHeartArray[index], button);
      });
    }
  });

  // Обработчик для кнопки "Сохранить на память"
  if (saveButton) {
    saveButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      if (dialog) {
        dialog.showModal();
      }
    });
  }

  // Обработчик для кнопки закрытия диалога
  if (dialogCloseButton && dialog) {
    dialogCloseButton.addEventListener('click', function(e) {
      e.preventDefault();
      dialog.close();
    });
  }

  // Закрытие диалога при клике на задний фон
  if (dialog) {
    dialog.addEventListener('click', function(e) {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }
});
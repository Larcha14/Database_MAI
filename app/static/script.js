// Кнопки основной панели пользователя
const openCartWindowBtn = document.getElementById('CartWindow_btn');
const openLikesWindowBtn = document.getElementById('LikesWindow_btn');
const openBookmarksWindowBtn = document.getElementById('BookmarksWindow_btn');
const openStorageWindowBtn = document.getElementById('StorageWindow_btn');
const openProfileWindowBtn = document.getElementById('ProfileWindow_btn');

// Окно входа:
const modalWindowLogin = document.getElementById('LoginModal');
const modalOverlayLogin = document.getElementById('LoginModalOverlay');
const closeModalLoginBtn = document.getElementById('LoginCloseModal_btn');
const OpenModalLogin = document.getElementById('LoginOpenModal_btn');

// Функция открытия модального окна
function showModalLogin() {
  if (modalWindowLogin && modalOverlayLogin) {
    modalWindowLogin.classList.add('show');
    modalOverlayLogin.classList.add('show');
  }
}

// Функция закрытия модального окна
function hideModalLogin() {
  if (modalWindowLogin && modalOverlayLogin) {
    modalWindowLogin.classList.remove('show');
    modalOverlayLogin.classList.remove('show');
  }
}

// Закрытие модального окна
if (closeModalLoginBtn && modalWindowLogin && modalOverlayLogin) {
  closeModalLoginBtn.addEventListener('click', hideModalLogin);
}

if (modalOverlayLogin) {
  modalOverlayLogin.addEventListener('click', (event) => {
    if (event.target === modalOverlayLogin) {
      hideModalLogin();
    }
  });
}

// Окно регистрации
const modalWindowRegister = document.getElementById('RegisterModal');
const modalOverlayRegister = document.getElementById('RegisterModalOverlay');
const closeModalRegister = document.getElementById('RegisterCloseModal_btn');
const OpenModalRegister = document.getElementById('RegisterOpenModal_btn');

// Функция открытия модального окна
function showModalRegister() {
  if (modalWindowRegister && modalOverlayRegister) {
    modalWindowRegister.classList.add('show');
    modalOverlayRegister.classList.add('show');
  }
}

// Функция закрытия модального окна
function hideModalRegister() {
  if (modalWindowRegister && modalOverlayRegister) {
    modalWindowRegister.classList.remove('show');
    modalOverlayRegister.classList.remove('show');
  }
}

// Закрытие модального окна
if (closeModalRegister && modalWindowRegister && modalOverlayRegister) {
  closeModalRegister.addEventListener('click', hideModalRegister);
}

// Открытие окна регистрации
if (OpenModalRegister) {
  OpenModalRegister.addEventListener('click', () => {
    // hideModalLogin(); // Скрыть модальное окно входа
    showModalRegister(); // Показать модальное окно регистрации
  });
}

// Закрываем модальные окна при клике вне их области
window.onclick = function (event) {
  if (event.target === modalWindowRegister || event.target === modalOverlayRegister) {
    hideModalRegister();
  } else if (event.target === modalWindowLogin || event.target === modalOverlayLogin) {
    hideModalLogin();
  }
};

if (modalOverlayRegister) {
  modalOverlayRegister.addEventListener('click', (event) => {
    if (event.target === modalOverlayRegister) {
      hideModalRegister();
    }
  });
}

console.log(OpenModalRegister);


window.addEventListener("message", (event) => {
  if (event.data.action === "openRegisterModal") {

        console.log("Кнопка 'Перейти в Register' нажата");
        hideModalLogin();
        showModalRegister();    // Показать модальное окно регистрации

  }
});

window.addEventListener("message", (event) => {
  if (event.data.action === "openLoginModal") {

        console.log("Кнопка 'Перейти в Login' нажата");
        hideModalRegister();
        showModalLogin();    

  }
});

// Cart
if (openCartWindowBtn) {
  openCartWindowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/check-auth');
      const data = await response.json();

      if ( !data.authenticated) {
        showModalLogin(); // Показываем модальное окно
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
    }
  });
}

// Likes
if (openLikesWindowBtn) {
  openLikesWindowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/check-auth');
      const data = await response.json();

      if ( !data.authenticated) {
        showModalLogin(); // Показываем модальное окно
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
    }
  });
}

// Bookmarks
if (openBookmarksWindowBtn) {
  openBookmarksWindowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/check-auth');
      const data = await response.json();

      if ( !data.authenticated) {
        showModalLogin(); // Показываем модальное окно
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
    }
  });
}

// Storage
if (openStorageWindowBtn) {
  openStorageWindowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/check-auth');
      const data = await response.json();

      if ( !data.authenticated) {
        showModalLogin(); // Показываем модальное окно
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
    }
  });
}

// Profile
if (openProfileWindowBtn) {
  openProfileWindowBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/check-auth');
      const data = await response.json();

      if ( !data.authenticated) {
        showModalLogin(); // Показываем модальное окно
      } else{
        const admin_response = await fetch('/check-admin');
        const data = await admin_response.json();
        if ( !data.authenticated){
          window.location.href = '/profile';
        } else{
          window.location.href = '/admin_profile';
        }
      }
    } catch (error) {
      console.error("Ошибка при проверке авторизации:", error);
    }
  });
}

const Login = document.getElementById('LoginButton');


if (Login) {
  Login.addEventListener('click', async () => {
    const username = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
      // Отправляем данные на сервер
      console.log("Nice")

      const formData = new FormData();
      formData.append('login', username);
      formData.append('password', password);

      // Отправляем данные как форму
      const response = await fetch('/login', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin', // Позволяет отправлять и получать куки
      });
      hideModalLogin();
      // window.location.replace() = '/profile';
      // // Проверяем статус ответа
      // if (response.status === 302) {
      //   // Переходим по адресу, указанному в заголовке `Location`
      //   if (redirectUrl) {
      //     hideModalLogin();
      //     window.location.href = '/profile';
      //   } else {
      //     throw new Error('Отсутствует URL для редиректа');
      //   }
      // } else if (response.ok) {
      //   // Если статус не 302, обрабатываем как обычный успешный ответ
      //   const result = await response.json();
      //   alert(result.message);
      // } else {
      //   // Обрабатываем ошибки
      //   const error = await response.json();
      //   alert(`Ошибка: ${error.message}`);
      // }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      alert('Произошла ошибка при авторизации.');
    }
  });

}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.parentNode.removeChild(modal); // Удаляем модальное окно из DOM
  }
}

// if (Login) {
//   Login.addEventListener('click', async () => {
//     hideModalLogin();
//     // window.location.href = '/admin_profile';
//   });
// }
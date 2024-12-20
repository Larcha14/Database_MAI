// Кнопки основной панели пользователя
const openSettingsWindowBtn = document.getElementById('AdminSettings_btn');
const openUsersWindowBtn = document.getElementById('AdminUsers_btn');
const openAdminProfileWindowBtn = document.getElementById('AdminProfile_btn');


const Logout = document.getElementById('Logout_btn');
const Home = document.getElementById('Home_btn');

if (Logout) {
  Logout.addEventListener('click', async () => {
      const response = await fetch('/logout', {
        method: 'POST'
    });
    window.location.href = '/';
  });
}

if (Home) {
  Home.addEventListener('click', async () => {
      const response = await fetch('/', {
        method: 'POST'
    });
    window.location.href = '/';
  });
}

// Settings
if (openAdminProfileWindowBtn) {
  openAdminProfileWindowBtn.addEventListener('click', async () => {
      console.log("Press settings")
      try {
        const response = await fetch('/check-auth');
        const data = await response.json();
  
        if ( !data.authenticated) {
          window.location.href = '/';
          showModalLogin(); // Показываем модальное окно
        } else{
          const admin_response = await fetch('/check-admin');
          const data = await admin_response.json();
          if ( !data.authenticated){
            window.location.href = '/';
          } else{
            window.location.href = '/admin_profile';
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    });
  }
  
  if (openSettingsWindowBtn) {
    openSettingsWindowBtn.addEventListener('click', async () => {
      console.log("Press settings")
      try {
        const response = await fetch('/check-auth');
        const data = await response.json();
  
        if ( !data.authenticated) {
          window.location.href = '/';
          showModalLogin(); // Показываем модальное окно
        } else{
          const admin_response = await fetch('/check-admin');
          const data = await admin_response.json();
          if ( !data.authenticated){
            window.location.href = '/';
          } else{
            window.location.href = '/settings';
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    });
  }
  
  if (openUsersWindowBtn) {
    openUsersWindowBtn.addEventListener('click', async () => {
      console.log("Press settings")
      try {
        const response = await fetch('/check-auth');
        const data = await response.json();
  
        if ( !data.authenticated) {
          window.location.href = '/';
          showModalLogin(); // Показываем модальное окно
        } else{
          const admin_response = await fetch('/check-admin');
          const data = await admin_response.json();
          if ( !data.authenticated){
            window.location.href = '/';
          } else{
            window.location.href = '/users';
          }
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    });
  }


const makeBackUp = document.getElementById('MakeBackUp_btn');
const makeUploadBackUp = document.getElementById('MakeUploadBackUp_btn');

if (makeBackUp) {
    makeBackUp.addEventListener('click', async () => {
      try {
        const response = await fetch('/make-backup');
        const data = await response.json();
  
        if ( !data.authenticated) {
          showModalLogin(); // Показываем модальное окно
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    });
  }

  if (makeUploadBackUp) {
    makeUploadBackUp.addEventListener('click', async () => {
      try {
        const response = await fetch('/upload_backup');
        const data = await response.json();
  
        if ( !data.authenticated) {
          showModalLogin(); // Показываем модальное окно
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    });
  }



// // Drag and drop
// const dropZone = document.getElementById('dropZone');

// if (dropZone){
// // Prevent default drag behaviors
// ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//   dropZone.addEventListener(eventName, preventDefaults, false);
//   document.body.addEventListener(eventName, preventDefaults, false);
// });

// // Highlight drop zone when dragging over it
// ['dragenter', 'dragover'].forEach(eventName => {
//   dropZone.addEventListener(eventName, highlight, false);
// });

// ['dragleave', 'drop'].forEach(eventName => {
//   dropZone.addEventListener(eventName, unhighlight, false);
// });

// // Handle dropped files
// dropZone.addEventListener('drop', handleDrop, false);

// function preventDefaults (e) {
//   e.preventDefault();
//   e.stopPropagation();
// }

// function highlight(e) {
//   dropZone.classList.add('dragover');
// }

// function unhighlight(e) {
//   dropZone.classList.remove('dragover');
// }

// function handleDrop(e) {
//   const dt = e.dataTransfer;
//   const files = dt.files;
//   handleFiles(files);
// }

// function handleFiles(files) {
//   ([...files]).forEach(uploadFile);
// }

// function uploadFile(file) {
//   // Here you can implement the actual file upload logic
//   console.log('Uploading file:', file.name);
//   // Example upload logic:
//   const formData = new FormData();
//   formData.append('file', file);
  
//   // You can uncomment and modify this fetch call to implement actual upload
//   /*
//   fetch('your-upload-endpoint', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => response.json())
//   .then(success => console.log('File uploaded successfully'))
//   .catch(error => console.error('Error uploading file:', error));
//   */
// }

// // // Also handle click upload
// document.querySelector('.upload-btn').addEventListener('click', () => {
//   document.getElementById('fileInput').click();
// });v2"/>
{/* <circle cx="12" cy="7" r="4"/> */}
// }

// // // Load user data when the page loads
// document.addEventListener('DOMContentLoaded', loadUserData);
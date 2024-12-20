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



// // Function to load user data
// async function loadUserData() {
//   try {
//     const response = await fetch('/profile');
//     if (response.ok) {
//       const user = await response.json();
//       document.getElementById('userAvatar').src = 'None';
//       document.getElementById('username').textContent = user.username;
//       // In a real application, you would fetch these additional details from your database
//       document.getElementById('firstName').textContent = user.first_name;
//       document.getElementById('lastName').textContent = user.last_name;
//       document.getElementById('email').textContent = user.email;
//       document.getElementById('website').textContent = user.website_url || 'Provide details';
//       document.getElementById('birthday').textContent = user.date_of_birthday || 'Provide details';
//       document.getElementById('description').textContent = user.description || 'No description provided yet...';
//     }
//     return 
//   } catch (error) {
//     console.error('Error loading user data:', error);
//   }
// }

// // Function to load user photos
// async function loadUserPhotos() {
//   try {
//     // In a real application, you would fetch this data from your database
//     const mockPhotos = [
//       {
//         id: 1,
//         name: 'Summer Landscape',
//         imageUrl: 'https://via.placeholder.com/400x400',
//         date: '2023-07-20',
//         price: '$299.99',
//         likes: 125,
//         comments: 32
//       },
//       {
//         id: 2,
//         name: 'City View',
//         imageUrl: 'https://via.placeholder.com/400x400',
//         date: '2023-07-19',
//         price: '$199.99',
//         likes: 98,
//         comments: 24
//       },
//       {
//         id: 3,
//         name: 'Nature Close-up',
//         imageUrl: 'https://via.placeholder.com/400x400',
//         date: '2023-07-18',
//         price: '$399.99',
//         likes: 256,
//         comments: 45
//       }
//     ];

//     const photosGrid = document.getElementById('photosGrid');
//     photosGrid.innerHTML = ''; // Clear existing content

//     mockPhotos.forEach(photo => {
//       const photoCard = document.createElement('div');
//       photoCard.className = 'photo-card';
//       photoCard.setAttribute('data-id', photo.id);
//       photoCard.innerHTML = `
//         <button class="delete-btn" onclick="deletePhoto(${photo.id})" title="Delete photo">
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
//             <path d="M3 6h18"></path>
//             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
//             <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
//           </svg>
//         </button>
//         <img src="${photo.imageUrl}" alt="Photo" class="photo-image">
//         <div class="photo-info">
//           <div class="photo-name">
//             ${photo.name}
//             <button class="edit-btn" onclick="editPhotoName(${photo.id})">
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
//               </svg>
//             </button>
//           </div>
//           <div class="photo-date">${new Date(photo.date).toLocaleDateString()}</div>
//           <div class="photo-price-container">
//             <div class="photo-price">${photo.price}</div>
//             <button class="edit-btn" onclick="editPhotoPrice(${photo.id})">
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
//               </svg>
//             </button>
//           </div>
//           <div class="photo-stats">
//             <div class="stat-item">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//               </svg>
//               ${photo.likes}
//             </div>
//             <div class="stat-item">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//               </svg>
//               ${photo.comments}
//             </div>
//           </div>
//         </div>
//       `;
//       photosGrid.appendChild(photoCard);
//     });
//   } catch (error) {
//     console.error('Error loading user photos:', error);
//   }
// }

// // Function to handle logout
// function handleLogout() {
//   // Add your logout logic here
//   alert('Logout functionality will be implemented here');
// }

// // Function to open modal
// function openModal(fieldName, currentValue, isTextarea = false) {
//   const modal = document.getElementById('editModal');
//   const modalTitle = modal.querySelector('.modal-title');
//   const modalInputContainer = document.getElementById('modalInputContainer');
//   const editingField = document.getElementById('editingField');
  
//   // Set the field being edited
//   editingField.value = fieldName;
  
//   // Set the modal title
//   modalTitle.textContent = `Edit ${fieldName}`;
  
//   // Create input element
//   let inputHtml = '';
//   if (isTextarea) {
//     inputHtml = `<textarea class="modal-textarea" id="modalInput">${currentValue}</textarea>`;
//   } else {
//     inputHtml = `<input type="text" class="modal-input" id="modalInput" value="${currentValue}">`;
//   }
  
//   modalInputContainer.innerHTML = inputHtml;
  
//   // Show the modal
//   modal.style.display = 'flex';
// }

// function closeModal() {
//   const modal = document.getElementById('editModal');
//   modal.style.display = 'none';
// }

// function saveChanges() {
//   const fieldName = document.getElementById('editingField').value;
//   const newValue = document.getElementById('modalInput').value;
  
//   // Update the appropriate field
//   const field = document.getElementById(fieldName.toLowerCase());
//   if (field) {
//     field.textContent = newValue;
//   }
  
//   // Here you would typically save to the database
//   console.log(`Saving ${fieldName}:`, newValue);
  
//   closeModal();
// }

// // Add event listeners to edit buttons
// document.querySelectorAll('.profile-edit').forEach(button => {
//   button.addEventListener('click', () => {
//     const field = button.parentElement.querySelector('.profile-label')?.textContent || 'About me';
//     const currentValue = button.parentElement.querySelector('.profile-value').textContent;
//     const isTextarea = field === 'About me';
//     openModal(field, currentValue, isTextarea);
//   });
// });

// // Update the photo edit functions
// function editPhotoName(photoId) {
//   const photoCard = document.querySelector(`.photo-card[data-id="${photoId}"]`);
//   const currentName = photoCard.querySelector('.photo-name').textContent.trim();
//   openModal('Photo Name', currentName);
// }

// function editPhotoPrice(photoId) {
//   const photoCard = document.querySelector(`.photo-card[data-id="${photoId}"]`);
//   const currentPrice = photoCard.querySelector('.photo-price').textContent;
//   openModal('Photo Price', currentPrice);
// }

// // Close modal when clicking outside
// window.onclick = function(event) {
//   const modal = document.getElementById('editModal');
//   if (event.target === modal) {
//     closeModal();
//   }
// }

// // Function to delete photo
// function deletePhoto(photoId) {
//   if (confirm('Are you sure you want to delete this photo?')) {
//     // Here you would typically delete from the database
//     console.log(`Deleting photo ${photoId}`);
    
//     // Remove the photo card from the DOM
//     const photoCard = document.querySelector(`.photo-card[data-id="${photoId}"]`);
//     if (photoCard) {
//       photoCard.remove();
//     }
    
//     // Alternatively, reload all photos to show updated data
//     loadUserPhotos();
//   }
// }




// // Update the DOMContentLoaded event listener to also load photos
// document.addEventListener('DOMContentLoaded', () => {
//   loadUserData();
//   loadUserPhotos();
// });

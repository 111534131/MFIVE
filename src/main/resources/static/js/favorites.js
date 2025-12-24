document.addEventListener('DOMContentLoaded', () => {
    const favoriteCarsContainer = document.getElementById('favorite-cars-container');
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (!loggedInUser) {
        // If not logged in, redirect to login page
        window.location.href = 'login.html';
        return;
    }

    const userId = loggedInUser.id;

    fetch(`/api/users/${userId}/favorites`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cars => {
            if (cars.length > 0) {
                favoriteCarsContainer.innerHTML = ''; // Clear existing content
                cars.forEach(car => {
                    const carCard = document.createElement('div');
                    carCard.className = 'car-card';
                    carCard.innerHTML = `
                        <a href="detail.html?id=${car.id}">
                            <img src="${car.imageUrl || 'images/placeholder.png'}" alt="${car.brand} ${car.model}">
                            <div class="car-card-content">
                                <h3>${car.brand} ${car.model}</h3>
                                <p class="price">NT$ ${car.price.toLocaleString()} 萬</p>
                            </div>
                        </a>
                        <button class="btn btn-secondary btn-remove-fav" data-car-id="${car.id}">移除</button>
                    `;
                    favoriteCarsContainer.appendChild(carCard);

                    // Add event listener for the remove button
                    carCard.querySelector('.btn-remove-fav').addEventListener('click', (e) => {
                        const carId = e.target.getAttribute('data-car-id');
                        removeFavorite(userId, carId, carCard);
                    });
                });
            } else {
                // Show message if there are no favorite cars
                noFavoritesMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching favorite cars:', error);
            favoriteCarsContainer.innerHTML = '<p>無法載入您的最愛列表，請稍後再試。</p>';
        });
});

async function removeFavorite(userId, carId, cardElement) {
    if (!confirm('您確定要將此車輛從我的最愛中移除嗎？')) {
        return;
    }

    try {
        const response = await fetch(`/api/favorites?userId=${userId}&carId=${carId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove the card from the DOM
            cardElement.remove();
            
            // Check if there are any cards left
            const container = document.getElementById('favorite-cars-container');
            if (container.children.length === 0) {
                document.getElementById('no-favorites-message').style.display = 'block';
            }
        } else {
            alert('移除失敗，請稍後再試。');
        }
    } catch (error) {
        console.error('Error removing favorite:', error);
        alert('發生錯誤，移除失敗。');
    }
}

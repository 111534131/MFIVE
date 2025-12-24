document.addEventListener('DOMContentLoaded', () => {
    const favoriteCarsContainer = document.getElementById('favorite-cars-container');
    const noFavoritesMessage = document.getElementById('no-favorites-message');
    const favoritesCount = document.getElementById('favorites-count');
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
                // 更新計數器
                if (favoritesCount) {
                    favoritesCount.textContent = `共 ${cars.length} 輛收藏車款`;
                }

                favoriteCarsContainer.innerHTML = ''; // Clear existing content
                cars.forEach(car => {
                    const carCard = document.createElement('div');
                    carCard.className = 'favorite-card';
                    carCard.innerHTML = `
                        <a href="detail.html?id=${car.id}">
                            <img src="${car.imageUrl || 'images/placeholder.png'}" alt="${car.brand} ${car.model}">
                        </a>
                        <div class="favorite-card-content">
                            <div class="brand">${car.brand}</div>
                            <h3>${car.model}</h3>
                            <p class="price">NT$ ${car.price.toLocaleString()} 萬</p>
                            <div class="favorite-card-actions">
                                <a href="detail.html?id=${car.id}" class="btn btn-view">查看詳情</a>
                                <button class="btn btn-remove" data-car-id="${car.id}">移除</button>
                            </div>
                        </div>
                    `;
                    favoriteCarsContainer.appendChild(carCard);

                    // Add event listener for the remove button
                    carCard.querySelector('.btn-remove').addEventListener('click', (e) => {
                        const carId = e.target.getAttribute('data-car-id');
                        removeFavorite(userId, carId, carCard);
                    });
                });
            } else {
                // Show message if there are no favorite cars
                if (favoritesCount) {
                    favoritesCount.textContent = '0 輛收藏車款';
                }
                noFavoritesMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching favorite cars:', error);
            if (favoritesCount) {
                favoritesCount.textContent = '載入失敗';
            }
            favoriteCarsContainer.innerHTML = '<p style="text-align: center; color: #666;">無法載入您的最愛列表，請稍後再試。</p>';
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
            // Remove the card from the DOM with animation
            cardElement.style.transition = 'all 0.3s ease';
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.8)';

            setTimeout(() => {
                cardElement.remove();

                // Update count
                const container = document.getElementById('favorite-cars-container');
                const favoritesCount = document.getElementById('favorites-count');
                const remainingCards = container.children.length;

                if (favoritesCount) {
                    favoritesCount.textContent = `共 ${remainingCards} 輛收藏車款`;
                }

                // Check if there are any cards left
                if (remainingCards === 0) {
                    document.getElementById('no-favorites-message').style.display = 'block';
                }
            }, 300);
        } else {
            alert('移除失敗，請稍後再試。');
        }
    } catch (error) {
        console.error('Error removing favorite:', error);
        alert('發生錯誤，移除失敗。');
    }
}


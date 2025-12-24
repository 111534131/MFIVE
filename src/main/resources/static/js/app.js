const API_BASE_URL = 'http://localhost:8080/api';


// Helper to get query params
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch featured cars (top 8 for horizontal scroll)
async function loadFeaturedCars() {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const cars = await response.json();
        const featuredGrid = document.getElementById('featured-grid');
        featuredGrid.innerHTML = '';

        // Display first 8 cars as featured
        const featuredCars = cars.slice(0, 8);

        featuredCars.forEach((car, index) => {
            const card = document.createElement('div');
            card.className = 'featured-card car-card';

            // Different badges for variety
            const badges = ['HOT', '熱門', '推薦', 'NEW', '精選', '熱賣', '限時', '優惠'];
            const badge = badges[index % badges.length];

            card.innerHTML = `
                <div class="featured-badge">${badge}</div>
                <a href="detail.html?id=${car.id}">
                    <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" onerror="this.src='images/placeholder.jpg'">
                </a>
                <div class="car-info">
                    <h3>${car.brand} ${car.model}</h3>
                    <p class="price">${car.price}</p>
                    <div class="actions">
                        <a href="detail.html?id=${car.id}" class="btn">查看詳情</a>
                        <button onclick="addToCompare(${car.id})" class="btn btn-secondary">比較</button>
                    </div>
                </div>
            `;
            featuredGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading featured cars:', error);
    }
}

// Scroll featured cars horizontally
function scrollFeatured(direction) {
    const grid = document.getElementById('featured-grid');
    const scrollAmount = 320; // Card width + gap
    if (direction === 'left') {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Show vehicles by category
let allCarsData = [];

async function showCategoryVehicles(category) {
    try {
        // Load all cars if not already loaded
        if (allCarsData.length === 0) {
            const response = await fetch(`${API_BASE_URL}/cars`);
            allCarsData = await response.json();
        }

        const categoryVehicles = document.getElementById('category-vehicles');
        categoryVehicles.innerHTML = '';

        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // Filter cars by category
        let filteredCars = [];
        if (category === 'all') {
            // Show recommended cars (first 12)
            filteredCars = allCarsData.slice(0, 12);
        } else if (category === 'Electric') {
            // Filter by fuel type
            filteredCars = allCarsData.filter(car =>
                car.fuelType === 'Electric' || car.fuelType === 'Hybrid'
            );
        } else {
            // Filter by body type
            filteredCars = allCarsData.filter(car => car.bodyType === category);
        }

        // Display filtered cars as small thumbnails
        filteredCars.forEach(car => {
            const card = document.createElement('a');
            card.className = 'category-vehicle-card';
            card.href = `detail.html?id=${car.id}`;

            card.innerHTML = `
                <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" onerror="this.src='images/placeholder.jpg'">
                <div class="category-vehicle-info">
                    <h4>${car.brand} ${car.model}</h4>
                    <div class="price-small">${car.price}</div>
                </div>
            `;
            categoryVehicles.appendChild(card);
        });

        // Show message if no cars found
        if (filteredCars.length === 0) {
            categoryVehicles.innerHTML = '<p style="text-align:center; padding:2rem; color:#999;">此分類暫無車輛</p>';
        }
    } catch (error) {
        console.error('Error loading category vehicles:', error);
    }
}

// Show vehicles by brand
async function showBrandVehicles(brand) {
    try {
        // Load all cars if not already loaded
        if (allCarsData.length === 0) {
            const response = await fetch(`${API_BASE_URL}/cars`);
            allCarsData = await response.json();
        }

        const categoryVehicles = document.getElementById('category-vehicles');
        categoryVehicles.innerHTML = '';

        // Update active tab
        document.querySelectorAll('.brand-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.brand === brand) {
                tab.classList.add('active');
            }
        });

        // Filter cars by brand
        let filteredCars = [];
        if (brand === 'all') {
            // Show recommended cars (first 12)
            filteredCars = allCarsData.slice(0, 12);
        } else {
            // Filter by brand name (case-insensitive)
            filteredCars = allCarsData.filter(car =>
                car.brand.toLowerCase() === brand.toLowerCase() ||
                car.brand.toLowerCase().includes(brand.toLowerCase())
            );
        }

        // Display filtered cars as small thumbnails
        filteredCars.forEach(car => {
            const card = document.createElement('a');
            card.className = 'category-vehicle-card';
            card.href = `detail.html?id=${car.id}`;

            card.innerHTML = `
                <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" onerror="this.src='images/placeholder.jpg'">
                <div class="category-vehicle-info">
                    <h4>${car.brand} ${car.model}</h4>
                    <div class="price-small">${car.price}</div>
                </div>
            `;
            categoryVehicles.appendChild(card);
        });

        // Show message if no cars found
        if (filteredCars.length === 0) {
            categoryVehicles.innerHTML = '<p style="text-align:center; padding:2rem; color:#999;">此品牌暫無車輛</p>';
        }
    } catch (error) {
        console.error('Error loading brand vehicles:', error);
    }
}


// Fetch all cars or search
async function loadCars() {
    const query = getQueryParam('q');
    let url = `${API_BASE_URL}/cars`;
    if (query) {
        url += `/search?query=${query}`;
    }

    try {
        const response = await fetch(url);
        const cars = await response.json();
        const grid = document.getElementById('car-grid');
        grid.innerHTML = '';

        // Group cars by series to show only one representative per series on homepage
        const displayedSeries = new Set();
        const uniqueCars = cars.filter(car => {
            // Simple logic to identify series: First word of model (e.g. "RAV4", "Corolla", "3-Series")
            // Or use brand + first 2 words if specific
            // Let's use a simpler approach: Key = Brand + First Word of Model
            let modelKey = car.model.split(' ')[0];

            // Special handling for some models
            if (car.model.includes('Class')) {
                modelKey = car.model.split(' ')[0] + ' ' + car.model.split(' ')[1]; // e.g. C-Class
            }

            const uniqueKey = `${car.brand}-${modelKey}`;

            if (displayedSeries.has(uniqueKey)) {
                return false;
            }
            displayedSeries.add(uniqueKey);
            return true;
        });

        uniqueCars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            // Determine display name
            let displayName = `${car.brand} ${car.model.split(' ')[0]}`;
            if (car.model.includes('Class')) {
                displayName = `${car.brand} ${car.model.split(' ')[0]} ${car.model.split(' ')[1]}`;
            }

            card.innerHTML = `
                <a href="detail.html?id=${car.id}">
                    <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" onerror="this.src='images/placeholder.jpg'">
                </a>
                <div class="car-info">
                    <h3>${displayName}</h3>
                    <p class="price">${car.price} 萬起</p> 
                    <div class="actions">
                        <a href="detail.html?id=${car.id}" class="btn">查看全車系</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

// Load car details and siblings specs
async function loadCarDetail() {
    const id = getQueryParam('id');
    if (!id) return;

    try {
        // 1. Load data
        const [carResponse, allCarsResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/cars/${id}`),
            fetch(`${API_BASE_URL}/cars`)
        ]);

        const car = await carResponse.json();
        const allCars = await allCarsResponse.json();

        // 2. Identify Series (Same logic as homepage)
        let modelKey = car.model.split(' ')[0];
        if (car.model.includes('Class')) {
            modelKey = car.model.split(' ')[0] + ' ' + car.model.split(' ')[1];
        }

        // 3. Filter siblings (Same brand AND model name contains the key)
        // Sort by price ascending
        const siblings = allCars.filter(c =>
            c.brand === car.brand && c.model.includes(modelKey)
        ).sort((a, b) => a.price - b.price);

        // 4. Update Main Info (Keep it simple, show the clicked car)
        document.getElementById('car-image').src = car.imageUrl;
        document.getElementById('car-title').textContent = `${car.brand} ${car.model}`;
        document.getElementById('car-price').textContent = `${car.price} 萬`;
        document.getElementById('car-desc').textContent = car.description;

        // 5. Render Full Series Specs Table
        const specsContainer = document.querySelector('.detail-info'); // Use main container

        // Remove old table if exists
        const oldTable = document.querySelector('.specs-table');
        if (oldTable) oldTable.remove();

        // Remove heading
        const oldH3 = specsContainer.querySelector('h3');
        if (oldH3) oldH3.textContent = `${modelKey} 全車系規格比較`;

        // Create new responsive table container
        const tableWrapper = document.createElement('div');
        tableWrapper.style.overflowX = 'auto';
        tableWrapper.style.marginTop = '2rem';

        let html = `
            <table class="specs-table" style="width: 100%; min-width: 800px; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="background:#f5f5f5; padding:10px; text-align:left; position:sticky; left:0; z-index:2; min-width:120px;">車型</th>
                        ${siblings.map(sib => `
                            <th style="background:${sib.id == car.id ? '#eef' : '#fff'}; padding:10px; border-bottom:2px solid #ddd; min-width:180px;">
                                ${sib.model}<br>
                                <span style="color:#d00; font-size:1.2em;">${sib.price} 萬</span>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
        `;

        const fields = [
            { label: '車身型式', key: 'bodyType' },
            { label: '座位數', key: 'seats', suffix: ' 座' },
            { label: '燃料種類', key: 'fuelType' },
            { label: '驅動型式', key: 'driveType' },
            { label: '變速系統', key: 'transmission' },
            { label: '排氣量', key: 'engineDisplacement', suffix: ' cc' },
            { label: '最大馬力', key: 'horsepower', suffix: ' hp' },
            { label: '最大扭力', key: 'torque' },
            { label: '0-100加速', key: 'acceleration', suffix: ' 秒' },
            { label: '車身尺寸', key: 'length', formatter: (c) => (c.length && c.width && c.height) ? `${c.length}x${c.width}x${c.height}` : '-' },
            { label: '車重', key: 'weight', suffix: ' kg' }
        ];

        fields.forEach(f => {
            html += `<tr>
                <td style="font-weight:bold; padding:10px; border-bottom:1px solid #eee; position:sticky; left:0; background:#fff; z-index:1;">${f.label}</td>
                ${siblings.map(sib => `
                    <td style="padding:10px; border-bottom:1px solid #eee; text-align:center; background:${sib.id == car.id ? '#f8f8ff' : '#fff'};">
                        ${f.formatter ? f.formatter(sib) : (sib[f.key] || '-')} ${!f.formatter && sib[f.key] && f.suffix ? f.suffix : ''}
                    </td>
                `).join('')}
            </tr>`;
        });

        html += `
                <tr>
                    <td style="padding:10px; position:sticky; left:0; background:#fff;"></td>
                    ${siblings.map(sib => `
                        <td style="padding:10px; text-align:center;">
                            <a href="detail.html?id=${sib.id}" class="btn" style="padding:5px 15px; font-size:0.9em; ${sib.id == car.id ? 'display:none' : ''}">查看</a>
                        </td>
                    `).join('')}
                </tr>
        </tbody></table>`;

        tableWrapper.innerHTML = html;

        // Replace existing specs area
        const existingTable = document.querySelector('table.specs-table');
        if (existingTable && existingTable.parentNode) {
            existingTable.parentNode.replaceChild(tableWrapper, existingTable);
        } else {
            specsContainer.appendChild(tableWrapper);
        }

        setupFavoriteButton(car.id);
    } catch (error) {
        console.error('Error loading car detail:', error);
    }
}

// Compare logic (using localStorage)
function addToCompare(id) {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (!compareList.includes(id)) {
        if (compareList.length >= 3) {
            alert('最多只能比較 3 款車輛。');
            return;
        }
        compareList.push(id);
        localStorage.setItem('compareList', JSON.stringify(compareList));
        alert('已加入比較清單！');
    } else {
        alert('此車輛已在比較清單中。');
    }
}

async function loadCompare() {
    const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    if (compareList.length === 0) {
        document.getElementById('compare-container').innerHTML = '<p style="text-align:center; padding: 2rem;">目前沒有車輛可供比較。</p>';
        return;
    }

    try {
        const cars = await Promise.all(compareList.map(id =>
            fetch(`${API_BASE_URL}/cars/${id}`).then(res => res.json())
        ));

        const table = document.getElementById('compare-table');
        let html = '<thead><tr><th>項目</th>';
        cars.forEach(car => {
            html += `<th>${car.brand} ${car.model}</th>`;
        });
        html += '</tr></thead><tbody>';

        const fields = [
            { label: '圖片', key: 'imageUrl', type: 'image' },
            { label: '參考售價', key: 'price', suffix: ' 萬' },
            { label: '車身型式', key: 'bodyType' },
            { label: '座位數', key: 'seats', suffix: ' 座' },
            { label: '燃料種類', key: 'fuelType' },
            { label: '驅動型式', key: 'driveType' },
            { label: '變速系統', key: 'transmission' },
            { label: '排氣量', key: 'engineDisplacement', suffix: ' cc' },
            { label: '最大馬力', key: 'horsepower', suffix: ' hp' },
            { label: '最大扭力', key: 'torque' },
            { label: '加速 (0-100)', key: 'acceleration', suffix: ' 秒' },
            { label: '車重', key: 'weight', suffix: ' kg' }
        ];

        fields.forEach(field => {
            html += `<tr><td><strong>${field.label}</strong></td>`;
            cars.forEach(car => {
                if (field.type === 'image') {
                    html += `<td><img src="${car[field.key]}" alt="Car" style="width:100%"></td>`;
                } else {
                    html += `<td>${car[field.key] || '-'}${field.suffix || ''}</td>`;
                }
            });
            html += '</tr>';
        });

        // Add remove buttons
        html += '<tr><td>操作</td>';
        cars.forEach(car => {
            html += `<td><button onclick="removeFromCompare(${car.id})" class="btn btn-secondary">移除</button></td>`;
        });
        html += '</tr>';

        html += '</tbody>';
        table.innerHTML = html;

    } catch (error) {
        console.error('Error loading comparison:', error);
    }
}

function removeFromCompare(id) {
    let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
    compareList = compareList.filter(carId => carId !== id);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    location.reload();
}

// Auth logic
async function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 取得 reCAPTCHA token
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('請完成 reCAPTCHA 驗證');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, recaptchaToken: recaptchaResponse })
        });

        if (response.ok) {
            alert('註冊成功！請登入。');
            window.location.href = 'login.html';
        } else {
            const errorMsg = await response.text();
            alert('註冊失敗：' + (errorMsg || '請稍後再試。'));
            grecaptcha.reset();
        }
    } catch (error) {
        console.error('Register error:', error);
        grecaptcha.reset();
    }
}

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 取得 reCAPTCHA token
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        alert('請完成 reCAPTCHA 驗證');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, recaptchaToken: recaptchaResponse })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('帳號或密碼錯誤');
            grecaptcha.reset();
        }
    } catch (error) {
        console.error('Login error:', error);
        grecaptcha.reset();
    }
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));

    const favoritesLink = document.getElementById('favorites-link');
    const adminLink = document.getElementById('admin-link');
    const authContainer = document.querySelector('.nav-auth');

    if (authContainer) {
        authContainer.innerHTML = ''; // Clear previous content
        if (user) {
            // User is logged in
            const roleText = user.role === 'ADMIN' ? ' (管理員)' : '';
            authContainer.innerHTML = `
                <a href="#" class="nav-user">歡迎, ${user.username}${roleText}</a>
                <a href="#" onclick="logout()" class="nav-logout">登出</a>
            `;

            if (favoritesLink && user.role !== 'ADMIN') {
                favoritesLink.style.display = 'inline';
            }
            if (adminLink && user.role === 'ADMIN') {
                adminLink.style.display = 'inline';
            }

        } else {
            // User is not logged in
            authContainer.innerHTML = '<a href="login.html" class="btn">登入/註冊</a>';
            if (favoritesLink) {
                favoritesLink.style.display = 'none';
            }
            if (adminLink) {
                adminLink.style.display = 'none';
            }
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    // Redirect to home page to ensure clean state
    window.location.href = 'index.html';
}

async function setupFavoriteButton(carId) {
    const user = JSON.parse(localStorage.getItem('user'));
    const favBtn = document.getElementById('favorite-btn');

    if (!user || !favBtn || user.role === 'ADMIN') {
        return; // Only show for non-admin logged-in users
    }

    favBtn.style.display = 'inline-block'; // Show the button

    const userId = user.id;
    let isFavorite = false;

    // 1. Check initial favorite status
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/exists?userId=${userId}&carId=${carId}`);
        isFavorite = await response.json();
        updateButton(isFavorite);
    } catch (error) {
        console.error('Error checking favorite status:', error);
        return; // Don't proceed if status check fails
    }

    // 2. Add click listener
    favBtn.addEventListener('click', async () => {
        const url = `${API_BASE_URL}/favorites`;
        let method;
        let body;

        if (isFavorite) {
            // If it is a favorite, we want to remove it
            method = 'DELETE';
            // Use query params for DELETE
            const params = new URLSearchParams({ userId, carId });
            body = null; // No body for DELETE with query params
        } else {
            // If it's not a favorite, we want to add it
            method = 'POST';
            body = JSON.stringify({ userId, carId });
        }

        try {
            const response = await fetch(isFavorite ? `${url}?${new URLSearchParams({ userId, carId })}` : url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (response.ok) {
                isFavorite = !isFavorite; // Toggle state
                updateButton(isFavorite);
            } else {
                const errorData = await response.text();
                alert(`操作失敗: ${errorData}`);
            }
        } catch (error) {
            console.error('Favorite toggle error:', error);
        }
    });

    function updateButton(isFav) {
        if (isFav) {
            favBtn.textContent = '移除收藏';
            favBtn.classList.add('btn-secondary'); // Style as "already added"
        } else {
            favBtn.textContent = '加入收藏';
            favBtn.classList.remove('btn-secondary');
        }
    }
}
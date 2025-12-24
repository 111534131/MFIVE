// 載入所有汽車到管理列表
async function loadAdminCars() {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const cars = await response.json();
        const tbody = document.getElementById('car-list');
        tbody.innerHTML = '';

        cars.forEach(car => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${car.imageUrl}" alt="${car.brand} ${car.model}"></td>
                <td>${car.brand}</td>
                <td>${car.model}</td>
                <td>${car.price}</td>
                <td>${car.bodyType}</td>
                <td>${car.fuelType}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="editCar(${car.id})">編輯</button>
                        <button class="btn-delete" onclick="deleteCar(${car.id})">刪除</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

// 開啟新增汽車 Modal
function openAddModal() {
    document.getElementById('modal-title').textContent = '新增汽車';
    document.getElementById('carForm').reset();
    document.getElementById('car-id').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('carModal').style.display = 'block';
}

// 編輯汽車
async function editCar(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/cars/${id}`);
        const car = await response.json();

        document.getElementById('modal-title').textContent = '編輯汽車';
        document.getElementById('car-id').value = car.id;
        document.getElementById('brand').value = car.brand;
        document.getElementById('model').value = car.model;
        document.getElementById('price').value = car.price;
        document.getElementById('bodyType').value = car.bodyType;
        document.getElementById('fuelType').value = car.fuelType;
        document.getElementById('transmission').value = car.transmission;
        document.getElementById('engineDisplacement').value = car.engineDisplacement;
        document.getElementById('horsepower').value = car.horsepower;
        document.getElementById('description').value = car.description;
        document.getElementById('imageUrl').value = car.imageUrl;

        // 顯示現有圖片
        if (car.imageUrl) {
            document.getElementById('image-preview').innerHTML = `<img src="${car.imageUrl}" alt="預覽">`;
        }

        document.getElementById('carModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading car:', error);
    }
}

// 刪除汽車
async function deleteCar(id) {
    if (!confirm('確定要刪除這輛車嗎?')) {
        return;
    }

    try {
        await fetch(`${API_BASE_URL}/cars/${id}`, {
            method: 'DELETE'
        });
        alert('刪除成功!');
        loadAdminCars();
    } catch (error) {
        console.error('Error deleting car:', error);
        alert('刪除失敗!');
    }
}

// 提交汽車表單
async function submitCar(event) {
    event.preventDefault();

    const carId = document.getElementById('car-id').value;
    const imageFile = document.getElementById('imageFile').files[0];
    let imageUrl = document.getElementById('imageUrl').value;

    // 如果有上傳新圖片,先上傳圖片
    if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData
            });
            const uploadResult = await uploadResponse.json();
            if (uploadResult.url) {
                imageUrl = uploadResult.url;
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('圖片上傳失敗!');
            return;
        }
    }

    const carData = {
        brand: document.getElementById('brand').value,
        model: document.getElementById('model').value,
        price: parseFloat(document.getElementById('price').value),
        bodyType: document.getElementById('bodyType').value,
        fuelType: document.getElementById('fuelType').value,
        transmission: document.getElementById('transmission').value,
        engineDisplacement: document.getElementById('engineDisplacement').value,
        horsepower: parseInt(document.getElementById('horsepower').value) || 0,
        description: document.getElementById('description').value,
        imageUrl: imageUrl
    };

    try {
        let response;
        if (carId) {
            // 更新現有汽車
            response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
        } else {
            // 新增汽車
            response = await fetch(`${API_BASE_URL}/cars`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
        }

        if (response.ok) {
            alert(carId ? '更新成功!' : '新增成功!');
            closeModal();
            loadAdminCars();
        } else {
            alert('操作失敗!');
        }
    } catch (error) {
        console.error('Error saving car:', error);
        alert('操作失敗!');
    }
}

// 關閉 Modal
function closeModal() {
    document.getElementById('carModal').style.display = 'none';
}

// 預覽圖片
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('image-preview').innerHTML = `<img src="${e.target.result}" alt="預覽">`;
        };
        reader.readAsDataURL(file);
    }
}

// 檢查管理員權限
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'ADMIN') {
        alert('您沒有權限訪問此頁面!');
        window.location.href = 'index.html';
    }
}

// 頁面載入時執行
if (document.getElementById('car-list')) {
    checkAdminAuth();
    loadAdminCars();
}

// 點擊 Modal 外部關閉
window.onclick = function (event) {
    const modal = document.getElementById('carModal');
    if (event.target === modal) {
        closeModal();
    }
}

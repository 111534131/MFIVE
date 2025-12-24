// 載入所有會員
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        const tbody = document.getElementById('users-list');
        tbody.innerHTML = '';

        const currentUser = JSON.parse(localStorage.getItem('user'));

        users.forEach(user => {
            const row = document.createElement('tr');
            const date = new Date(user.createdAt).toLocaleDateString('zh-TW');
            const isCurrentUser = currentUser && currentUser.id === user.id;

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><span class="role-badge role-${user.role.toLowerCase()}">${user.role === 'ADMIN' ? '管理員' : '會員'}</span></td>
                <td>${date}</td>
                <td>
                    <button class="btn-delete-user" 
                            onclick="deleteUser(${user.id})" 
                            ${isCurrentUser || user.role === 'ADMIN' ? 'disabled' : ''}>
                        ${isCurrentUser ? '當前使用者' : (user.role === 'ADMIN' ? '無法刪除' : '刪除')}
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// 刪除會員
async function deleteUser(userId) {
    if (!confirm('確定要刪除這個會員嗎?此操作無法復原!')) {
        return;
    }

    try {
        await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        });
        alert('刪除成功!');
        loadUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('刪除失敗!');
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
if (document.getElementById('users-list')) {
    checkAdminAuth();
    loadUsers();
}

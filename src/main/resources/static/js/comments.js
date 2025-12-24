// 載入車輛的所有留言
async function loadComments() {
    const carId = getQueryParam('id');
    if (!carId) return;

    try {
        const response = await fetch(`${API_BASE_URL}/comments/car/${carId}`);
        const comments = await response.json();
        const commentsList = document.getElementById('comments-list');

        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="text-align:center; color:#999; padding:2rem;">目前還沒有留言,成為第一個留言的人吧!</p>';
            return;
        }

        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';

            const date = new Date(comment.createdAt).toLocaleString('zh-TW');
            const user = JSON.parse(localStorage.getItem('user'));
            const isAdmin = user && user.role === 'ADMIN';
            const isAuthor = user && user.id === comment.user.id;

            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.user.username}</span>
                    <span class="comment-date">${date}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                ${(isAdmin || isAuthor) ? `
                    <div class="comment-actions">
                        <button class="btn-delete-comment" onclick="deleteComment(${comment.id})">刪除</button>
                    </div>
                ` : ''}
            `;

            commentsList.appendChild(commentDiv);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

// 檢查是否顯示留言表單
function checkCommentFormAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const formContainer = document.getElementById('comment-form-container');

    if (user) {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
}

// 發表留言
async function submitComment(event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('請先登入才能發表留言');
        return;
    }

    const carId = getQueryParam('id');
    const content = document.getElementById('comment-content').value;

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carId: parseInt(carId),
                userId: user.id,
                content: content
            })
        });

        if (response.ok) {
            alert('留言發表成功!');
            document.getElementById('comment-form').reset();
            loadComments();
        } else {
            alert('留言發表失敗!');
        }
    } catch (error) {
        console.error('Error submitting comment:', error);
        alert('留言發表失敗!');
    }
}

// 刪除留言
async function deleteComment(commentId) {
    if (!confirm('確定要刪除這則留言嗎?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('刪除成功!');
            loadComments();
        } else {
            alert('刪除失敗!');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('刪除失敗!');
    }
}

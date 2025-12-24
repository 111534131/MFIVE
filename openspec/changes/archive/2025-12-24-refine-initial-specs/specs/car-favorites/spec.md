## ADDED Requirements

### Requirement: Add to Favorites
已登入的會員 MUST 能夠將感興趣的車輛加入「我的最愛」列表。

*   **Id**: `add-to-favorites`

#### Scenario: Member Adds a Car to Favorites
*   **Given**: 一位已登入的會員正在查看 "BMW 3 Series" 的詳情頁。
*   **When**: 會員點擊「加入最愛」按鈕。
*   **Then**: 系統應將 "BMW 3 Series" 加入該會員的「我的最愛」列表，且按鈕狀態應變為「已收藏」。

#### Scenario: Guest Attempts to Add to Favorites
*   **Given**: 一位未登入的訪客。
*   **When**: 訪客點擊「加入最愛」按鈕。
*   **Then**: 系統應提示訪客需要登入，並可選擇將其導向登入頁面。

---

### Requirement: View Favorites List
已登入的會員 MUST 能查看自己的「我的最愛」列表。

*   **Id**: `view-favorites-list`

#### Scenario: Member Views Their Favorites
*   **Given**: 一位已登入的會員，其「我的最愛」列表包含 "BMW 3 Series"。
*   **When**: 會員點擊導覽列上的「我的最愛」連結。
*   **Then**: 系統應顯示一個頁面，列出所有該會員已收藏的車輛。

---

### Requirement: Remove From Favorites
已登入的會員 MUST 能從「我的最愛」列表中移除車輛。

*   **Id**: `remove-from-favorites`

#### Scenario: Member Removes a Car from Favorites
*   **Given**: 一位已登入的會員正在查看自己的「我的最愛」列表。
*   **When**: 會員點擊 "BMW 3 Series" 旁邊的「移除」按鈕。
*   **Then**: 該車輛應從列表中消失。

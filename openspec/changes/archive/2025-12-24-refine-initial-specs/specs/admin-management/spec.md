## ADDED Requirements

### Requirement: Manage Cars
管理員 MUST 能夠新增、修改、和刪除車輛資料。

*   **Id**: `manage-cars`

#### Scenario: Admin Adds a New Car
*   **Given**: 一位管理員已登入後台管理系統。
*   **When**: 管理員點擊「新增車輛」，填寫完所有規格、上傳圖片並儲存。
*   **Then**: 新的車輛應出現在網站前台的車輛列表中。

#### Scenario: Admin Edits an Existing Car
*   **Given**: 一位管理員發現 "Toyota Camry" 的價格資訊有誤。
*   **When**: 管理員在後台找到該車輛，修改其價格並儲存。
*   **Then**: 前台 "Toyota Camry" 詳情頁的價格應被更新。

#### Scenario: Admin Deletes a Car
*   **Given**: 一位管理員需要下架一款已停產的車輛。
*   **When**: 管理員在後台刪除該車輛。
*   **Then**: 該車輛應不再出現於前台任何頁面。

---

### Requirement: Manage Users
管理員 MUST 能夠查看所有使用者列表，並刪除特定使用者帳號。

*   **Id**: `manage-users`

#### Scenario: Admin Views User List
*   **Given**: 一位管理員已登入後台。
*   **When**: 管理員進入「使用者管理」頁面。
*   **Then**: 系統應顯示所有已註冊使用者的列表，包含其使用者名稱、電子郵件等資訊。

#### Scenario: Admin Deletes a User
*   **Given**: 一位管理員發現某個帳號是惡意廣告機器人。
*   **When**: 管理員在使用者列表中找到該帳號並點擊「刪除」。
*   **Then**: 該使用者帳號應被永久刪除，且該使用者無法再登入。

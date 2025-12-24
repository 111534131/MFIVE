# 開發任務清單

本清單列出了為實現 `refine-initial-specs` 提案所需執行的開發任務。任務順序已根據 MVP (最小可行性產品) 的交付要求進行排列。

---

### **第一階段：核心功能與後台建置 (MVP)**

1.  **[資料庫]** - 建立初始資料庫 Schema，包含 `users`, `cars` 等核心資料表。
2.  **[後端]** - 開發車輛管理功能 (Car Management) 的 API：
    *   `POST /api/cars` (新增車輛)
    *   `PUT /api/cars/{id}` (修改車輛)
    *   `DELETE /api/cars/{id}` (刪除車輛)
3.  **[前端]** - 建立管理員後台介面，用於操作車輛的增刪改查。
4.  **[後端]** - 開發車輛型錄 (Car Catalog) 的公開 API：
    *   `GET /api/cars` (取得車輛列表，支援搜尋)
    *   `GET /api/cars/{id}` (取得單一車輛詳情)
5.  **[前端]** - 實作公開的車輛瀏覽功能：
    *   車輛列表頁，包含搜尋框。
    *   車輛詳情頁。
6.  **[後端]** - 開發使用者認證 (User Authentication) API：
    *   `POST /api/auth/register` (註冊)
    *   `POST /api/auth/login` (登入)
7.  **[前端]** - 建立使用者註冊與登入頁面。
8.  **[後端]** - 開發車輛比較 (Car Comparison) 功能的邏輯，可能透過前端狀態管理或後端 API 實現。
9.  **[前端]** - 實作車輛比較功能介面，允許使用者選擇車輛並查看比較頁面。
10. **[後端]** - 開發我的最愛 (Favorites) 功能 API：
    *   `GET /api/me/favorites`
    *   `POST /api/me/favorites`
    *   `DELETE /api/me/favorites/{carId}`
11. **[前端]** - 整合我的最愛功能，允許登入會員新增、查看、移除最愛車輛。

---

### **第二階段：進階功能**

12. **[後端]** - 開發評論 (Comments) 功能 API：
    *   `POST /api/cars/{carId}/comments`
    *   `DELETE /api/comments/{commentId}` (管理員權限)
13. **[前端]** - 在車輛詳情頁整合評論區功能。
14. **[後端]** - 開發使用者管理 (User Management) API：
    *   `GET /api/users` (管理員權限)
    *   `DELETE /api/users/{userId}` (管理員權限)
15. **[前端]** - 建立管理員後台的使用者管理介面。
16. **[測試]** - 為所有後端 API 撰寫單元測試與整合測試。
17. **[部署]** - 設定生產環境並部署應用程式。

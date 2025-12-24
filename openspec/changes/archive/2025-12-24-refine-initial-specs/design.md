# 設計文件：MFIVE 賞車網系統設計

本文件整合了專案的系統架構與核心使用者流程，作為規格實現的技術與業務藍圖。

---

### 1. 系統架構圖

本專案採用前後端分離的設計，以實現開發分工、獨立部署與更好的擴展性。

```mermaid
graph TD
    subgraph "用戶端 (Client)"
        A["<i class='fa fa-user'></i> 使用者 <br> <i class='fa fa-desktop'></i> 瀏覽器 (HTML/CSS/JS)"]
    end

    subgraph "伺服器端 (Server)"
        B["<i class='fa fa-server'></i> Spring Boot 後端 <br> (Java)"]
        C["<i class='fa fa-database'></i> MySQL 資料庫"]
    end

    A -- "API 請求 (HTTP/JSON)" --> B
    B -- "資料庫存取 (JPA/Hibernate)" --> C
```

**架構說明**:

*   **用戶端 (Client-Side)**:
    *   **技術**: 標準 `HTML`, `CSS`, `JavaScript`。
    *   **職責**: 負責UI渲染、使用者互動，並透過 RESTful API 與後端進行資料交換。

*   **伺服器端 (Server-Side)**:
    *   **後端應用程式**: 使用 `Spring Boot` 框架開發，提供 API 接口並處理所有業務邏輯。
    *   **資料庫**: 使用 `MySQL` 儲存所有應用程式資料，包含使用者、車輛、評論等。

---

### 2. 核心使用者流程

此流程圖描述了使用者從進入網站到完成核心目標（如比較車輛、收藏車輛）的完整路徑。

```mermaid
graph TD
    subgraph "Mfive 新車鑑賞平台 - 使用者流程"
        A[進入 Mfive 首頁] --> B{使用搜尋功能};
        B -- 快速搜尋 (品牌/型號) --> C[瀏覽車輛列表];
        B -- 進階篩選 (價格/車型) --> C;

        C --> D[點擊進入車輛詳情頁];
        C --> K{勾選車輛進行比較};
        
        K -- 選擇2台以上 --> L[點擊「開始比較」];
        L --> M[進入並排比較頁面];
        M --> N[查看各車款規格與價格差異];
        N -- 返回列表 --> C;
        N -- 返回詳情 --> D;
        
        D --> E{查看車輛資訊};
        E -- 查看照片/規格/配備 --> F[鑑賞車輛];
        E -- 查看全新參考價格 --> F;

        F --> G{是否收藏?};
        G -- 是 --> H[加入我的最愛];
        G -- 否 --> C;

        H --> I[在會員中心查看我的最愛列表];
        A --> J[登入/註冊];
        J --> H;
   end
```

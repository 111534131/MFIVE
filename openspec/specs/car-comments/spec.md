# car-comments Specification

## Purpose
TBD - created by archiving change refine-initial-specs. Update Purpose after archive.
## Requirements
### Requirement: Post Comment
已登入的會員 MUST 能夠對車輛發表評論。

*   **Id**: `post-comment`

#### Scenario: Member Posts a Comment
*   **Given**: 一位已登入的會員正在查看 "Audi A4" 的詳情頁。
*   **When**: 會員在評論區輸入文字「這款車的內裝質感很棒！」，並提交。
*   **Then**: 該則評論應出現在評論區列表的頂部。

#### Scenario: Guest Attempts to Post a Comment
*   **Given**: 一位未登入的訪客。
*   **When**: 訪客嘗試在評論區提交評論。
*   **Then**: 系統應提示訪客需要登入才能發表評論。

---

### Requirement: Delete Comment by Admin
管理員 MUST 能夠刪除不當的會員評論。

*   **Id**: `delete-comment-by-admin`
*   **Related Capabilities**: `admin-management`

#### Scenario: Admin Deletes an Inappropriate Comment
*   **Given**: 一位管理員發現一則內容不當的評論。
*   **When**: 管理員在後台或前台點擊該評論旁的「刪除」按鈕。
*   **Then**: 該則評論應從系統中被永久移除。


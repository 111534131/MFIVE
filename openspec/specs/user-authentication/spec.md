# user-authentication Specification

## Purpose
TBD - created by archiving change refine-initial-specs. Update Purpose after archive.
## Requirements
### Requirement: User Registration
使用者 MUST 能夠使用他們的使用者名稱、電子郵件和密碼來註冊一個新帳戶，以便存取會員專屬功能。

*   **Id**: `user-registration`

#### Scenario: Successful Registration
*   **Given**: 一位尚未註冊的訪客。
*   **When**: 訪客在註冊頁面填寫有效且未被使用的使用者名稱、電子郵件地址，並設定一組密碼，然後提交表單。
*   **Then**: 系統應創建一個新帳戶，並將使用者導向登入頁面或直接登入。

#### Scenario: Email Already Exists
*   **Given**: 一位訪客。
*   **When**: 訪客嘗試使用一個已經被註冊的電子郵件地址進行註冊。
*   **Then**: 系統應顯示一條錯誤訊息，提示「此電子郵件已被註冊」。

---

### Requirement: User Login
已註冊的使用者 MUST 能夠使用他們的帳號（使用者名稱或電子郵件）和密碼登入系統。

*   **Id**: `user-login`

#### Scenario: Successful Login
*   **Given**: 一位已註冊但尚未登入的使用者。
*   **When**: 使用者在登入頁面提供正確的帳號和密碼。
*   **Then**: 系統應驗證其身份，並在網站頂部顯示使用者名稱或「會員中心」連結，並授予會員權限。

#### Scenario: Invalid Credentials
*   **Given**: 一位使用者。
*   **When**: 使用者在登入頁面提供錯誤的帳號或密碼。
*   **Then**: 系統應顯示一條錯誤訊息，提示「帳號或密碼不正確」。

---

### Requirement: User Logout
已登入的使用者 MUST 能夠安全地登出系統。

*   **Id**: `user-logout`

#### Scenario: Successful Logout
*   **Given**: 一位已登入的使用者。
*   **When**: 使用者點擊「登出」按鈕。
*   **Then**: 系統應清除使用者的登入狀態，並將其導向首頁。


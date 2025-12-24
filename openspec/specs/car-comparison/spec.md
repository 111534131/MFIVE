# car-comparison Specification

## Purpose
TBD - created by archiving change refine-initial-specs. Update Purpose after archive.
## Requirements
### Requirement: Add to Comparison
使用者 MUST 能夠將多輛車款加入到一個暫存的比較清單中。

*   **Id**: `add-to-comparison`

#### Scenario: Add Multiple Cars
*   **Given**: 一位使用者正在瀏覽車輛列表。
*   **When**: 使用者勾選了 "Toyota RAV4" 和 "Honda CR-V" 旁的「比較」核取方塊。
*   **Then**: 系統應將這兩款車加入比較清單，並在介面上提示「已加入比較」。

---

### Requirement: View Comparison Page
使用者 MUST 能夠進入一個專門的頁面，並排查看比較清單中所有車輛的規格。

*   **Id**: `view-comparison-page`

#### Scenario: Compare Selected Cars
*   **Given**: 使用者已將至少兩款車加入比較清單。
*   **When**: 使用者點擊「開始比較」按鈕。
*   **Then**: 系統應導向比較頁面，以表格形式並排展示 "Toyota RAV4" 和 "Honda CR-V" 的各項規格（如馬力、油耗、安全配備等），方便使用者進行對照。

#### Scenario: Attempt to Compare with Fewer Than Two Cars
*   **Given**: 使用者只將一款車加入比較清單。
*   **When**: 使用者點擊「開始比較」按鈕。
*   **Then**: 系統應提示「請至少選擇兩款車進行比較」。


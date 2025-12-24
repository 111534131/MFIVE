-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2025-12-24 02:08:27
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mfive`
--

-- --------------------------------------------------------

--
-- 資料表結構 `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `body_type` varchar(50) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `engine_displacement` varchar(20) DEFAULT NULL,
  `horsepower` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `length` int(11) DEFAULT NULL COMMENT '車長(mm)',
  `width` int(11) DEFAULT NULL COMMENT '車寬(mm)',
  `weight` int(11) DEFAULT NULL COMMENT '車重(kg)',
  `torque` varchar(20) DEFAULT NULL COMMENT '扭力',
  `drive_type` varchar(20) DEFAULT NULL COMMENT '驅動方式',
  `acceleration` float DEFAULT NULL COMMENT '0-100km/h (秒)',
  `height` int(11) DEFAULT NULL COMMENT '車高(mm)',
  `seats` int(11) DEFAULT 5 COMMENT '座位數'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `cars`
--

INSERT INTO `cars` (`id`, `brand`, `model`, `price`, `body_type`, `fuel_type`, `transmission`, `engine_displacement`, `horsepower`, `description`, `image_url`, `created_at`, `length`, `width`, `weight`, `torque`, `drive_type`, `acceleration`, `height`, `seats`) VALUES
(1, 'Audi', 'A3 Sportback 30 TFSI 享馭版', 139, 'Hatchback', '油電混合', '自手排7速', '1498', 116, 'Audi A3 Sportback, 116hp@5000-6000rpm, 25.5kgm@1500-3000rpm', 'images/Audi A3 Sportback.png', '2025-12-24 00:52:17', 4352, 1816, 1316, '25.5kgm', '前輪驅動', 9.9, NULL, 5),
(2, 'Audi', 'A3 Sportback 35 TFSI Advanced 進化版', 155, 'Hatchback', '油電混合', '自手排7速', '1498', 150, 'Audi A3 Sportback, 150hp@5000-6000rpm, 22.4kgm@1500-3000rpm', 'images/Audi A3 Sportback.png', '2025-12-24 00:52:17', 4352, 1816, 1365, '22.4kgm', '前輪驅動', 8.1, NULL, 5),
(3, 'Audi', 'A3 Sportback 35 TFSI S line 運動版', 179, 'Hatchback', '油電混合', '自手排7速', '1498', 150, 'Audi A3 Sportback S line, 運動化外觀套件, 150hp', 'images/Audi A3 Sportback.png', '2025-12-24 00:52:17', 4352, 1816, 1365, '22.4kgm', '前輪驅動', 8.1, NULL, 5),
(4, 'Audi', 'RS3 Sportback', 350.3, 'Hatchback', '汽油', '自手排7速', '2480', 400, 'Audi RS3 Sportback, 性能鋼砲, 400hp, 0-100km/h僅需3.8秒', 'images/Audi A3 Sportback.png', '2025-12-24 00:52:17', 4389, 1851, 1645, '51.0kgm', '四輪驅動', 3.8, NULL, 5),
(5, 'Audi', 'A5 Sportback 40 TFSI 享馭版', 250, 'Sedan', '油電混合', '自手排7速', '1984', 204, 'Audi A5 Sportback, 優雅美型轎跑, 204hp', 'images/Audi A5.png', '2025-12-24 00:52:17', 4757, 1843, 1550, '32.6kgm', '前輪驅動', 7.2, NULL, 5),
(6, 'Audi', 'A5 Sportback 40 TFSI S line 運動版', 263, 'Sedan', '油電混合', '自手排7速', '1984', 204, 'Audi A5 Sportback S line, 運動化套件, 204hp', 'images/Audi A5.png', '2025-12-24 00:52:17', 4757, 1843, 1550, '32.6kgm', '前輪驅動', 7.2, NULL, 5),
(7, 'Audi', 'A5 Sportback 45 TFSI quattro S line 運動版', 316, 'Sedan', '油電混合', '自手排7速', '1984', 265, 'Audi A5 Sportback quattro, 四輪驅動, 265hp高性能', 'images/Audi A5.png', '2025-12-24 00:52:17', 4757, 1843, 1660, '37.7kgm', '四輪驅動', 5.6, NULL, 5),
(8, 'Audi', 'Q2 35 TFSI 享馭版', 149, 'SUV', '汽油', '自手排7速', '1498', 150, 'Audi Q2, 都會跨界休旅, 150hp', 'images/Audi Q2.png', '2025-12-24 00:52:17', 4208, 1794, 1325, '25.5kgm', '前輪驅動', 8.6, NULL, 5),
(9, 'Audi', 'Q2 35 TFSI Technik 豪華版', 155, 'SUV', '汽油', '自手排7速', '1498', 150, 'Audi Q2 豪華版, 質感升級, 150hp', 'images/Audi Q2.png', '2025-12-24 00:52:17', 4208, 1794, 1325, '25.5kgm', '前輪驅動', 8.6, NULL, 5),
(10, 'BMW', '3-Series Sedan 318i Sport', 216, 'Sedan', '汽油', '手自排8速', '1998', 156, 'BMW 318i Sport, 運動房車入門首選, 操駕樂趣十足', 'images/BMW 3 Series.png', '2025-12-24 00:52:17', 4713, 1827, 1490, '25.5kgm', '後輪驅動', 8.4, NULL, 5),
(11, 'BMW', '3-Series Sedan 320i M Sport', 246, 'Sedan', '汽油', '手自排8速', '1998', 184, 'BMW 320i M Sport, M款空力套件, 184hp', 'images/BMW 3 Series.png', '2025-12-24 00:52:17', 4713, 1827, 1525, '30.6kgm', '後輪驅動', 7.4, NULL, 5),
(12, 'BMW', '3-Series Sedan 330i M Sport', 296, 'Sedan', '汽油', '手自排8速', '1998', 245, 'BMW 330i M Sport, 高性能運動房車, 245hp', 'images/BMW 3 Series.png', '2025-12-24 00:52:17', 4713, 1827, 1540, '40.8kgm', '後輪驅動', 5.9, NULL, 5),
(13, 'BMW', '3-Series Sedan M340i xDrive', 366, 'Sedan', '油電混合', '手自排8速', '2998', 374, 'BMW M340i xDrive, M Performance性能調校, 374hp', 'images/BMW 3 Series.png', '2025-12-24 00:52:17', 4714, 1827, 1725, '51.0kgm', '四輪驅動', 4.4, NULL, 5),
(14, 'BMW', '5-Series Sedan 520i M Sport', 299, 'Sedan', '油電混合', '手自排8速', '1998', 190, 'BMW 520i M Sport, 豪華行政房車, 48V輕油電', 'images/2015 BMW 520i.png', '2025-12-24 00:52:17', 5060, 1900, 1725, '31.6kgm', '後輪驅動', 8.1, NULL, 5),
(15, 'BMW', '5-Series Sedan 530i M Sport', 343, 'Sedan', '油電混合', '手自排9速', '1998', 258, 'BMW 530i M Sport, 進階動力與豪華配備, 258hp', 'images/BMW 5 Series.png', '2025-12-24 00:52:17', 5060, 1900, 1700, '40.8kgm', '後輪驅動', 6.2, NULL, 5),
(16, 'Ford', 'Kuga 1.5 Vignale (2025小改款)', 93.9, 'SUV', '汽油', '自排8速', '1496', 187, 'Ford Kuga Vignale, 精品級旗艦休旅, 187hp', 'images/Ford Kuga.png', '2025-12-24 00:52:17', 4621, 1882, 1525, '25.3kgm', '前輪驅動', 9, NULL, 5),
(17, 'Ford', 'Kuga 1.5 Active (2025小改款)', 101.9, 'SUV', '汽油', '自排8速', '1496', 187, 'Ford Kuga Active, 跨界風格外觀, 187hp', 'images/2023 Ford Kuga EcoBoost 250.png', '2025-12-24 00:52:17', 4621, 1882, 1565, '25.3kgm', '前輪驅動', 9.3, NULL, 5),
(18, 'Ford', 'Kuga 2.0 AWD ST-Line (2025小改款)', 113.9, 'SUV', '汽油', '自排8速', '1999', 255, 'Ford Kuga ST-Line AWD, 強悍動力255hp, 運動化懸吊', 'images/Ford Kuga.png', '2025-12-24 00:52:17', 4621, 1882, 1665, '38.7kgm', '四輪驅動', 6.7, NULL, 5),
(19, 'Honda', 'HR-V S+', 83.9, 'SUV', '汽油', 'CVT無段變速', '1498', 121, 'Honda HR-V S+, 靈活空間機能, 121hp', 'images/Honda HRV.png', '2025-12-24 00:52:17', 4330, 1790, 1274, '14.8kgm', '前輪驅動', NULL, NULL, 5),
(20, 'Honda', 'HR-V 1.5 e:HEV Prestige', 87.9, 'SUV', '油電混合', 'CVT無段變速', '1498', 106, 'Honda HR-V e:HEV, 油電混合動力, 綜效馬力優異', 'images/Honda HRV.png', '2025-12-24 00:52:17', 4330, 1790, 1250, '13.0kgm', '前輪驅動', 10.5, NULL, 5),
(21, 'Lexus', 'ES 200 豪華版', 177, 'Sedan', '汽油', 'CVT無段變速', '1987', 173, 'Lexus ES 200, 豪華舒適房車, 173hp', 'images/Lexus ES 200.png', '2025-12-24 00:52:17', 4975, 1865, 1625, '21.0kgm', '前輪驅動', 10.3, NULL, 5),
(22, 'Lexus', 'ES 200 頂級版', 195, 'Sedan', '汽油', 'CVT無段變速', '1987', 173, 'Lexus ES 200 頂級版, 配備升級, 舒適座艙', 'images/Lexus ES 200.png', '2025-12-24 00:52:17', 4975, 1865, 1625, '21.0kgm', '前輪驅動', 10.3, NULL, 5),
(23, 'Lexus', 'ES 250 F SPORT', 218, 'Sedan', '汽油', '手自排8速', '2487', 207, 'Lexus ES 250 F SPORT, 運動化外觀與懸吊, 207hp', 'images/Lexus ES.png', '2025-12-24 00:52:17', 4975, 1865, 1680, '24.8kgm', '前輪驅動', 9.1, NULL, 5),
(24, 'Lexus', 'ES 300h 豪華版', 203, 'Sedan', '油電混合', 'CVT無段變速', '2487', 178, 'Lexus ES 300h, 油電混合動力, 寧靜與節能兼具', 'images/Lexus ES.png', '2025-12-24 00:52:17', 4975, 1865, 1735, '22.5kgm', '前輪驅動', 8.9, NULL, 5),
(25, 'Lexus', 'ES 300h 旗艦版', 249, 'Sedan', '油電混合', 'CVT無段變速', '2487', 178, 'Lexus ES 300h 旗艦版, 頂級豪華配備, 極致舒適', 'images/Lexus ES.png', '2025-12-24 00:52:17', 4975, 1865, 1735, '22.5kgm', '前輪驅動', 8.9, NULL, 5),
(26, 'Mazda', 'Mazda3 Sedan 20S Carbon Edition', 86.8, 'Sedan', '汽油', '手自排6速', '1998', 165, 'Mazda3 Carbon Edition, 黑化外觀套件, 魂動美學', 'images/Mazda3 5D 2.0.png', '2025-12-24 00:52:17', 4660, 1795, 1373, '21.7kgm', '前輪驅動', 8.5, NULL, 5),
(27, 'Mazda', 'Mazda3 Sedan 20S Premium', 94.8, 'Sedan', '汽油', '手自排6速', '1998', 165, 'Mazda3 Premium, 質感內裝, BOSE音響', 'images/Mazda Mazda3 5D.png', '2025-12-24 00:52:17', 4660, 1795, 1373, '21.7kgm', '前輪驅動', 8.5, NULL, 5),
(28, 'Mazda', 'CX-30 20S Carbon Edition', 93.8, 'SUV', '汽油', '手自排6速', '1998', 165, 'CX-30 Carbon Edition, 都會跨界休旅, 黑化風格', 'images/Mazda CX-30.png', '2025-12-24 00:52:17', 4395, 1795, 1424, '21.7kgm', '前輪驅動', 9, NULL, 5),
(29, 'Mazda', 'CX-30 20S Retro Sports Edition', 109.8, 'SUV', '汽油', '手自排6速', '1998', 165, 'CX-30 Retro Sports, 復古運動風格, 專屬內裝配色', 'images/Mazda CX-30.png', '2025-12-24 00:52:17', 4395, 1795, 1424, '21.7kgm', '前輪驅動', 9, NULL, 5),
(30, 'Mercedes-Benz', 'C-Class Sedan C180', 224, 'Sedan', '油電混合', '手自排9速', '1496', 170, 'C-Class C180, 豪華房車標竿, 48V輕油電', 'images/M-Benz C-Class Sedan C180.png', '2025-12-24 00:52:17', 4751, 1820, 1575, '25.5kgm', '後輪驅動', 8.6, NULL, 5),
(31, 'Mercedes-Benz', 'C-Class Sedan C200', 260, 'Sedan', '油電混合', '手自排9速', '1496', 204, 'C-Class C200, 充沛動力204hp, 科技豪華座艙', 'images/Mercedes-Benz C-Class.png', '2025-12-24 00:52:17', 4751, 1820, 1650, '30.6kgm', '後輪驅動', 7.3, NULL, 5),
(32, 'Mercedes-Benz', 'C-Class Sedan C300', 304, 'Sedan', '油電混合', '手自排9速', '1999', 258, 'C-Class C300, 運動化性能, 258hp', 'images/Mercedes-Benz C-Class.png', '2025-12-24 00:52:17', 4751, 1820, 1675, '40.8kgm', '後輪驅動', 6, NULL, 5),
(33, 'Mercedes-Benz', 'CLA 200', 209, 'Coupe', '汽油', '自手排7速', '1332', 163, 'CLA 200, 絕美四門轎跑, 無窗框設計', 'images/Mercedes-Benz CLA.png', '2025-12-24 00:52:17', 4688, 1830, 1425, '27.5kgm', '前輪驅動', 8.2, NULL, 5),
(34, 'Mercedes-Benz', 'AMG CLA 35 4MATIC', 269, 'Coupe', '油電混合', '自手排8速', '1991', 306, 'AMG CLA 35, 性能轎跑, 306hp, 四輪驅動', 'images/奔馳CLA.png', '2025-12-24 00:52:17', 4695, 1834, 1595, '40.8kgm', '四輪驅動', 4.9, NULL, 5),
(35, 'Nissan', 'Altima 極致尊爵版', 139.9, 'Sedan', '汽油', 'CVT無段變速', '1997', 248, 'Altima, VC-Turbo可變壓縮比引擎, 248hp', 'images/Nissan Altima.png', '2025-12-24 00:52:17', 4900, 1852, 1555, '38.8kgm', '前輪驅動', 6.4, NULL, 5),
(36, 'Nissan', 'Sentra 尊爵智駕版', 83.9, 'Sedan', '汽油', 'CVT無段變速', '1598', 135, 'Sentra, 省油舒適房車, 智駕輔助系統', 'images/Nissan Sentra.png', '2025-12-24 00:52:17', 4641, 1815, 1358, '16.2kgm', '前輪驅動', NULL, NULL, 5),
(37, 'Nissan', 'X-Trail 輕油電 經典版', 104.9, 'SUV', '油電混合', 'CVT無段變速', '1497', 204, 'X-Trail 輕油電, VC-Turbo引擎 + 12V輕油電', 'images/NISSAN X-Trail 2.0.png', '2025-12-24 00:52:17', 4680, 1840, 1618, '30.6kgm', '前輪驅動', 8.6, NULL, 5),
(38, 'Nissan', 'X-Trail 輕油電 旗艦版', 122.9, 'SUV', '油電混合', 'CVT無段變速', '1497', 204, 'X-Trail 旗艦版, 豪華配備升級, 數位儀表', 'images/Nissan X-Trail.png', '2025-12-24 00:52:17', 4680, 1840, 1652, '30.6kgm', '前輪驅動', 8.6, NULL, 5),
(39, 'Nissan', 'X-Trail e-POWER', 151.9, 'SUV', '油電混合', '單速變速箱', '1497', 213, 'X-Trail e-POWER, 電油車技術, 100%馬達驅動', 'images/Nissan X-Trail.png', '2025-12-24 00:52:17', 4680, 1840, 1887, '25.5kgm', '四輪驅動', 7, NULL, 5),
(40, 'Skoda', 'Kodiaq 1.5 TSI e-TEC (二代)', 153.8, 'SUV', '油電混合', '自手排7速', '1498', 150, 'Kodiaq 1.5 TSI, 二代大改款, 48V輕油電', 'images/Skoda Kodiaq 2.0 TS.png', '2025-12-24 00:52:17', 4758, 1864, 1663, '25.5kgm', '前輪驅動', 9.1, NULL, 5),
(41, 'Skoda', 'Kodiaq 2.0 TSI 4x4 (二代)', 173.8, 'SUV', '汽油', '自手排7速', '1984', 204, 'Kodiaq 2.0 TSI 4x4, 強悍動力, 四輪驅動七人座', 'images/Skoda Kodiaq.png', '2025-12-24 00:52:17', 4758, 1864, 1750, '32.7kgm', '四輪驅動', 7.8, NULL, 5),
(42, 'Skoda', 'Octavia Combi 1.5 TSI e-TEC', 119.8, 'Wagon', '油電混合', '自手排7速', '1498', 150, 'Octavia Combi, 實用旅行車, 巨大行李廂空間', 'images/Skoda Octavia Combi.png', '2025-12-24 00:52:17', 4698, 1829, 1398, '25.5kgm', '前輪驅動', 8.6, NULL, 5),
(43, 'Skoda', 'Octavia Combi RS', 159.9, 'Wagon', '汽油', '自手排7速', '1984', 265, 'Octavia Combi RS, 性能旅行車, 265hp', 'images/Skoda Octavia Combi.png', '2025-12-24 00:52:17', 4702, 1829, 1534, '37.8kgm', '前輪驅動', 6.5, NULL, 5),
(44, 'Suzuki', 'Jimny 1.5 GLX', 84.9, 'SUV', '汽油', '自排4速', '1462', 102, 'Jimny, 硬派越野小車, 梯形大樑底盤', 'images/Suzuki Jimny.png', '2025-12-24 00:52:17', 3645, 1645, 1110, '13.3kgm', '四輪驅動', NULL, NULL, 5),
(45, 'Toyota', 'Corolla Altis 1.8 汽油 豪華', 79.5, 'Sedan', '汽油', 'CVT無段變速', '1798', 140, 'Corolla Altis, 國民神車, 經濟耐用', 'images/Toyota Corolla Altis.png', '2025-12-24 00:52:17', 4630, 1780, 1315, '17.5kgm', '前輪驅動', NULL, NULL, 5),
(46, 'Toyota', 'Corolla Altis 1.8 Hybrid 尊爵', 88.5, 'Sedan', '油電混合', 'CVT無段變速', '1798', 98, 'Corolla Altis Hybrid, 油電混合, 超低油耗', 'images/Toyota Corolla Altis.png', '2025-12-24 00:52:17', 4630, 1780, 1315, '14.5kgm', '前輪驅動', NULL, NULL, 5),
(47, 'Toyota', 'Corolla Altis GR Sport 2.0', 91.5, 'Sedan', '汽油', 'CVT無段變速', '1987', 170, 'Corolla Altis GR Sport, 運動化懸吊, 2.0新引擎', 'images/Toyota Corolla Altis.png', '2025-12-24 00:52:17', 4635, 1780, 1330, '20.4kgm', '前輪驅動', NULL, NULL, 5),
(48, 'Toyota', 'Prius PHEV 2.0 旗艦版', 129.9, 'Sedan', '油電混合', 'CVT無段變速', '1987', 151, 'Prius PHEV, 插電式油電, 純電續航長', 'images/Toyota Prius.png', '2025-12-24 00:52:17', 4599, 1782, 1570, '19.1kgm', '前輪驅動', 6.7, NULL, 5),
(49, 'Toyota', 'RAV4 2.0 豪華', 101, 'SUV', '汽油', 'CVT無段變速', '1987', 173, 'RAV4 2.0 豪華, 進口休旅銷售冠軍', 'images/Toyota RAV4 2.0.png', '2025-12-24 00:52:17', 4600, 1855, 1610, '20.7kgm', '前輪驅動', 10.7, NULL, 5),
(50, 'Toyota', 'RAV4 2.0 旗艦', 117, 'SUV', '汽油', 'CVT無段變速', '1987', 173, 'RAV4 2.0 旗艦, 配備升級, 360環景', 'images/Toyota RAV4 2.0.png', '2025-12-24 00:52:17', 4600, 1855, 1610, '20.7kgm', '前輪驅動', 10.7, NULL, 5),
(51, 'Toyota', 'RAV4 2.5 Hybrid 旗艦 4WD', 138, 'SUV', '油電混合', 'CVT無段變速', '2487', 178, 'RAV4 Hybrid 4WD, A-AWD四輪驅動, 綜效馬力高', 'images/Toyota RAV4.png', '2025-12-24 00:52:17', 4600, 1855, 1755, '22.5kgm', '四輪驅動', 8.1, NULL, 5),
(52, 'Toyota', 'bZ4X', 136, 'SUV', '電動', '單速變速箱', NULL, 201, 'bZ4X, 純電休旅, e-TNGA平台', 'images/Toyota BZ4.png', '2025-12-24 00:52:17', 4690, 1860, 1900, '27.2kgm', '前輪驅動', 7.5, NULL, 5),
(53, 'Volkswagen', 'Golf 280 eTSI Style', 118.8, 'Hatchback', '油電混合', '自手排7速', '1498', 150, 'Golf 280 eTSI, 經典掀背, 48V輕油電', 'images/Volkswagen Golf.png', '2025-12-24 00:52:17', 4284, 1789, 1326, '25.5kgm', '前輪驅動', 8.5, NULL, 5),
(54, 'Volkswagen', 'Golf 280 eTSI R-Line', 128.8, 'Hatchback', '油電混合', '自手排7速', '1498', 150, 'Golf R-Line, 運動化外觀, 矩陣式頭燈', 'images/Volkswagen Golf.png', '2025-12-24 00:52:17', 4284, 1789, 1326, '25.5kgm', '前輪驅動', 8.5, NULL, 5),
(55, 'Volkswagen', 'Golf GTI', 175.8, 'Hatchback', '汽油', '自手排7速', '1984', 245, 'Golf GTI, 性能鋼砲代表, 245hp', 'images/Volkswagen Golf.png', '2025-12-24 00:52:17', 4287, 1789, 1451, '37.8kgm', '前輪驅動', 6.3, NULL, 5),
(56, 'Volkswagen', 'Golf R', 213.8, 'Hatchback', '汽油', '自手排7速', '1984', 320, 'Golf R, 頂級性能版, 320hp, 四輪驅動', 'images/Volkswagen Golf.png', '2025-12-24 00:52:17', 4290, 1789, 1509, '40.8kgm', '四輪驅動', 4.8, NULL, 5),
(57, 'Volkswagen', 'T-ROC 280 TSI Style Design', 122.8, 'SUV', '汽油', '自手排7速', '1498', 150, 'T-ROC 280, 跨界跑旅, 斜背設計', 'images/Volkswagen T-ROC 280.png', '2025-12-24 00:52:17', 4251, 1819, 1324, '25.5kgm', '前輪驅動', 8.6, NULL, 5),
(58, 'Volkswagen', 'T-ROC 330 TSI R-Line Performance', 148.8, 'SUV', '汽油', '自手排7速', '1984', 190, 'T-ROC 330, 4MOTION四輪驅動, 190hp', 'images/Volkswagen T-ROC.png', '2025-12-24 00:52:17', 4251, 1819, 1493, '32.6kgm', '四輪驅動', 6.8, NULL, 5),
(59, 'Volkswagen', 'T-ROC R', 188.8, 'SUV', '汽油', '自手排7速', '1984', 300, 'T-ROC R, 性能跑旅, 300hp', 'images/Volkswagen T-ROC.png', '2025-12-24 00:52:17', 4236, 1819, 1574, '40.8kgm', '四輪驅動', 4.9, NULL, 5),
(60, 'Volkswagen', 'Tiguan 280 eTSI Elegance (The New Tiguan)', 139.8, 'SUV', '油電混合', '自手排7速', '1498', 150, 'Tiguan Elegance, 新一代大改款, 科技質感', 'images/Volkswagen Tiguan.png', '2025-12-24 00:52:17', 4539, 1842, 1616, '25.5kgm', '前輪驅動', 9.1, NULL, 5),
(61, 'Volkswagen', 'Tiguan 280 eTSI Elegance Premium (The New Tiguan)', 149.8, 'SUV', '油電混合', '自手排7速', '1498', 150, 'Tiguan Premium, 配備升級, 矩陣式頭燈', 'images/Volkswagen Tiguan.png', '2025-12-24 00:52:17', 4539, 1842, 1616, '25.5kgm', '前輪驅動', 9.1, NULL, 5),
(62, 'Volkswagen', 'Tiguan 380 TSI R-Line Performance (The New Tiguan)', 199.8, 'SUV', '汽油', '自手排7速', '1984', 265, 'Tiguan R-Line, 頂級性能, 265hp四驅', 'images/Volkswagen Tiguan.png', '2025-12-24 00:52:17', 4539, 1842, 1740, '40.8kgm', '四輪驅動', 6, NULL, 5),
(63, 'Bugatti', 'Chiron', 88000, 'Coupe', '汽油', '自手排7速', '7993', 1500, 'Bugatti Chiron, 超級跑車之王, 極致性能與奢華', 'images/布加迪.png', '2025-12-24 00:52:17', NULL, NULL, NULL, NULL, '四輪驅動', 2.4, NULL, 5),
(64, 'Bentley', 'Continental GT', 12800, 'Coupe', '汽油', '自手排8速', '5950', 635, 'Bentley Continental GT, 英倫頂級豪華GT跑車', 'images/賓利.png', '2025-12-24 00:52:17', NULL, NULL, NULL, NULL, '四輪驅動', 3.6, NULL, 5),
(65, 'Jaguar', 'XE Prestige 20t', 189, 'Sedan', '汽油', '手自排8速', '1999', 200, 'Jaguar XE Prestige 20t, 配備HID頭燈, 英倫豪華運動房車', 'images/2015 Jaguar XE Prestige 20t HID.png', '2025-12-24 00:52:17', 4678, 1850, 1520, '32.6kgm', '後輪驅動', 7.2, NULL, 5),
(66, 'Jaguar', 'XE Prestige', 195, 'Sedan', '汽油', '手自排8速', '1999', 200, 'Jaguar XE Prestige, 優雅英倫設計, 運動化駕馭體驗', 'images/Jaguar XE Prestige.png', '2025-12-24 00:52:17', 4678, 1850, 1520, '32.6kgm', '後輪驅動', 7.2, NULL, 5);

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `car_id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `car_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'USER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`) VALUES
(1, 'admin', 'admin123', 'admin@mfive.com', 'ADMIN', '2025-12-24 00:52:17'),
(2, 'user1', 'user123', 'user1@example.com', 'USER', '2025-12-24 00:52:17'),
(3, 'user2', 'user123', 'user2@example.com', 'USER', '2025-12-24 00:52:17');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `car_id` (`car_id`);

--
-- 資料表索引 `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`car_id`),
  ADD UNIQUE KEY `UK74k90n5vc8p8inwoqpnqdb0bm` (`user_id`,`car_id`),
  ADD KEY `car_id` (`car_id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;

--
-- 資料表的限制式 `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

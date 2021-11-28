-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 28, 2021 at 05:29 PM
-- Server version: 10.3.32-MariaDB-log
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blakerun_plantme`
--

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `id` int(11) NOT NULL,
  `method` varchar(255) DEFAULT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `requests` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`id`, `method`, `endpoint`, `requests`, `createdAt`, `updatedAt`) VALUES
(1, 'GET', '/api/v1/user', 4, '2021-11-26 00:07:58', '2021-11-28 21:06:06'),
(2, 'PUT', '/api/v1/user', 2, '2021-11-26 00:07:58', '2021-11-28 21:05:13'),
(3, 'DELETE', '/api/v1/user', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(4, 'POST', '/api/v1/auth/register', 1, '2021-11-26 00:07:58', '2021-11-28 21:16:59'),
(5, 'POST', '/api/v1/auth/login', 7, '2021-11-26 00:07:58', '2021-11-28 21:17:06'),
(6, 'POST', '/api/v1/auth/logout', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(7, 'GET', '/api/v1/admin/endpointStats', 2, '2021-11-26 00:07:58', '2021-11-28 21:08:50'),
(8, 'GET', '/api/v1/admin/seedDatabase', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(9, 'GET', '/api/v1/plant', 33, '2021-11-26 00:07:58', '2021-11-28 21:47:40'),
(10, 'GET', '/api/v1/plant/:id', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(11, 'POST', '/api/v1/plant', 6, '2021-11-26 00:07:58', '2021-11-28 21:18:04'),
(12, 'PUT', '/api/v1/plant', 4, '2021-11-26 00:07:58', '2021-11-28 17:48:50'),
(13, 'DELETE', '/api/v1/plant', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(14, 'OPTIONS', '/api/v1/auth/silentLogin', 4, '2021-11-28 17:41:02', '2021-11-28 20:44:11'),
(15, 'GET', '/api/v1/auth/silentLogin', 9, '2021-11-28 17:41:03', '2021-11-28 21:47:27'),
(16, 'OPTIONS', '/api/v1/auth/login', 3, '2021-11-28 17:41:16', '2021-11-28 20:05:05'),
(17, 'OPTIONS', '/api/v1/user', 1, '2021-11-28 17:41:26', '2021-11-28 17:41:26'),
(18, 'OPTIONS', '/api/v1/plant', 7, '2021-11-28 17:46:35', '2021-11-28 17:48:45'),
(19, 'OPTIONS', '/api/v1/admin/endpointStats', 1, '2021-11-28 17:48:07', '2021-11-28 17:48:07'),
(20, 'GET', '/', 1, '2021-11-28 20:57:29', '2021-11-28 20:57:29');

-- --------------------------------------------------------

--
-- Table structure for table `Plants`
--

CREATE TABLE `Plants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Plants`
--

INSERT INTO `Plants` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Beefsteak Tomato', '2021-11-26 00:07:58', '2021-11-28 17:48:28'),
(2, 'Sun Gold Cherry Tomato', '2021-11-26 00:07:58', '2021-11-28 17:48:40'),
(3, 'Brandywine Tomato', '2021-11-26 00:07:58', '2021-11-28 17:48:45'),
(4, 'Roma Tomato', '2021-11-26 00:07:58', '2021-11-28 17:48:50'),
(5, 'Mammoth Melting Sugar Pea', '2021-11-28 17:46:35', '2021-11-28 17:46:35'),
(6, 'Four Seasons Lettuce', '2021-11-28 17:46:49', '2021-11-28 17:46:49'),
(7, 'Mexican Sour Gherkin Cucumber', '2021-11-28 17:47:05', '2021-11-28 17:47:05'),
(8, 'Burgundy Okra', '2021-11-28 17:47:19', '2021-11-28 17:47:19'),
(9, 'sunflower', '2021-11-28 21:17:38', '2021-11-28 21:17:38'),
(10, 'green onion', '2021-11-28 21:18:04', '2021-11-28 21:18:04');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'user@gmail.com', '$2b$08$L3IqZnNuDZNifDrjlRmX.up7/RETM3382uM1EqyoAWWsS.lm84z4G', 0, '2021-11-26 00:07:58', '2021-11-26 00:07:58'),
(3, 'haha@gmail.com', '$2b$08$aGkx9NyU/Ta4Bq2mkmvsheSJPX2frqtQMAtZSN4dwm1glklGFcg5.', 0, '2021-11-26 03:26:26', '2021-11-26 03:26:26'),
(5, 'admin@gmail.com', '$2b$08$JsA6Z4m5zEmxeC0ZZ./j9emM9wUyMo6yGgoc0IjtJuZWf9QLDIu4e', 1, '2021-11-28 17:29:57', '2021-11-28 17:29:57'),
(6, 'test@gmail.com', '$2b$08$ip8R.Stm2xqyry4ZHI1KiOJElgR7Bi18CO.myNCWIZP8UNVeq/z.W', 0, '2021-11-28 17:33:21', '2021-11-28 17:33:21'),
(7, 'cragzu@gmail.com', '$2b$08$xw.Bcb30P9t/TIWGtuKc7.R0oHIRTl8THjXHFen/rrLjmSz5v2jKe', 0, '2021-11-28 21:16:59', '2021-11-28 21:16:59');

-- --------------------------------------------------------

--
-- Table structure for table `UsersPlants`
--

CREATE TABLE `UsersPlants` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PlantId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UsersPlants`
--

INSERT INTO `UsersPlants` (`createdAt`, `updatedAt`, `UserId`, `PlantId`) VALUES
('2021-11-27 21:37:16', '2021-11-27 21:37:16', 1, 1),
('2021-11-27 21:37:17', '2021-11-27 21:37:17', 1, 2),
('2021-11-28 21:05:13', '2021-11-28 21:05:13', 1, 7),
('2021-11-28 21:05:13', '2021-11-28 21:05:13', 1, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Plants`
--
ALTER TABLE `Plants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UsersPlants`
--
ALTER TABLE `UsersPlants`
  ADD PRIMARY KEY (`UserId`,`PlantId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Admins`
--
ALTER TABLE `Admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Plants`
--
ALTER TABLE `Plants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

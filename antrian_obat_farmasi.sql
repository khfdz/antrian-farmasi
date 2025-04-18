-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2025 at 05:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `antrian_obat_farmasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `antrian_bpjs_obat_jadi`
--

CREATE TABLE `antrian_bpjs_obat_jadi` (
  `id_antrian` int(11) NOT NULL,
  `no_antrian` varchar(50) NOT NULL,
  `waktu` datetime DEFAULT current_timestamp(),
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `antrian_bpjs_obat_racikan`
--

CREATE TABLE `antrian_bpjs_obat_racikan` (
  `id_antrian` int(11) NOT NULL,
  `no_antrian` varchar(50) NOT NULL,
  `waktu` datetime DEFAULT current_timestamp(),
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `antrian_counter`
--

CREATE TABLE `antrian_counter` (
  `id` int(11) NOT NULL,
  `last_no_antrian` int(11) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_no_antrian_bpjs_jadi` int(11) DEFAULT 0,
  `last_no_antrian_bpjs_racikan` int(11) DEFAULT 0,
  `last_no_antrian_racikan` int(11) DEFAULT 0,
  `last_no_antrian_jadi` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `antrian_counter`
--

INSERT INTO `antrian_counter` (`id`, `last_no_antrian`, `updated_at`, `last_no_antrian_bpjs_jadi`, `last_no_antrian_bpjs_racikan`, `last_no_antrian_racikan`, `last_no_antrian_jadi`) VALUES
(1, 0, '2025-02-23 11:11:15', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `antrian_obat_jadi`
--

CREATE TABLE `antrian_obat_jadi` (
  `id_antrian` int(11) NOT NULL,
  `no_antrian` varchar(50) NOT NULL,
  `waktu` datetime DEFAULT current_timestamp(),
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `antrian_obat_racikan`
--

CREATE TABLE `antrian_obat_racikan` (
  `id_antrian` int(11) NOT NULL,
  `no_antrian` varchar(50) NOT NULL,
  `waktu` datetime DEFAULT current_timestamp(),
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antrian_bpjs_obat_jadi`
--
ALTER TABLE `antrian_bpjs_obat_jadi`
  ADD PRIMARY KEY (`id_antrian`);

--
-- Indexes for table `antrian_bpjs_obat_racikan`
--
ALTER TABLE `antrian_bpjs_obat_racikan`
  ADD PRIMARY KEY (`id_antrian`);

--
-- Indexes for table `antrian_counter`
--
ALTER TABLE `antrian_counter`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `antrian_obat_jadi`
--
ALTER TABLE `antrian_obat_jadi`
  ADD PRIMARY KEY (`id_antrian`);

--
-- Indexes for table `antrian_obat_racikan`
--
ALTER TABLE `antrian_obat_racikan`
  ADD PRIMARY KEY (`id_antrian`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antrian_bpjs_obat_jadi`
--
ALTER TABLE `antrian_bpjs_obat_jadi`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=727;

--
-- AUTO_INCREMENT for table `antrian_bpjs_obat_racikan`
--
ALTER TABLE `antrian_bpjs_obat_racikan`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=757;

--
-- AUTO_INCREMENT for table `antrian_counter`
--
ALTER TABLE `antrian_counter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `antrian_obat_jadi`
--
ALTER TABLE `antrian_obat_jadi`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=414;

--
-- AUTO_INCREMENT for table `antrian_obat_racikan`
--
ALTER TABLE `antrian_obat_racikan`
  MODIFY `id_antrian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 08:49 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blogs_bg`
--

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_category`
--

CREATE TABLE `bg_blog_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `category_description` tinytext NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_blog_category`
--

INSERT INTO `bg_blog_category` (`id`, `category_name`, `category_description`, `sub_category`) VALUES
(1, 'News', 'News Category', NULL),
(3, 'Film news', 'Only film news', 1),
(5, 'Travel', 'Travel', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_comment`
--

CREATE TABLE `bg_blog_comment` (
  `id` int(11) NOT NULL,
  `comment_author_name` tinytext NOT NULL,
  `comment_content` text NOT NULL,
  `comment_date` datetime NOT NULL,
  `blog_id` int(11) NOT NULL,
  `comment_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_blog_post`
--

CREATE TABLE `bg_blog_post` (
  `id` int(11) NOT NULL,
  `blog_title` text NOT NULL,
  `blog_description` text NOT NULL,
  `blog_content` longtext NOT NULL,
  `blog_author` varchar(30) NOT NULL,
  `blog_publish_date` datetime NOT NULL,
  `blog_image` varchar(50) NOT NULL,
  `blog_likes` int(11) NOT NULL,
  `blog_category` int(11) NOT NULL,
  `blog_status` tinyint(1) NOT NULL DEFAULT 1,
  `blog_keywords` text NOT NULL,
  `blog_tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bg_blog_post`
--

INSERT INTO `bg_blog_post` (`id`, `blog_title`, `blog_description`, `blog_content`, `blog_author`, `blog_publish_date`, `blog_image`, `blog_likes`, `blog_category`, `blog_status`, `blog_keywords`, `blog_tags`) VALUES
(1, 'k', 'k', 'k', 'k', '2023-05-14 00:00:00', 'image-1684080484468.77.png', 0, 1, 1, 'k', 'k'),
(2, 'husen', 'husen', 'husen', 'husen', '2023-05-05 00:00:00', 'image-1684086531931.background7.jpg', 0, 1, 1, 'husen', 'husen'),
(3, 'kk', 'kk', 'kk', 'kk', '2023-05-14 00:00:00', 'image-1684086752620.background6.jpg', 0, 3, 1, 'kl', 'rahul'),
(7, 'gt', 'gt', 'gt', 'gt', '2023-05-05 00:00:00', 'image-1684088389193.background12.jpg', 0, 1, 1, 'gt', 'gt'),
(9, 'mi', 'mi', 'mi', 'mi', '2023-05-19 00:00:00', 'image-1684088463317.background16.jpg', 0, 3, 1, 'mi', 'mi'),
(10, 'today news', 'palanpur is clean city in banaskantha', '', 'husenahmad', '2023-05-15 00:00:00', 'image-1684115684587.IMG_20221008_131411.jpg', 0, 1, 1, 'big city, palanpur', 'big city, palanpur'),
(11, 'k', 'k', '[object Object]', 'kkl', '2023-05-15 00:00:00', 'image-1684118362383.@sunasarahusenahmad.png', 0, 1, 1, 'kl', 'mayers'),
(13, 'First blog', 'this is meta description', '<h2><strong>New Editor</strong></h2><p>This is a first blog</p>', 'Our team', '2023-05-16 00:00:00', 'image-1684217677862.Untitled design.png', 0, 1, 1, 'blog', 'blog'),
(14, 'Second Blog', 'Blog is the change the world and also blog is powerfull weapon', '<p>This is Second Blog in our World<br/></p>', 'sunasara nofal', '2023-05-10 00:00:00', 'image-1684219317699.IMG_20221121_125602.jpg', 0, 5, 1, 'blog, second', 'second'),
(17, 'third blog', 'third blog', '<p>third blog</p>', 'third blog', '2023-05-17 00:00:00', 'image-1684219736075.IMG_20221008_131757.jpg', 0, 3, 1, 'third blog', 'third blog');

-- --------------------------------------------------------

--
-- Table structure for table `bg_books_category`
--

CREATE TABLE `bg_books_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_books_detail`
--

CREATE TABLE `bg_books_detail` (
  `id` int(11) NOT NULL,
  `book_title` tinytext NOT NULL,
  `book_author` tinytext NOT NULL,
  `book_publish_date` datetime NOT NULL,
  `book_description` text NOT NULL,
  `book_thumbnail` text NOT NULL,
  `book_pdf` text NOT NULL,
  `book_likes` int(11) NOT NULL,
  `books_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_name_category`
--

CREATE TABLE `bg_name_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bg_name_detail`
--

CREATE TABLE `bg_name_detail` (
  `id` int(11) NOT NULL,
  `name_title` tinytext NOT NULL,
  `name_description` text NOT NULL,
  `name_english` tinytext NOT NULL,
  `name_meaning` text NOT NULL,
  `name_gender` tinytext NOT NULL,
  `name_likes` int(11) NOT NULL,
  `name_category` int(11) NOT NULL,
  `name_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bg_blog_category`
--
ALTER TABLE `bg_blog_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_category` (`blog_category`);

--
-- Indexes for table `bg_books_category`
--
ALTER TABLE `bg_books_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `books_category` (`books_category`);

--
-- Indexes for table `bg_name_category`
--
ALTER TABLE `bg_name_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name_category` (`name_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bg_blog_category`
--
ALTER TABLE `bg_blog_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `bg_books_category`
--
ALTER TABLE `bg_books_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bg_name_category`
--
ALTER TABLE `bg_name_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bg_blog_comment`
--
ALTER TABLE `bg_blog_comment`
  ADD CONSTRAINT `bg_blog_comment_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `bg_blog_post` (`id`);

--
-- Constraints for table `bg_blog_post`
--
ALTER TABLE `bg_blog_post`
  ADD CONSTRAINT `bg_blog_post_ibfk_1` FOREIGN KEY (`blog_category`) REFERENCES `bg_blog_category` (`id`);

--
-- Constraints for table `bg_books_detail`
--
ALTER TABLE `bg_books_detail`
  ADD CONSTRAINT `bg_books_detail_ibfk_1` FOREIGN KEY (`books_category`) REFERENCES `bg_books_category` (`id`);

--
-- Constraints for table `bg_name_detail`
--
ALTER TABLE `bg_name_detail`
  ADD CONSTRAINT `bg_name_detail_ibfk_1` FOREIGN KEY (`name_category`) REFERENCES `bg_name_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 08:38 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `blog_publish_date` date NOT NULL,
  `blog_image` varchar(50) NOT NULL,
  `blog_likes` int(11) NOT NULL,
  `blog_category` int(11) NOT NULL,
  `blog_status` tinyint(1) NOT NULL DEFAULT 1,
  `blog_keywords` text NOT NULL,
  `blog_tags` text NOT NULL,
  `blog_slug` tinytext NOT NULL,
  `blog_time` time NOT NULL DEFAULT current_timestamp(),
  `blog_delete_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bg_blog_post`
--

INSERT INTO `bg_blog_post` (`id`, `blog_title`, `blog_description`, `blog_content`, `blog_author`, `blog_publish_date`, `blog_image`, `blog_likes`, `blog_category`, `blog_status`, `blog_keywords`, `blog_tags`, `blog_slug`, `blog_time`, `blog_delete_status`) VALUES
(1, 'k', 'k', 'k', 'k', '2023-05-14', 'image-1684080484468.77.png', 0, 1, 0, 'k', 'k', '', '03:11:59', 0),
(3, 'kk', 'kk', 'kk', 'kk', '2023-05-14', 'image-1684086752620.background6.jpg', 0, 3, 0, 'kl', 'rahul', '', '03:11:59', 0),
(7, 'gt', 'gt', 'gt', 'gt', '2023-05-05', 'image-1684088389193.background12.jpg', 0, 1, 0, 'gt', 'gt', '', '03:11:59', 0),
(10, 'today news', 'palanpur is clean city in banaskantha', '', 'husenahmad', '2023-05-15', 'image-1684115684587.IMG_20221008_131411.jpg', 0, 1, 0, 'big city, palanpur', 'big city, palanpur', '', '03:11:59', 1),
(11, 'k', 'k', '[object Object]', 'kkl', '2023-05-15', 'image-1684118362383.@sunasarahusenahmad.png', 0, 1, 0, 'kl', 'mayers', '', '03:11:59', 0),
(13, 'First blog', 'this is meta description', '<h2><strong>New Editor</strong></h2><p>This is a first blog</p>', 'Our team', '2023-05-16', 'image-1684217677862.Untitled design.png', 0, 1, 1, 'blog', 'blog', '', '03:11:59', 1),
(14, 'Second Blog', 'Blog is the change the world and also blog is powerfull weapon', '<p>This is Second Blog in our World<br/></p>', 'sunasara nofal', '2023-05-10', 'image-1684219317699.IMG_20221121_125602.jpg', 0, 5, 1, 'blog, second', 'second', '', '03:11:59', 1),
(17, 'third blog', 'third blog', '<p>third blog</p>', 'third blog', '2023-05-17', 'image-1684219736075.IMG_20221008_131757.jpg', 0, 3, 1, 'third blog', 'third blog', '', '03:11:59', 1),
(24, 'mnp', 'mnp', '<p>mnp</p>', 'mnp', '2023-05-02', 'image-1684236600944.IMG20221030175107.jpg', 0, 3, 0, 'mnp', 'mnp', '', '03:11:59', 1),
(34, 'lsdfs', 'sdfsfslk', '<p>sdfsfl</p>', 'sfsdlfs', '2023-05-21', 'image-1684238062805.face12.jpg', 0, 3, 0, 'lsdfls', 'sdfsldf', '', '03:11:59', 1),
(35, 'adsl', 'dsflksfslk', '<p>sdflsfkl</p>', 'sdfsdf', '2023-05-24', 'image-1684238155374.face26.jpg', 0, 1, 0, 'zclksf', 'dfklsdfskl', '', '03:11:59', 1),
(36, 'adsl', 'dsflksfslk', '<p>sdflsfkl</p>', 'sdfsdf', '2023-05-24', 'image-1684238209805.face26.jpg', 0, 1, 1, 'zclksf', 'dfklsdfskl', '', '03:11:59', 1),
(37, 'abc', 'abc', '<p>abca</p>', 'abc', '2023-05-16', 'image-1684238347870.face18.jpg', 0, 5, 1, 'abc', 'abc', '', '03:11:59', 1),
(38, 'xyz', 'xyz', '<p>xyz</p>', 'xyz', '2023-05-16', 'image-1684238386706.face19.jpg', 0, 3, 0, 'xyz', 'xyz', '', '03:11:59', 1),
(39, 'dsf', 'dfgdf', '<p>sfsd</p>', 'dfsd', '2023-05-02', 'image-1684238490165.face8.jpg', 0, 1, 1, 'sdf', 'sdf', '', '03:11:59', 1),
(40, 'kk', 'kk', '<p>kk</p>', 'kk', '2023-05-21', 'image-1684238534366.face23.jpg', 0, 3, 0, 'kk', 'll', '', '03:11:59', 1),
(41, 'jammu', 'jammu kashmir is must', '<p>jammu kashmir</p>', 'husenahmad', '2023-05-17', 'image-1684261966855.face25.jpg', 0, 5, 0, 'jammu', 'kashmir', '', '03:11:59', 1),
(42, 'basannofal', 'softwate engineer', '<p>basan nofal is </p>', 'sunasara husen', '2023-05-17', 'image-1684296777642.face17.jpg', 0, 5, 0, 'software', 'engineer', '', '00:00:00', 1),
(43, 'this is proper meta title with seo and this is for fun', 'this is proper meta title with seo and this is for fun', '<p>this is proper meta title with seo and this is for fun</p>', 'this is ', '2023-05-10', 'image-1684303968319.face4.jpg', 0, 1, 1, 'this is ', 'this is ', '', '00:00:00', 1),
(44, 'this is proper meta title', 'this is proper meta title with seo and this is for fun', '<p>this is proper meta title with seo and this is for fun </p>', 'this is ', '2023-05-11', 'image-1684304019079.face4.jpg', 0, 1, 1, 'this is ', 'this is ', '', '00:00:00', 1),
(45, 'valudas blogs application', 'valudas blogs application is a biggest application on the office', '<p><strong><u>valudas blogs application</u></strong> is a biggest application on the office</p>', 'aakib valuda', '2023-05-09', 'image-1684323379580.face21.jpg', 0, 1, 1, 'valudas, office, application', 'valudas, office, application', '', '17:06:19', 1),
(46, 'First Blog', 'fir', '<h2>First Blog</h2><p></p><p>this is first blog</p>', 'fir', '2023-09-09', 'image-1684467156078.WIN_20230211_11_16_15_Pro.jpg', 0, 1, 1, 'fir', 'fir', '', '09:02:36', 1),
(47, 'nofal', 'nofa', '<p>fnofa</p>', 'nflask', '3333-09-01', 'image-1684558433492.WIN_20230211_11_16_08_Pro.jpg', 0, 3, 1, 'dfd,dsdsd,,ass,sss,sssgg,dds,sss\\,sss,gg', 'sss', '', '10:23:53', 1),
(48, 'new blog ', 'new blog', '<p>new blog </p>', 'blog ', '2222-02-22', 'image-1684558649480.WIN_20230211_11_16_08_Pro.jpg', 0, 1, 1, 'nofal,only blog', 'new', '', '10:27:29', 1),
(49, 'sffffffff', 'meta description', '<h1>this is</h1><p> <strong>first blog content</strong></p>', 'blog autor', '2023-05-21', 'image-1684585714991.WIN_20221206_12_39_36_Pro.jpg', 0, 3, 1, 'dd,new,aaa', 'tags', '', '10:30:05', 1),
(50, 'ss', 'sss', '<ol type=\"1\"><li>s</li></ol>', 's', '2023-05-09', 'image-1684558904365.WIN_20230211_11_16_15_Pro.jpg', 0, 3, 1, 'ss,fdd,ss,ss,ss,ssf', 'ss', '', '10:31:44', 1),
(51, 'sdfnsskkmk', 'sdfffkk', '<p>kkklskljlffsdf</p>', 'kkk', '2023-05-22', 'image-1684585791697.WIN_20230211_11_16_08_Pro.jpg', 0, 1, 1, 'df,fff,kkk', 'kkk', '', '11:11:29', 1),
(53, 'title', 'description', '<p>content</p>', 'author', '0003-01-01', 'image-1684645124322.WIN_20230211_11_16_08_Pro.jpg', 0, 1, 1, 'key', 'tags', '', '10:28:44', 1),
(54, 'hello', 'this is my wordl', '<h1>this is example<code>&lt;B&gt; &lt;/B&gt;&lt;html&gt;</code></h1><div><code>&lt;html&gt;</code></div><div><code>&lt;body&gt;</code></div><div><code>&lt;/body&gt;</code></div><div><code>&lt;/html&gt;</code></div><p><code>   body</code></p><p><code>&lt;/html&gt;</code></p><p><code>&lt;this is the best</code></p><p><code>information</code></p><p></p><p></p>', 'nofal', '2292-02-01', 'image-1684667915033.WIN_20221206_12_38_29_Pro.jpg', 0, 3, 1, 'keyword', 'tags', '', '16:48:35', 1),
(55, 'plz', 'plz', '<p>plx</p>', ';pp', '2992-09-09', 'image-1684759180042.WIN_20230211_11_16_08_Pro.jpg', 0, 3, 1, 'plz', 'plz', '', '18:09:40', 1),
(56, 'this is best blog', 'blog description', '<p>this is best blgo</p>', 'blog author', '8888-08-08', 'image-1684778666415.WIN_20230211_11_16_08_Pro.jpg', 0, 1, 1, 'blog', 'blog tags', 'this-is-best-blog', '23:34:26', 1),
(58, 'this is best blog', 'best descri1', '<p>best blog</p>', 'nofal', '9999-09-09', 'image-1684780368079.WIN_20230211_11_16_15_Pro.jpg', 0, 1, 1, 'key', 'tags', 'this-is-best-blog1', '00:02:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bg_books_category`
--

CREATE TABLE `bg_books_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bg_name_category`
--

CREATE TABLE `bg_name_category` (
  `id` int(11) NOT NULL,
  `category_name` tinytext NOT NULL,
  `category_description` text NOT NULL,
  `sub_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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

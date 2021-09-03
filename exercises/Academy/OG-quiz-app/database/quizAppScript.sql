CREATE DATABASE  IF NOT EXISTS `quiz_application` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `quiz_application`;

-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quiz_application
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) CHARACTER SET utf8 NOT NULL,
  `correct` tinyint(4) NOT NULL DEFAULT 0,
  `questions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`questions_id`),
  KEY `fk_answers_questions1_idx` (`questions_id`),
  CONSTRAINT `fk_answers_questions1` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (322,'0',0,129),(323,'2',0,129),(324,'4',1,129),(325,'1',0,129),(326,'7',0,130),(327,'8',0,130),(328,'3',0,130),(329,'9',1,130),(330,'MS Word 2007',1,131),(331,'Microsoft Windows',0,131),(332,'Software',1,133),(333,'Hardware',0,133),(334,'System software',1,132),(335,'Real time software',0,132),(336,'Desktop publishng',1,134),(337,'Desktop Product',0,134);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `category_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'History'),(10,'IT'),(3,'Math'),(5,'Sports');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8 NOT NULL,
  `isMultiple` tinyint(4) NOT NULL,
  `points` int(11) NOT NULL,
  `quizzes_id` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  PRIMARY KEY (`id`,`quizzes_id`),
  KEY `fk_questions_quizzes1_idx` (`quizzes_id`),
  CONSTRAINT `fk_questions_quizzes1` FOREIGN KEY (`quizzes_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (129,'2 + 2 = ?',0,2,80,1),(130,'3 + 6 = ?',0,2,80,1),(131,'	Which of the following is an example of application software',0,3,81,1),(132,'	What is a collection of programs written to provide services to other program',0,5,81,1),(133,'What transform one interface into another interface',0,4,81,1),(134,'	What is the full form of DTP',0,5,81,1);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) CHARACTER SET utf8 NOT NULL,
  `time_limit` int(11) NOT NULL DEFAULT 3600,
  `users_id` int(11) NOT NULL,
  `categories_id` int(11) NOT NULL,
  `listed` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`,`users_id`,`categories_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_quizzes_users1_idx` (`users_id`),
  KEY `fk_quizzes_categories1_idx` (`categories_id`),
  CONSTRAINT `fk_quizzes_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_quizzes_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES (80,'First grade math',2400,18,3,1),(81,'Computer Software',3600,18,10,1);
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(2000) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_refresh_tokens_users1_idx` (`users_id`),
  CONSTRAINT `fk_refresh_tokens_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (116,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJ1c2VybmFtZSI6IlRlYWNoZXIiLCJpYXQiOjE2MDcwMjMwMjgsImV4cCI6MTYwNzYyNzgyOH0.4rZN_xtS3P-j_rtmD5bE8dMTz-iaUU_S7-MayFzmpJc',18),(117,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJ1c2VybmFtZSI6IlRlYWNoZXIiLCJpYXQiOjE2MDcwMjMwNTUsImV4cCI6MTYwNzYyNzg1NX0.9XrTlPajQdt76lhKk_mxytqhtjQ0OSvGO9kYCbqX_4U',18);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solved_quizzes`
--

DROP TABLE IF EXISTS `solved_quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solved_quizzes` (
  `quizzes_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `date_of_solving` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`quizzes_id`,`users_id`),
  KEY `fk_quizzes_has_users_users1_idx` (`users_id`),
  KEY `fk_quizzes_has_users_quizzes_idx` (`quizzes_id`),
  CONSTRAINT `fk_quizzes_has_users_quizzes` FOREIGN KEY (`quizzes_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_quizzes_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solved_quizzes`
--

LOCK TABLES `solved_quizzes` WRITE;
/*!40000 ALTER TABLE `solved_quizzes` DISABLE KEYS */;
/*!40000 ALTER TABLE `solved_quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8 NOT NULL,
  `first_name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `last_name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) NOT NULL,
  `isTeacher` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'petko','petko','petko','$2b$10$LjBVm/OIE1uUOxMg3IMeVOxMpsLeV3U51D0g/HyqjKSmmhi8Ot5TG',0),(18,'Teacher','Teacher','Teacher','$2b$10$daNJd5s4zbs0Gi10qOqJTOMQUplvlohnnEj/j1bVCfarsu4Yh4BlO',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 21:30:08

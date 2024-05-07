-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: sincro
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `category` varchar(100) DEFAULT NULL,
  `contactId` int NOT NULL AUTO_INCREMENT,
  `company` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `comments` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`contactId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employeeId` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `position` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `project` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mandatoryEquipment` enum('si','no','incompleto') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comments` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `filesId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `hoursId` int DEFAULT NULL,
  PRIMARY KEY (`employeeId`),
  KEY `employee_files_FK` (`filesId`),
  KEY `employee_projects_FK` (`projectId`),
  CONSTRAINT `employee_files_FK` FOREIGN KEY (`filesId`) REFERENCES `files` (`filesId`),
  CONSTRAINT `employee_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16le;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `filesId` int NOT NULL AUTO_INCREMENT,
  `projectId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `path` varchar(250) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `registerDate` datetime DEFAULT NULL,
  PRIMARY KEY (`filesId`),
  KEY `images_projects_FK` (`projectId`),
  KEY `images_employee_FK` (`employeeId`),
  CONSTRAINT `images_employee_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`),
  CONSTRAINT `images_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hours`
--

DROP TABLE IF EXISTS `hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hours` (
  `extraHours` int DEFAULT NULL,
  `regularHours` int DEFAULT NULL,
  `hoursId` int NOT NULL AUTO_INCREMENT,
  `regurlarMinutes` int DEFAULT NULL,
  `extraMinutes` int DEFAULT NULL,
  PRIMARY KEY (`hoursId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hours`
--

LOCK TABLES `hours` WRITE;
/*!40000 ALTER TABLE `hours` DISABLE KEYS */;
/*!40000 ALTER TABLE `hours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `projectName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `addressDescription` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `block` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `portal` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `zipCode` int DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `map` varchar(100) DEFAULT NULL,
  `projectDetails` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `typeOfWork` enum('construction','finishings','instalations','pool','solarPanels') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `constructionType` enum('chalet','apartment','rural','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `projectId` int NOT NULL AUTO_INCREMENT,
  `addedSection` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hiringCompany` varchar(100) DEFAULT NULL,
  `createTask` varchar(100) DEFAULT NULL,
  `projectDescription` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `taskDescription` varchar(100) DEFAULT NULL,
  `filesId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `status` enum('noIniciado','iniciado','termidado') DEFAULT NULL,
  `sections` json DEFAULT NULL,
  `identifier` varchar(100) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`projectId`),
  KEY `projects_files_FK` (`filesId`),
  KEY `projects_employee_FK` (`employeeId`),
  CONSTRAINT `projects_employee_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`),
  CONSTRAINT `projects_files_FK` FOREIGN KEY (`filesId`) REFERENCES `files` (`filesId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('La colina','Monte Albas 3ra , local','La colina, No 21','3','5','21',29540,'Málaga','2024-05-04 12:30:00','2024-06-04 12:30:00',NULL,NULL,'finishings','chalet',1,NULL,'Eliseo','Instalación de pisos','Retirar e instalar baldosas','Marca de baldosas',NULL,NULL,NULL,'{\"hall\": null, \"pool\": null, \"roof\": null, \"room\": 1, \"kitchen\": 1, \"laundry\": null, \"terrace\": null, \"bathRoom\": null, \"livingRoom\": null}','',NULL),('Nuevo Proyecto Residencial','Cerca de la plaza central','123 Calle Ficticia','B1',NULL,'101',12345,'Ciudad Central','2024-01-01 00:00:00','2024-12-31 00:00:00','lat: 36.579395, lng: -4.597678','Detalles del proyecto aquí','construction','apartment',2,'Sección adicional','Constructora XYZ','Crear tarea','Descripción del proyecto aquí','Descripción de la tarea aquí',NULL,NULL,'noIniciado','{\"hall\": true, \"pool\": false, \"roof\": true, \"room\": false, \"kitchen\": true, \"terrace\": false, \"bathRoom\": true, \"livingRoom\": true}','PROJ123','200m²');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `task` varchar(200) NOT NULL,
  `employeeName` varchar(100) DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `taskDescription` varchar(100) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `filesId` int DEFAULT NULL,
  PRIMARY KEY (`taskId`),
  KEY `task_employee_FK` (`employeeId`),
  KEY `task_projects_FK` (`projectId`),
  KEY `task_files_FK` (`filesId`),
  CONSTRAINT `task_employee_FK` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`),
  CONSTRAINT `task_files_FK` FOREIGN KEY (`filesId`) REFERENCES `files` (`filesId`),
  CONSTRAINT `task_projects_FK` FOREIGN KEY (`projectId`) REFERENCES `projects` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `surname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updateDate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'sincro@gmail.com','8a979ff187eb7e1970fd3d8978c2d4e5','Veronica','Chase','2024-04-26 23:00:42',NULL),(4,'juan@cocacola.com','4a24c1e1ab413c7a6e87b74525bc1976','Juan ','Ferrara','2024-04-27 10:57:46',NULL),(5,'marta@pinky.com','efbb80551a574bc58312aef0c45e7eb0','Marta','Caballero','2024-04-27 11:10:07',NULL),(6,'carlos@Cocotel.com','c2ab03b9e3a70b68a0e514e85e8e6320','Carlos','Figueroa','2024-04-27 12:43:10',NULL),(7,'cecilia@campo.com','5da0c9b7be0e4ad0fca88772d064030e','Cecilia','Mirto','2024-04-27 12:50:11',NULL),(8,'julieta.cocacola.com','20c42fb604090eb59c3caf8683bda920','Julieta',NULL,'2024-05-02 19:58:37',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sincro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 12:25:52

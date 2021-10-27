-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 27 oct. 2021 à 16:44
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `electric`
--

-- --------------------------------------------------------

--
-- Structure de la table `toilets`
--

DROP TABLE IF EXISTS `toilets`;
CREATE TABLE IF NOT EXISTS `toilets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `city` varchar(22) NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  `latitude` float(10,6) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `wheelchair` tinyint(1) DEFAULT NULL,
  `baby` tinyint(1) DEFAULT NULL,
  `free` varchar(10) DEFAULT NULL,
  `communal` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `toilets`
--

INSERT INTO `toilets` (`id`, `name`, `city`, `address`, `latitude`, `longitude`, `phone`, `wheelchair`, `baby`, `free`, `communal`) VALUES
(1, 'Bertilssons stuga', 'Gothenburg', 'Delsjökärrsvägen 26', 57.686180, 12.085550, '313650000', NULL, NULL, '1', 1),
(2, 'Björngårdsvägen', 'Gothenburg', 'Björngårdsvägen, Slottsskogen', 57.687210, 11.945660, '313650000', 1, 1, NULL, 1),
(3, 'Burger King Järntorget', 'Gothenburg', 'Järntorget 6', 57.699631, 11.952780, '31242770', 1, NULL, NULL, NULL),
(4, 'Burger King', 'Gothenburg', 'Kungsportsavenyen 14', 57.701191, 11.974580, '313650000', 1, NULL, NULL, NULL),
(5, 'Burgårdsplatsen', 'Gothenburg', 'Skanegatan 23', 57.700420, 11.985480, '313650000', NULL, NULL, NULL, 1),
(6, 'Charles Felix Lindbergs plats', 'Gothenburg', 'Charles Felix Lindbergs plats', 57.702629, 11.972520, '313650000', 1, 1, '1', 1),
(7, 'City Avenyn', 'Gothenburg', 'Kungsportsavenyen 34', 57.699169, 11.977360, '313650000', 1, NULL, NULL, NULL),
(8, 'Drottningtorget', 'Gothenburg', 'Drottningtorget 5', 57.709358, 11.972970, '313650000', 1, NULL, NULL, NULL),
(9, 'Frölunda Torg', 'Gothenburg', 'Frölunda Torg', 57.653412, 11.913000, '313650000', 1, NULL, '1', 1),
(10, 'Färjenäsparken', 'Gothenburg', 'Pölsebogatan', 57.698170, 11.901230, '313650000', NULL, NULL, '1', 1),
(11, 'Heden', 'Gothenburg', 'korsningen Södra vägen', 57.701511, 11.976710, '313650000', 1, NULL, '1', 1),
(12, 'Hjalmar Brantingsplatsen', 'Gothenburg', 'Hjalmar Brantingsplatsen', 57.720928, 11.953660, '313650000', 1, NULL, '1', 1),
(13, 'Järntorget', 'Gothenburg', 'Järntorget', 57.699871, 11.952690, '313650000', 1, NULL, '1', 1),
(14, 'Korsvägen ', 'Gothenburg', 'Korsvägen ', 57.696590, 11.987810, '313650000', 1, NULL, '1', 1),
(15, 'Kungsparken minigolf', 'Gothenburg', 'Pers Angers Plats 2', 57.700439, 11.966740, '313650000', NULL, NULL, NULL, NULL),
(16, 'Kungsportsplatsen', 'Gothenburg', 'Kungsportsplatsen 2-3', 57.704639, 11.970190, '313650000', 1, NULL, '1', 1),
(17, 'Linnéplatsen', 'Gothenburg', 'Linnéplatsen 11', 57.680210, 11.951780, '313650000', 1, NULL, '1', 1),
(18, 'McDonald\'s', 'Gothenburg', 'Valhallagatan 1', 57.699909, 11.988000, '31200216', 1, NULL, NULL, NULL),
(19, 'Nöller espressobar', 'Gothenburg', 'Haga Nygata 28', 57.688461, 11.960080, '31135361', NULL, NULL, NULL, NULL),
(20, 'Odins parkgrill', 'Gothenburg', 'Odinsplatsen 11', 57.710011, 11.984870, '313650000', NULL, NULL, NULL, NULL),
(21, 'Redbergsplatsen', 'Gothenburg', 'Redbergsplatsen', 57.716621, 12.004850, '313650000', 1, NULL, '1', 1),
(22, 'Restaurang Bee Bar', 'Gothenburg', 'Kungstorget 16', 57.703850, 11.967690, '313650000', NULL, NULL, NULL, NULL),
(23, 'Röda sten konsthall', 'Gothenburg', 'Röda Sten 1', 57.689362, 11.901860, '313650000', NULL, NULL, NULL, NULL),
(24, 'Skanstorget', 'Gothenburg', 'Skanstorget 19', 57.696831, 11.958430, '313650000', 1, NULL, '1', 1),
(25, 'Slottsskogen', 'Gothenburg', 'Plantskolevägen ', 57.685329, 11.935620, '313650000', NULL, NULL, '1', 1),
(26, 'Slottsskogen, Café Bräket', 'Gothenburg', 'Dovhjortstigen 50', 57.687569, 11.942160, '313650000', NULL, NULL, NULL, 1),
(27, 'Slottsskogen, lekplatsen', 'Gothenburg', 'Björngardsvägen ', 57.690311, 11.946860, '313650000', 1, NULL, '1', 1),
(28, 'Slottsskogspromenaden', 'Gothenburg', 'Slottsskogspromenaden', 57.685810, 11.947490, '313650000', 1, NULL, '1', 1),
(29, 'Slottsskogens äventyrsgolf och café', 'Gothenburg', 'Slottsskogens', 57.689339, 11.951680, '313650000', NULL, NULL, NULL, NULL),
(30, 'Stadsbiblioteket', 'Gothenburg', 'Götaplatsen 3', 57.688610, 11.979710, '313650000', 1, NULL, NULL, 1),
(31, 'Stadsmuseet', 'Gothenburg', 'Norra Hamngatan 12', 57.708172, 11.963410, '313650000', 1, NULL, '1', 1),
(32, 'Traktören', 'Gothenburg', 'Köpmansgatan 20', 57.707272, 11.864810, '313650000', 1, NULL, '1', 1),
(33, 'Trädgårdsföreningen', 'Gothenburg', 'Slussgatan ', 57.707531, 11.976110, '313650000', 1, NULL, NULL, 1),
(34, 'Trädgårdsföreningen Nya Allen', 'Gothenburg', 'Nya Allen ', 57.704800, 11.976700, '313650000', NULL, NULL, NULL, 1),
(35, 'Vasaplatsen', 'Gothenburg', 'Vasaplatsen 13', 57.699902, 11.969070, '313650000', NULL, NULL, NULL, 1),
(36, 'Västtrafik', 'Gothenburg', 'Drottningtorget 2', 57.708031, 11.971950, '313650000', 1, NULL, NULL, NULL),
(37, 'Västtrafik , Nils Ericssonsterminalen', 'Gothenburg', 'Nils Ericsonsplatsen 6', 57.709591, 11.972370, '313650000', 1, NULL, NULL, NULL),
(38, 'Älvsborgsplan', 'Gothenburg', 'Älvsborgsplan', 57.685989, 11.919730, '313650000', 1, NULL, NULL, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

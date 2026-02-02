-- =====================================================
-- GREENEZ VOUS - Schema de base de donnees
-- =====================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table categories
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`id`, `name`, `slug`) VALUES
(1, 'Salle de Bain', 'salle-de-bain'),
(2, 'Cheveux', 'cheveux'),
(3, 'Pour les Enfants', 'enfants');

-- -----------------------------------------------------
-- Table products
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(255) DEFAULT NULL,
  `description` TEXT,
  `price` DECIMAL(10,2) NOT NULL,
  `stock` INT DEFAULT 0,
  `category_id` INT,
  `image` VARCHAR(500),
  `tag` VARCHAR(50) DEFAULT NULL,
  `active` TINYINT(1) DEFAULT 1,
  `featured` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table admins
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Mot de passe: admin123 (hash bcrypt)
INSERT INTO `admins` (`email`, `password`, `name`) VALUES
('admin@greenez.fr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin Greenez Vous');

-- -----------------------------------------------------
-- Table customers (clients)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100),
  `last_name` VARCHAR(100),
  `phone` VARCHAR(20),
  `address` VARCHAR(255),
  `city` VARCHAR(100),
  `postal_code` VARCHAR(10),
  `country` VARCHAR(50) DEFAULT 'France',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table orders
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `tracking_code` VARCHAR(20) NOT NULL UNIQUE,
  `invoice_number` VARCHAR(50),
  `customer_id` INT,
  `customer_email` VARCHAR(255),
  `customer_first_name` VARCHAR(100),
  `customer_last_name` VARCHAR(100),
  `customer_phone` VARCHAR(20),
  `customer_address` VARCHAR(255),
  `customer_city` VARCHAR(100),
  `customer_postal_code` VARCHAR(10),
  `customer_country` VARCHAR(50) DEFAULT 'France',
  `subtotal` DECIMAL(10,2),
  `shipping_cost` DECIMAL(10,2) DEFAULT 0,
  `shipping_method` VARCHAR(100),
  `promo_code` VARCHAR(50),
  `promo_discount` DECIMAL(10,2) DEFAULT 0,
  `total` DECIMAL(10,2),
  `status` ENUM('pending', 'confirmed', 'crafting', 'quality', 'packing', 'shipped', 'delivered') DEFAULT 'pending',
  `payment_method` VARCHAR(50),
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table order_items
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT,
  `product_name` VARCHAR(255),
  `product_subtitle` VARCHAR(255),
  `product_image` VARCHAR(500),
  `price` DECIMAL(10,2),
  `quantity` INT DEFAULT 1,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table order_status_history
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_status_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `status` VARCHAR(50),
  `note` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table order_messages
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `order_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `sender` ENUM('customer', 'admin') NOT NULL,
  `message` TEXT,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table reviews
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `customer_name` VARCHAR(100),
  `rating` INT CHECK (rating >= 1 AND rating <= 5),
  `comment` TEXT,
  `approved` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table events
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `date` DATE,
  `location` VARCHAR(255),
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table promos
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `promos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount` DECIMAL(10,2) NOT NULL,
  `type` ENUM('percent', 'fixed') DEFAULT 'percent',
  `min_order` DECIMAL(10,2) DEFAULT 0,
  `max_usage` INT DEFAULT 100,
  `usage_count` INT DEFAULT 0,
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `promos` (`code`, `discount`, `type`, `min_order`, `max_usage`) VALUES
('BIENVENUE10', 10, 'percent', 15, 100),
('HIVER2026', 5, 'fixed', 20, 50),
('ZERODECHET', 15, 'percent', 30, 30);

-- -----------------------------------------------------
-- Table shipping_options
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shipping_options` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255),
  `price` DECIMAL(10,2) NOT NULL,
  `min_order` DECIMAL(10,2) DEFAULT 0,
  `max_order` DECIMAL(10,2) DEFAULT NULL,
  `free_above` DECIMAL(10,2) DEFAULT NULL,
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `shipping_options` (`name`, `description`, `price`, `free_above`) VALUES
('Lettre suivie', 'Livraison en 3-5 jours ouvrés', 2.95, 25),
('Colissimo', 'Livraison en 2-3 jours ouvrés', 4.95, 40),
('Point Relais', 'Retrait en point relais sous 3-5 jours', 3.95, 30);

-- -----------------------------------------------------
-- Table newsletter_subscribers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `first_name` VARCHAR(100),
  `active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table actualites
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `actualites` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image` VARCHAR(500),
  `instagram_url` VARCHAR(500),
  `active` TINYINT(1) DEFAULT 1,
  `date` DATE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------------
-- Table site_settings
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('hero_badge', 'Artisanat Francais'),
('hero_title', 'Creations Textiles'),
('hero_title_italic', 'Zero Dechet'),
('hero_subtitle', 'Des creations artisanales, confectionnees avec amour a Lyon, pour une salle de bain plus douce et une planete preservee.'),
('about_title', 'L\'Art du Fait Main'),
('about_text', 'Chaque piece est unique, confectionnee dans mon atelier lyonnais avec des matieres soigneusement selectionnees.'),
('footer_text', 'Creations artisanales zero dechet, fabriquees avec amour a Lyon.'),
('contact_email', 'contact@greenezvous.fr'),
('contact_phone', '06 12 34 56 78'),
('instagram', 'https://instagram.com/Greenez_vous'),
('facebook', '');

-- -----------------------------------------------------
-- Table email_logs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `email_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(50),
  `recipient` VARCHAR(255),
  `subject` VARCHAR(255),
  `preview` TEXT,
  `status` ENUM('sent', 'failed') DEFAULT 'sent',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

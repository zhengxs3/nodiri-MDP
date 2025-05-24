CREATE DATABASE nodiri;
USE nodiri;

-- Table : users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL,
  firstname VARCHAR(20),
  lastname VARCHAR(20),
  birthdate DATE
);

-- Table : messages
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  sender INT,
  receiver INT,
  FOREIGN KEY (sender) REFERENCES users(id),
  FOREIGN KEY (receiver) REFERENCES users(id)
);

-- Table : emotions
CREATE TABLE emotions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  emotion_type VARCHAR(50) NOT NULL
);

-- Table : user_emotion
CREATE TABLE user_emotion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intensity TINYINT CHECK (intensity BETWEEN 1 AND 5),
  user_id INT,
  emotion_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (emotion_id) REFERENCES emotions(id)
);

-- Table : routines
CREATE TABLE routines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description TEXT,
  img_url VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table : agenda
CREATE TABLE agenda (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_title VARCHAR(100) NOT NULL,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  description TEXT,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table : forum_categories
CREATE TABLE forum_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT
);

-- Table : forum_posts
CREATE TABLE forum_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  content TEXT,
  user_id INT,
  forum_category_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (forum_category_id) REFERENCES forum_categories(id)
);

-- Table : forum_comments
CREATE TABLE forum_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT,
  user_id INT,
  forum_posts_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (forum_posts_id) REFERENCES forum_posts(id)
);

-- Table : learning_modules
CREATE TABLE learning_modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  url VARCHAR(255)
);

-- Table : user_learning_progress
CREATE TABLE user_learning_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  learning_module_id INT,
  progress TINYINT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (learning_module_id) REFERENCES learning_modules(id)
);

-- Table : permissions
CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  can_view_emotions BOOLEAN DEFAULT FALSE,
  can_view_progress BOOLEAN DEFAULT FALSE,
  can_post_forum BOOLEAN DEFAULT FALSE,
  can_edit_modules BOOLEAN DEFAULT FALSE
);

-- Table : user_permission
CREATE TABLE user_permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  permission_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- Table : module_permission
CREATE TABLE module_permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  learning_module_id INT,
  permission_id INT,
  is_enabled BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (learning_module_id) REFERENCES learning_modules(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE DATABASE calidad;
USE calidad;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  intentos INT DEFAULT 0
);

INSERT INTO users (email, password)
VALUES ('test@test.com', '$2b$10$sm/1YHLdBQnvSrtwPBO2WulmrW9E2YBlXKz5T0UE.ffwGI5RxUy/.');

INSERT INTO users (email, password)
VALUES ('test2@test.com', '$2b$10$9rahOxdvTORuvNP/MVxx9eNlHPOpzDCSNpTQTaqfvk0t6nTMSX8Iu');
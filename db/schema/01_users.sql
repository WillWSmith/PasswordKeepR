-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(32) NOT NULL
);

-- Path: db/schema/01_users.sql

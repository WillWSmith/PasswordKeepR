DROP TABLE IF EXISTS accounts CASCADE;
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER NOT NULL,
  website TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

-- Path: db/schema/03_accounts.sql
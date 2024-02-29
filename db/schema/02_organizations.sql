DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  account_id INTEGER NOT NULL REFERENCES accounts(id)
);

-- Path: db/schema/02_organizations.sql
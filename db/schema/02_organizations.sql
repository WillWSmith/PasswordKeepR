DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL
);

-- Path: db/schema/02_organizations.sql
DROP TABLE IF EXISTS accounts CASCADE;
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  organization_id INTEGER NOT NULL REFERENCES organizations(id),
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  website TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

ALTER TABLE accounts
  ALTER COLUMN organization_id SET DEFAULT 1;

-- Path: db/schema/03_accounts.sql

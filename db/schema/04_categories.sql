DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL,
  organization_id INTEGER NOT NULL REFERENCES organizations(id)
);

-- Path: db/schema/04_categories.sql
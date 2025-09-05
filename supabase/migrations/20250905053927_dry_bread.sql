/*
  # Update clients table for first/last name

  1. Changes
    - Split name field into first_name and last_name
    - Add migration to handle existing data
    - Update constraints and indexes

  2. Data Migration
    - Split existing names on first space
    - Handle edge cases for single names
*/

-- Add new columns
ALTER TABLE clients 
ADD COLUMN first_name text,
ADD COLUMN last_name text;

-- Migrate existing data (split on first space)
UPDATE clients 
SET 
  first_name = CASE 
    WHEN position(' ' in name) > 0 
    THEN substring(name from 1 for position(' ' in name) - 1)
    ELSE name
  END,
  last_name = CASE 
    WHEN position(' ' in name) > 0 
    THEN substring(name from position(' ' in name) + 1)
    ELSE ''
  END
WHERE first_name IS NULL;

-- Make first_name required
ALTER TABLE clients 
ALTER COLUMN first_name SET NOT NULL;

-- Drop old name column
ALTER TABLE clients 
DROP COLUMN name;
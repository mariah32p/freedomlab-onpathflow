/*
  # Add client password field

  1. Changes
    - Add `client_password` field to clients table for secure client access
    - Add index for password lookups

  2. Security
    - Password field allows clients to view their own progress
    - Simple password protection without full authentication
*/

-- Add client_password field to clients table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clients' AND column_name = 'client_password'
  ) THEN
    ALTER TABLE clients ADD COLUMN client_password text;
  END IF;
END $$;

-- Add index for client password lookups
CREATE INDEX IF NOT EXISTS clients_password_idx ON clients(client_password) WHERE client_password IS NOT NULL;
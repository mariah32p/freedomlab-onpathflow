/*
  # Add missing database features

  1. Functions
    - Create update_updated_at_column() function if it doesn't exist
  
  2. Triggers
    - Add updated_at triggers for clients and milestones tables
  
  3. Indexes
    - Add performance indexes if they don't exist
*/

-- Create the updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at trigger for clients table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_clients_updated_at'
    ) THEN
        CREATE TRIGGER update_clients_updated_at
            BEFORE UPDATE ON clients
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Add updated_at trigger for milestones table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_milestones_updated_at'
    ) THEN
        CREATE TRIGGER update_milestones_updated_at
            BEFORE UPDATE ON milestones
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Add indexes for better performance if they don't exist
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON clients(user_id);
CREATE INDEX IF NOT EXISTS clients_created_at_idx ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS milestones_client_id_idx ON milestones(client_id);
CREATE INDEX IF NOT EXISTS milestones_completed_idx ON milestones(completed);
CREATE INDEX IF NOT EXISTS milestones_due_date_idx ON milestones(due_date);
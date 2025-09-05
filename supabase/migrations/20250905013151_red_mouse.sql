/*
  # Add Performance Features

  This migration adds performance and convenience features to existing tables:
  
  1. Updated_at triggers
     - Automatically update timestamps when records are modified
  
  2. Performance indexes
     - Speed up common queries for clients and milestones
  
  Note: Assumes clients and milestones tables already exist with RLS policies
*/

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to existing tables
DO $$
BEGIN
    -- Add trigger to clients table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_clients_updated_at'
    ) THEN
        CREATE TRIGGER update_clients_updated_at
            BEFORE UPDATE ON clients
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    -- Add trigger to milestones table if it doesn't exist
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

-- Add performance indexes if they don't exist
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON clients(user_id);
CREATE INDEX IF NOT EXISTS clients_created_at_idx ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS milestones_client_id_idx ON milestones(client_id);
CREATE INDEX IF NOT EXISTS milestones_completed_idx ON milestones(completed);
CREATE INDEX IF NOT EXISTS milestones_due_date_idx ON milestones(due_date);
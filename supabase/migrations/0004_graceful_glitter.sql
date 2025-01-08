/*
  # Add flags and active status to challenges

  1. Changes
    - Add flag column to challenges table
    - Add active status column to challenges table
    - Update RLS policies
*/

-- Add flag column to store challenge solutions
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS flag text NOT NULL DEFAULT '';

-- Add active status column
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT false;

-- Update RLS policies for challenges
CREATE POLICY "Admin can manage challenges" ON challenges 
  FOR ALL 
  TO authenticated 
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');
/*
  # Add Challenge Management Policies

  1. Security Changes
    - Add RLS policies for challenge management
    - Allow admins to manage challenges
    - Allow authenticated users to view active challenges
*/

-- Enable RLS for challenges table if not already enabled
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Allow admins to perform all operations
CREATE POLICY "Admins can manage challenges"
ON challenges
FOR ALL
TO authenticated
USING (auth.jwt() ? 'is_admin'::text = 'true')
WITH CHECK (auth.jwt() ? 'is_admin'::text = 'true');

-- Allow all authenticated users to view active challenges
CREATE POLICY "Users can view active challenges"
ON challenges
FOR SELECT
TO authenticated
USING (is_active = true);

-- Allow all users to read challenges (for public viewing)
CREATE POLICY "Public can view active challenges"
ON challenges
FOR SELECT
TO public
USING (is_active = true);
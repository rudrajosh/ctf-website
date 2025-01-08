/*
  # Add last_active column to teams table

  1. Changes
    - Add `last_active` timestamp column to `teams` table for tracking team activity
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'teams' AND column_name = 'last_active'
  ) THEN
    ALTER TABLE teams ADD COLUMN last_active timestamptz;
  END IF;
END $$;
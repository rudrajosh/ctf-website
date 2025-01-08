/*
  # Add Challenge Management Fields

  1. New Fields
    - `rules` (text): Challenge rules and guidelines
    - `rewards` (text): Challenge rewards description
    - `participant_limit` (integer): Maximum number of allowed participants
    - `timezone` (text): Challenge timezone
    - `is_recurring` (boolean): Whether the challenge repeats
    - `recurrence_pattern` (text): Pattern for recurring challenges
    - `participant_count` (integer): Current number of participants

  2. Changes
    - Add default values for new fields
    - Add constraints for data integrity
    - Update existing challenges with default values

  3. Notes
    - All changes are non-destructive
    - Existing data is preserved
*/

DO $$ 
BEGIN
  -- Add rules column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'rules'
  ) THEN
    ALTER TABLE challenges ADD COLUMN rules text NOT NULL DEFAULT '';
  END IF;

  -- Add rewards column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'rewards'
  ) THEN
    ALTER TABLE challenges ADD COLUMN rewards text NOT NULL DEFAULT '';
  END IF;

  -- Add participant_limit column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'participant_limit'
  ) THEN
    ALTER TABLE challenges ADD COLUMN participant_limit integer NOT NULL DEFAULT 0;
  END IF;

  -- Add timezone column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'timezone'
  ) THEN
    ALTER TABLE challenges ADD COLUMN timezone text NOT NULL DEFAULT 'UTC';
  END IF;

  -- Add is_recurring column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'is_recurring'
  ) THEN
    ALTER TABLE challenges ADD COLUMN is_recurring boolean NOT NULL DEFAULT false;
  END IF;

  -- Add recurrence_pattern column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'recurrence_pattern'
  ) THEN
    ALTER TABLE challenges ADD COLUMN recurrence_pattern text;
  END IF;

  -- Add participant_count column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'participant_count'
  ) THEN
    ALTER TABLE challenges ADD COLUMN participant_count integer NOT NULL DEFAULT 0;
  END IF;

END $$;
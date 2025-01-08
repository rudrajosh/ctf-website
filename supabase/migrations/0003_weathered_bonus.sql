/*
  # Add timing fields to challenges table

  1. Changes
    - Add start_time and end_time columns to challenges table
    - Update existing challenges with default times
*/

DO $$ 
BEGIN
  -- Add start_time and end_time columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'start_time'
  ) THEN
    ALTER TABLE challenges ADD COLUMN start_time timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenges' AND column_name = 'end_time'
  ) THEN
    ALTER TABLE challenges ADD COLUMN end_time timestamptz DEFAULT (now() + interval '24 hours');
  END IF;
END $$;
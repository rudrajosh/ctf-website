/*
  # Initial Schema Setup for CTF Competition

  1. New Tables
    - teams
      - id (uuid, primary key)
      - team_name (text)
      - team_lead (text)
      - team_members (text)
      - password (text)
      - team_id (text, unique)
      - score (integer)
      - created_at (timestamp)
    
    - challenges
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - points (integer)
      - created_at (timestamp)
    
    - solved_challenges
      - id (uuid, primary key)
      - team_id (uuid, references teams)
      - challenge_id (uuid, references challenges)
      - solved_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Teams table
CREATE TABLE teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  team_lead text NOT NULL,
  team_members text NOT NULL,
  password text NOT NULL,
  team_id text UNIQUE NOT NULL,
  score integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Challenges table
CREATE TABLE challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  points integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Solved challenges table
CREATE TABLE solved_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams ON DELETE CASCADE,
  challenge_id uuid REFERENCES challenges ON DELETE CASCADE,
  solved_at timestamptz DEFAULT now(),
  UNIQUE(team_id, challenge_id)
);

-- Enable RLS
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE solved_challenges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can create teams" ON teams FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read teams" ON teams FOR SELECT TO public USING (true);
CREATE POLICY "Teams can update their own data" ON teams FOR UPDATE USING (auth.uid()::text = team_id);

CREATE POLICY "Anyone can read challenges" ON challenges FOR SELECT TO public USING (true);

CREATE POLICY "Teams can mark challenges as solved" ON solved_challenges FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read solved challenges" ON solved_challenges FOR SELECT TO public USING (true);

-- Insert initial challenges
INSERT INTO challenges (title, description, points) VALUES
('Web Exploitation', 'Find and exploit vulnerabilities in a web application', 100),
('Cryptography', 'Decrypt the hidden message using various cryptographic techniques', 150),
('Reverse Engineering', 'Analyze and understand the binary to find the flag', 200),
('Forensics', 'Investigate the digital evidence to uncover the hidden flag', 250);
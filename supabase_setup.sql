-- Sunland News Lead Generation Funnel Database Setup
-- Run this in your Supabase SQL Editor

-- Migration: Add new columns if they don't exist (for existing databases)
ALTER TABLE quiz_responses 
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  DROP COLUMN IF EXISTS q4_timing,
  ADD COLUMN IF NOT EXISTS q4_sms TEXT;

-- Create signups table for email captures
CREATE TABLE IF NOT EXISTS signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_responses table for quiz data
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  signup_id UUID REFERENCES signups(id) ON DELETE CASCADE,
  email TEXT,
  q1_interest TEXT,
  q2_lived TEXT, 
  q3_value TEXT,
  q4_sms TEXT,
  q5_support TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_signup_id ON quiz_responses(signup_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_support ON quiz_responses(q5_support);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_sms ON quiz_responses(q4_sms);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_interest ON quiz_responses(q1_interest);

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public signup form)
CREATE POLICY "Allow public signups" ON signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public quiz responses" ON quiz_responses  
  FOR INSERT WITH CHECK (true);

-- Optional: Create policies for reading data (for analytics/admin)
CREATE POLICY "Allow reading signups for service role" ON signups
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Allow reading quiz responses for service role" ON quiz_responses
  FOR SELECT USING (auth.role() = 'service_role');

-- Insert some sample data for testing (optional)
-- You can remove this section if you don't want test data
/*
INSERT INTO signups (email) VALUES 
  ('test1@example.com'),
  ('test2@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO quiz_responses (signup_id, email, q1_interest, q2_lived, q3_value, q4_sms, q5_support, phone_number)
SELECT 
  id, 
  email,
  '🍽️ Local food & hidden gems',
  'Born & raised', 
  'Help me find places I wouldn''t know about',
  'Yes, that sounds helpful',
  'Yes, show me how',
  '(772) 555-0123'
FROM signups 
WHERE email = 'test1@example.com'
ON CONFLICT DO NOTHING;
*/ 
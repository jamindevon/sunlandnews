-- Simple Migration for Existing Database
-- This just updates your quiz_responses table for the new questions

-- Add new columns if they don't exist
ALTER TABLE quiz_responses 
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS q4_sms TEXT;

-- Remove old column if it exists  
ALTER TABLE quiz_responses DROP COLUMN IF EXISTS q4_timing;

-- Add new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_sms ON quiz_responses(q4_sms);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_interest ON quiz_responses(q1_interest);

-- That's it! Your database is now ready for the new quiz questions. 
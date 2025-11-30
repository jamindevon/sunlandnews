-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  stripe_customer_id VARCHAR(255),
  stripe_payment_id VARCHAR(255),
  calendar_token VARCHAR(50) UNIQUE NOT NULL,
  subscription_status VARCHAR(20) DEFAULT 'active', -- active, expired, cancelled
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  interests JSONB, -- ["food", "music", "arts", "outdoors", "family", "nightlife", "sports", "civic"]
  availability JSONB, -- ["weekday_mornings", "weekday_evenings", "weekend_days", "weekend_nights"]
  location_preference VARCHAR(50), -- "fort_pierce", "psl_fp", "all_slc", "treasure_coast"
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_datetime TIMESTAMP NOT NULL,
  end_datetime TIMESTAMP NOT NULL,
  location_name VARCHAR(255),
  location_address VARCHAR(500),
  location_city VARCHAR(100),
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  categories JSONB, -- ["food", "music", etc.]
  price VARCHAR(50), -- "Free", "$5", "$20-30", etc.
  url VARCHAR(500),
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule VARCHAR(255), -- RRULE format if recurring
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Magic links table (for passwordless updates)
CREATE TABLE IF NOT EXISTS magic_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(100) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE magic_links ENABLE ROW LEVEL SECURITY;

-- Allow public read access to events (for calendar feed)
CREATE POLICY "Public events are viewable by everyone" 
ON events FOR SELECT 
USING (is_published = true);

-- Allow service role (backend) to do everything
-- Note: You'll use the service role key in your Next.js API routes

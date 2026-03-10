-- ======================================
-- AKT Construction — Supabase Setup
-- Run this in Supabase SQL Editor
-- ======================================

-- 1. Create the portfolio_images table
CREATE TABLE IF NOT EXISTS portfolio_images (
  id          BIGSERIAL PRIMARY KEY,
  url         TEXT NOT NULL,
  caption     TEXT DEFAULT '',
  project_type TEXT DEFAULT 'Other',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

-- 3. Anyone can read portfolio images (public gallery)
CREATE POLICY "Public can read portfolio images"
  ON portfolio_images
  FOR SELECT
  TO anon
  USING (true);

-- 4. Only authenticated users (admin) can insert images
CREATE POLICY "Authenticated users can insert portfolio images"
  ON portfolio_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Only authenticated users can delete images
CREATE POLICY "Authenticated users can delete portfolio images"
  ON portfolio_images
  FOR DELETE
  TO authenticated
  USING (true);

-- ======================================
-- CONTACT LEADS TABLE
-- ======================================

-- 6. Create contact_leads table to store quote requests
CREATE TABLE IF NOT EXISTS contact_leads (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT DEFAULT '',
  phone        TEXT NOT NULL,
  email        TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  message      TEXT DEFAULT '',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Enable RLS on contact_leads
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- 8. Anyone can submit a lead (website visitors)
CREATE POLICY "Anyone can submit a contact lead"
  ON contact_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 9. Only authenticated users (admin) can read leads
CREATE POLICY "Authenticated users can read contact leads"
  ON contact_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- ======================================
-- STORAGE BUCKET SETUP
-- ======================================
-- 1. Go to Storage > New Bucket in Supabase dashboard
-- 2. Name: "portfolio"
-- 3. Check "Public bucket" (images need to be publicly viewable)
-- 4. Save
--
-- Then run these storage policies:

-- Allow authenticated users to upload images
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Authenticated users can upload portfolio images',
  'portfolio',
  '{"operation": "INSERT", "role": "authenticated"}'
);

-- Allow public to view images
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Public can view portfolio images',
  'portfolio',
  '{"operation": "SELECT", "role": "anon"}'
);

-- Allow authenticated users to delete images
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Authenticated users can delete portfolio images',
  'portfolio',
  '{"operation": "DELETE", "role": "authenticated"}'
);

-- ======================================
-- ADMIN USER SETUP
-- ======================================
-- After running this SQL, create your admin user in Supabase:
-- 1. Go to Authentication > Users in Supabase dashboard
-- 2. Click "Add user"
-- 3. Enter your email and a strong password
-- 4. That email + password is what you use to log into the admin panel
-- 5. Never share these credentials or commit them to code

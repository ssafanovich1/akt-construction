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

-- 3. Allow public read access (anyone can view the portfolio)
CREATE POLICY "Public can read portfolio images"
  ON portfolio_images
  FOR SELECT
  TO anon
  USING (true);

-- 4. Allow inserts with anon key (admin panel uses password-gating in the frontend)
CREATE POLICY "Anon can insert portfolio images"
  ON portfolio_images
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Allow deletes with anon key
CREATE POLICY "Anon can delete portfolio images"
  ON portfolio_images
  FOR DELETE
  TO anon
  USING (true);

-- ======================================
-- OPTIONAL: Storage bucket for file uploads
-- ======================================
-- If you want Anton to upload images directly (instead of just pasting URLs),
-- create a public storage bucket named "portfolio" in the Supabase dashboard:
--
-- 1. Go to Storage > New Bucket
-- 2. Name: "portfolio"
-- 3. Check "Public bucket"
-- 4. Save
--
-- Then add this policy to allow uploads:
-- INSERT INTO storage.policies (name, bucket_id, definition)
-- VALUES ('Allow public uploads', 'portfolio', '{"operation": "INSERT", "role": "anon"}');

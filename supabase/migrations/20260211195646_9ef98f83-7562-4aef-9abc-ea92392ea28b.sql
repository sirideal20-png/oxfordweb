
-- Add new columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS mother_name text DEFAULT '',
  ADD COLUMN IF NOT EXISTS gender text DEFAULT '',
  ADD COLUMN IF NOT EXISTS marital_status text DEFAULT '',
  ADD COLUMN IF NOT EXISTS children text DEFAULT '',
  ADD COLUMN IF NOT EXISTS last_qualification text DEFAULT '',
  ADD COLUMN IF NOT EXISTS postal_code text DEFAULT '',
  ADD COLUMN IF NOT EXISTS country text DEFAULT '',
  ADD COLUMN IF NOT EXISTS blood_group text DEFAULT '',
  ADD COLUMN IF NOT EXISTS religion text DEFAULT '',
  ADD COLUMN IF NOT EXISTS profile_picture_url text DEFAULT '';

-- Add same columns to deleted_profiles for archival
ALTER TABLE public.deleted_profiles
  ADD COLUMN IF NOT EXISTS mother_name text DEFAULT '',
  ADD COLUMN IF NOT EXISTS gender text DEFAULT '',
  ADD COLUMN IF NOT EXISTS marital_status text DEFAULT '',
  ADD COLUMN IF NOT EXISTS children text DEFAULT '',
  ADD COLUMN IF NOT EXISTS last_qualification text DEFAULT '',
  ADD COLUMN IF NOT EXISTS postal_code text DEFAULT '',
  ADD COLUMN IF NOT EXISTS country text DEFAULT '',
  ADD COLUMN IF NOT EXISTS blood_group text DEFAULT '',
  ADD COLUMN IF NOT EXISTS religion text DEFAULT '',
  ADD COLUMN IF NOT EXISTS profile_picture_url text DEFAULT '';

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own profile pictures
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to update their own profile picture
CREATE POLICY "Users can update own profile picture"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access to profile pictures
CREATE POLICY "Profile pictures are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

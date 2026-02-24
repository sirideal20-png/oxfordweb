
-- Create recycle bin table to preserve deleted student records
CREATE TABLE public.deleted_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_user_id uuid NOT NULL,
  email text NOT NULL,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  phone text,
  father_name text,
  date_of_birth date,
  passport_number text,
  nationality text,
  address text,
  deleted_at timestamp with time zone NOT NULL DEFAULT now(),
  deleted_by uuid,
  original_created_at timestamp with time zone
);

ALTER TABLE public.deleted_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access deleted_profiles"
ON public.deleted_profiles
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

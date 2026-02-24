
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS father_name text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_number text DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS nationality text DEFAULT '';

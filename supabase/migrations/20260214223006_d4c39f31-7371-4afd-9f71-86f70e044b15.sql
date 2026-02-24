
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- 2. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  phone TEXT DEFAULT '',
  passport_number TEXT DEFAULT '',
  date_of_birth DATE,
  nationality TEXT DEFAULT '',
  father_name TEXT DEFAULT '',
  mother_name TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  marital_status TEXT DEFAULT '',
  children TEXT DEFAULT '',
  last_qualification TEXT DEFAULT '',
  postal_code TEXT DEFAULT '',
  country TEXT DEFAULT '',
  blood_group TEXT DEFAULT '',
  religion TEXT DEFAULT '',
  address TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- 4. Applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_name TEXT NOT NULL,
  program_type TEXT NOT NULL DEFAULT 'bachelor',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'waitlisted')),
  admin_notes TEXT DEFAULT '',
  personal_statement TEXT DEFAULT '',
  documents_submitted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Student queries table
CREATE TABLE public.student_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  admin_response TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Deleted profiles table
CREATE TABLE public.deleted_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_user_id UUID NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  deleted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Profile update requests table
CREATE TABLE public.profile_update_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  requested_changes JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT DEFAULT '',
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deleted_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_update_requests ENABLE ROW LEVEL SECURITY;

-- 10. Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 11. RLS Policies

-- Profiles
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- User roles
CREATE POLICY "Admin full access roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users read own role" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Applications
CREATE POLICY "Admin full access applications" ON public.applications FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students create applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Student queries
CREATE POLICY "Admin full access queries" ON public.student_queries FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own queries" ON public.student_queries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students create queries" ON public.student_queries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Announcements
CREATE POLICY "Anyone can read announcements" ON public.announcements FOR SELECT USING (published = true);
CREATE POLICY "Admin full access announcements" ON public.announcements FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Deleted profiles
CREATE POLICY "Admin full access deleted_profiles" ON public.deleted_profiles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profile update requests
CREATE POLICY "Users read own update requests" ON public.profile_update_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create update requests" ON public.profile_update_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin full access update requests" ON public.profile_update_requests FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- 12. Trigger function for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, phone, passport_number, date_of_birth, nationality, father_name, mother_name, gender, marital_status, children, last_qualification, postal_code, country, blood_group, religion, address)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'passport_number', ''),
    CASE WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL THEN (NEW.raw_user_meta_data->>'date_of_birth')::date ELSE NULL END,
    COALESCE(NEW.raw_user_meta_data->>'nationality', ''),
    COALESCE(NEW.raw_user_meta_data->>'father_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'mother_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'gender', ''),
    COALESCE(NEW.raw_user_meta_data->>'marital_status', ''),
    COALESCE(NEW.raw_user_meta_data->>'children', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_qualification', ''),
    COALESCE(NEW.raw_user_meta_data->>'postal_code', ''),
    COALESCE(NEW.raw_user_meta_data->>'country', ''),
    COALESCE(NEW.raw_user_meta_data->>'blood_group', ''),
    COALESCE(NEW.raw_user_meta_data->>'religion', ''),
    COALESCE(NEW.raw_user_meta_data->>'address', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 13. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_queries_updated_at BEFORE UPDATE ON public.student_queries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profile_update_requests_updated_at BEFORE UPDATE ON public.profile_update_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 14. Duplicate applicant check function
CREATE OR REPLACE FUNCTION public.check_duplicate_applicant(_passport_number text DEFAULT NULL, _date_of_birth date DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object('exists', true)
  INTO result
  FROM profiles
  WHERE (passport_number = _passport_number AND _passport_number IS NOT NULL)
     OR (date_of_birth = _date_of_birth AND _date_of_birth IS NOT NULL)
  LIMIT 1;
  
  IF result IS NULL THEN
    result := json_build_object('exists', false);
  END IF;
  
  RETURN result;
END;
$$;

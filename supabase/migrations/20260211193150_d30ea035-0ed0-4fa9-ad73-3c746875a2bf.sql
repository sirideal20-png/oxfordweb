
-- Function to check if an applicant with same passport_number or date_of_birth already exists
-- Callable by anon users during signup
CREATE OR REPLACE FUNCTION public.check_duplicate_applicant(
  _passport_number text DEFAULT NULL,
  _date_of_birth date DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result json;
  passport_exists boolean := false;
  dob_exists boolean := false;
  existing_email text := null;
BEGIN
  IF _passport_number IS NOT NULL AND _passport_number != '' THEN
    SELECT true, p.email INTO passport_exists, existing_email
    FROM profiles p
    WHERE p.passport_number = _passport_number
    LIMIT 1;
  END IF;

  IF _date_of_birth IS NOT NULL AND NOT passport_exists THEN
    SELECT true, p.email INTO dob_exists, existing_email
    FROM profiles p
    WHERE p.date_of_birth = _date_of_birth AND p.passport_number = _passport_number
    LIMIT 1;
  END IF;

  result := json_build_object(
    'duplicate', passport_exists OR dob_exists,
    'reason', CASE
      WHEN passport_exists THEN 'passport'
      WHEN dob_exists THEN 'passport_and_dob'
      ELSE null
    END,
    'masked_email', CASE
      WHEN existing_email IS NOT NULL THEN
        CONCAT(LEFT(existing_email, 2), '***@', SPLIT_PART(existing_email, '@', 2))
      ELSE null
    END
  );

  RETURN result;
END;
$$;

-- Update handle_new_user trigger to save phone, passport_number, date_of_birth, nationality, father_name from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, phone, passport_number, date_of_birth, nationality, father_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'passport_number', ''),
    CASE WHEN NEW.raw_user_meta_data->>'date_of_birth' IS NOT NULL AND NEW.raw_user_meta_data->>'date_of_birth' != '' 
         THEN (NEW.raw_user_meta_data->>'date_of_birth')::date 
         ELSE NULL END,
    COALESCE(NEW.raw_user_meta_data->>'nationality', ''),
    COALESCE(NEW.raw_user_meta_data->>'father_name', '')
  );
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$$;

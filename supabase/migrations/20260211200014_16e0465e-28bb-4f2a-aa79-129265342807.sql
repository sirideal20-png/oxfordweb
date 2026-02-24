
-- Update handle_new_user to capture new profile fields from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, phone, passport_number, date_of_birth, nationality, father_name, mother_name, gender, marital_status, children, last_qualification, postal_code, country, blood_group, religion, address)
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
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  RETURN NEW;
END;
$function$;


-- Fix 1: Remove masked email from check_duplicate_applicant to prevent user enumeration
CREATE OR REPLACE FUNCTION public.check_duplicate_applicant(_passport_number text DEFAULT NULL::text, _date_of_birth date DEFAULT NULL::date)
 RETURNS json
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result json;
  passport_exists boolean := false;
  dob_exists boolean := false;
BEGIN
  IF _passport_number IS NOT NULL AND _passport_number != '' THEN
    SELECT true INTO passport_exists
    FROM profiles p
    WHERE p.passport_number = _passport_number
    LIMIT 1;
  END IF;

  IF _date_of_birth IS NOT NULL AND NOT passport_exists THEN
    SELECT true INTO dob_exists
    FROM profiles p
    WHERE p.date_of_birth = _date_of_birth AND p.passport_number = _passport_number
    LIMIT 1;
  END IF;

  result := json_build_object(
    'duplicate', COALESCE(passport_exists, false) OR COALESCE(dob_exists, false),
    'reason', CASE
      WHEN passport_exists THEN 'passport'
      WHEN dob_exists THEN 'passport_and_dob'
      ELSE null
    END
  );

  RETURN result;
END;
$function$;

-- Fix 2: Make profile-pictures bucket private
UPDATE storage.buckets SET public = false WHERE id = 'profile-pictures';

-- Drop the old public SELECT policy
DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;

-- Create authenticated-only SELECT policy
CREATE POLICY "Authenticated users can view profile pictures"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures' AND auth.role() = 'authenticated');

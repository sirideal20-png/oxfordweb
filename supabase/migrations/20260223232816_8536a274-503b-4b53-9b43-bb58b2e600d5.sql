
-- Add ticket_number column
ALTER TABLE public.support_requests 
ADD COLUMN ticket_number TEXT UNIQUE;

-- Create sequence for ticket numbers
CREATE SEQUENCE IF NOT EXISTS public.support_ticket_seq START WITH 1;

-- Create function to auto-generate ticket number
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.ticket_number := 'OSCT-' || LPAD(nextval('public.support_ticket_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER set_ticket_number
BEFORE INSERT ON public.support_requests
FOR EACH ROW
WHEN (NEW.ticket_number IS NULL)
EXECUTE FUNCTION public.generate_ticket_number();

-- Drop the old restrictive SELECT policy and replace with a broader one
DROP POLICY IF EXISTS "Users read own support requests" ON public.support_requests;

-- Users can read own requests OR anyone can lookup by ticket number
CREATE POLICY "Users read own or lookup by ticket"
ON public.support_requests
FOR SELECT
USING (
  auth.uid() = user_id 
  OR ticket_number IS NOT NULL
);

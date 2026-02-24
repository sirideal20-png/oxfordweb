
-- Create profile update requests table
CREATE TABLE public.profile_update_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  requested_changes JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT DEFAULT '',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profile_update_requests ENABLE ROW LEVEL SECURITY;

-- Students can create their own requests
CREATE POLICY "Students create own update requests"
ON public.profile_update_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Students can read their own requests
CREATE POLICY "Students read own update requests"
ON public.profile_update_requests
FOR SELECT
USING (auth.uid() = user_id);

-- Admin full access
CREATE POLICY "Admin full access update requests"
ON public.profile_update_requests
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_profile_update_requests_updated_at
BEFORE UPDATE ON public.profile_update_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();


-- Add profile_picture_url to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_picture_url text DEFAULT '';

-- Create academic_records table
CREATE TABLE public.academic_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_name TEXT NOT NULL DEFAULT '',
  course_code TEXT DEFAULT '',
  grade TEXT DEFAULT '',
  credits NUMERIC DEFAULT 0,
  academic_year TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.academic_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access academic_records" ON public.academic_records FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own academic_records" ON public.academic_records FOR SELECT USING (auth.uid() = user_id);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_name TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access attendance" ON public.attendance FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own attendance" ON public.attendance FOR SELECT USING (auth.uid() = user_id);

-- Create fee_payments table
CREATE TABLE public.fee_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  amount NUMERIC DEFAULT 0,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access fee_payments" ON public.fee_payments FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Students read own fee_payments" ON public.fee_payments FOR SELECT USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_academic_records_updated_at BEFORE UPDATE ON public.academic_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON public.fee_payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

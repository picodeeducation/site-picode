CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  school TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can read contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.role() = 'service_role');

CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
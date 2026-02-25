-- Create feedback table for two-way communication
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  student_email TEXT,
  recipient TEXT NOT NULL DEFAULT 'professor',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow public read/write (mock auth - no real user system)
CREATE POLICY "Anyone can read feedback" ON public.feedback FOR SELECT USING (true);
CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update feedback" ON public.feedback FOR UPDATE USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
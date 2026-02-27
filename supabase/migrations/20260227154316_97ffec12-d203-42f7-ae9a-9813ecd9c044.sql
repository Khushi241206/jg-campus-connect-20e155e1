
-- Drop the restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Anyone can insert feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can update feedback" ON public.feedback;

CREATE POLICY "Anyone can insert feedback" ON public.feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read feedback" ON public.feedback FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can update feedback" ON public.feedback FOR UPDATE TO anon, authenticated USING (true);

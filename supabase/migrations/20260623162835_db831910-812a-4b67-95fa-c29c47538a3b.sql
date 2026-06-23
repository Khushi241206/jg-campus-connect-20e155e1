CREATE POLICY "Students upload own submissions"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'assignment-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Students read own submissions"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'assignment-submissions' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin')));

CREATE POLICY "Students update own submissions"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'assignment-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Students delete own submissions"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'assignment-submissions' AND (storage.foldername(name))[1] = auth.uid()::text);
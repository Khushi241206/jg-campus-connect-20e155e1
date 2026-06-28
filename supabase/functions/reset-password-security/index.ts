import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email, enrollment_number, date_of_birth, new_password } = await req.json();

    if (!email || !enrollment_number || !date_of_birth || !new_password) {
      return json({ error: 'All fields are required.' }, 400);
    }
    if (typeof new_password !== 'string' || new_password.length < 6) {
      return json({ error: 'Password must be at least 6 characters.' }, 400);
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: profile, error: pErr } = await admin
      .from('profiles')
      .select('id, email, enrollment_number, date_of_birth')
      .ilike('email', email.trim())
      .maybeSingle();

    if (pErr) return json({ error: 'Lookup failed.' }, 500);
    if (!profile) return json({ error: 'No account matches those details.' }, 404);

    const enrollMatch =
      (profile.enrollment_number ?? '').trim().toLowerCase() ===
      String(enrollment_number).trim().toLowerCase();
    const dobMatch = (profile.date_of_birth ?? '') === date_of_birth;

    if (!enrollMatch || !dobMatch) {
      return json({ error: 'No account matches those details.' }, 404);
    }

    const { error: uErr } = await admin.auth.admin.updateUserById(profile.id, {
      password: new_password,
    });
    if (uErr) return json({ error: uErr.message }, 500);

    return json({ success: true });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

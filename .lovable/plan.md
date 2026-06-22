
## Goal

Replace the mock `AuthContext` and local/mock data with real Lovable Cloud auth (email/password + Google), a profiles table, server-side role checks, and database-backed modules with RLS so students only see their own data and admins manage everything.

## Database (single migration)

Tables in `public` (all with RLS + GRANTs + `updated_at` trigger where useful):

1. `profiles` — one row per `auth.users.id`
   - `full_name`, `enrollment_number` (unique), `program`, `semester`, `division`, `phone`, `date_of_birth`, `guardian_name`, `email`
2. `user_roles` — enum `app_role` = `'student' | 'admin'`, unique `(user_id, role)`
3. `attendance` — `student_id`, `subject`, `date`, `status` (`present`/`absent`/`late`), `marked_by`
4. `assignments` — `title`, `subject`, `description`, `due_date`, `posted_by`, `attachment_url`
5. `assignment_submissions` — `assignment_id`, `student_id`, `content`, `submitted_at`, `grade`
6. `notices` — `title`, `body`, `category`, `posted_by`, `pinned`
7. `events` — `title`, `description`, `event_date`, `location`, `capacity`, `created_by`
8. `event_registrations` — `event_id`, `student_id`, unique `(event_id, student_id)`
9. `fee_records` — `student_id`, `semester`, `amount_total`, `amount_paid`, `due_date`, `status`
10. `feedback` (already exists) — add `student_id` FK, tighten policies

Security helper:
- `public.has_role(_user_id uuid, _role app_role)` — SECURITY DEFINER, used in RLS to avoid recursion.

Profile auto-creation:
- Trigger on `auth.users` insert → create `profiles` row from raw user meta + assign default `'student'` role.

### RLS pattern

- **profiles**: student can SELECT/UPDATE own row; admin full access via `has_role`.
- **user_roles**: student can SELECT own roles; only admin can INSERT/UPDATE/DELETE.
- **attendance, fee_records, assignment_submissions, event_registrations**: student SELECT/(INSERT for registrations & submissions) own rows; admin full access.
- **assignments, notices, events**: any authenticated user SELECT; admin INSERT/UPDATE/DELETE.
- **feedback**: student INSERT/SELECT own; admin SELECT/UPDATE all.

Every public table gets `GRANT SELECT, INSERT, UPDATE, DELETE … TO authenticated; GRANT ALL … TO service_role;` (no anon).

## Auth

- Enable Google via `configure_social_auth` (managed credentials, no setup needed from user).
- New `AuthContext`: subscribes to `onAuthStateChange`, exposes `user`, `session`, `profile`, `role`, `signIn`, `signUpStudent`, `signInWithGoogle`, `signOut`. Uses `getSession()` for token, `getUser()` where trust matters.
- Replace `src/pages/Login.tsx` with tabs: **Login** / **Register**.
  - Register collects the 8 profile fields, calls `supabase.auth.signUp` with `options.data` carrying them and `emailRedirectTo: window.location.origin`. The trigger writes the profile.
  - Login uses email+password and a "Continue with Google" button (`lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`).
- `ProtectedRoute` checks session; new `AdminRoute` checks `role === 'admin'` (read from DB, not localStorage).
- Add `/admin` section routes (dashboard + management screens for notices, events, assignments, attendance, fees).

## Module migration (client code)

For each module page, swap mock arrays for `supabase.from(...)` queries scoped via RLS. Add admin "manage" UIs gated by `AdminRoute`:

- **Attendance** — student: list own records grouped by subject + % calculation. Admin: bulk mark attendance per class/date.
- **Assignments** — student: list + submit. Admin: create/edit/delete + view submissions.
- **Notices** — list for all; admin CRUD.
- **Events** — list for all; student can register/unregister; admin CRUD + view registrations.
- **Fees** — student: own fee records + payment status. Admin: create/update records.
- **Feedback** — already DB-backed; tighten to authenticated student inserts tied to `student_id`, admin responds.

`Profile` page reads from `profiles` and lets the student update editable fields.

Things intentionally left as mock for scope: Timetable, Exams, Results, Academics pages (not in your migrate list). Tell me if you want those moved too.

## Files

**New**
- `src/contexts/AuthContext.tsx` (rewrite)
- `src/components/AdminRoute.tsx`
- `src/components/auth/RegisterForm.tsx`, `LoginForm.tsx`
- `src/pages/admin/AdminDashboard.tsx`, `ManageNotices.tsx`, `ManageEvents.tsx`, `ManageAssignments.tsx`, `ManageAttendance.tsx`, `ManageFees.tsx`
- `src/hooks/useProfile.ts`, `src/hooks/useRole.ts`

**Edited**
- `src/pages/Login.tsx` (tabs), `App.tsx` (routes + admin section), `DashboardLayout.tsx` (real user/avatar, admin nav), `AppSidebar.tsx`, `MobileBottomNav.tsx`, `Profile.tsx`, `Attendance.tsx`, `Assignments.tsx`, `Notices.tsx`, `Events.tsx`, `Fees.tsx`, `Feedback.tsx`.

## Order of operations

1. Run the SQL migration (your approval required).
2. Enable Google provider.
3. Rewrite AuthContext + Login/Register + route guards.
4. Migrate each module page + add admin counterparts.
5. Seed: first signed-up admin must be promoted manually — I'll include a one-liner SQL snippet for you to run after registering your admin account.

## Notes / open question

- **Seeding the first admin**: there's no secure way to self-assign admin from the client. Easiest path is: you register normally, then I give you a tiny SQL to set your role to `admin`. OK with that?
- Existing `feedback` table will be altered (add `student_id`, swap permissive policies for student/admin scoped ones). Existing rows without a `student_id` will be left NULL and visible to admins only.

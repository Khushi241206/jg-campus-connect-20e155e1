import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, ShieldCheck, Palette, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTheme, type ThemeName } from "@/contexts/ThemeContext";

const THEMES: { id: ThemeName; label: string; swatches: string[] }[] = [
  { id: "elegant-light", label: "Elegant Light", swatches: ["#f8fafc", "#e2e8f0", "#0f172a"] },
  { id: "dark-academic", label: "Dark Academic", swatches: ["#1a1410", "#2d2218", "#d4a574"] },
  { id: "modern-blue", label: "Modern Blue", swatches: ["#eff6ff", "#3b82f6", "#1e3a8a"] },
  { id: "calm-mint", label: "Calm Mint", swatches: ["#ecfdf5", "#10b981", "#064e3b"] },
];

const Profile = () => {
  const { profile, user, isAdmin, refreshProfile, signOut } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    enrollment_number: "",
    program: "",
    semester: "",
    division: "",
    phone: "",
    date_of_birth: "",
    guardian_name: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        enrollment_number: profile.enrollment_number ?? "",
        program: profile.program ?? "",
        semester: profile.semester ?? "",
        division: profile.division ?? "",
        phone: profile.phone ?? "",
        date_of_birth: profile.date_of_birth ?? "",
        guardian_name: profile.guardian_name ?? "",
      });
    }
  }, [profile]);

  if (!profile) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(form).eq("id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    await refreshProfile();
    toast({ title: "Profile updated" });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
        {isAdmin && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> Admin
          </span>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
        <Field label="Full Name" v={form.full_name} on={(v) => setForm({ ...form, full_name: v })} />
        <Field label="Enrollment Number" v={form.enrollment_number} on={(v) => setForm({ ...form, enrollment_number: v })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Program" v={form.program} on={(v) => setForm({ ...form, program: v })} />
          <Field label="Semester" v={form.semester} on={(v) => setForm({ ...form, semester: v })} />
          <Field label="Division" v={form.division} on={(v) => setForm({ ...form, division: v })} />
          <Field label="Phone" v={form.phone} on={(v) => setForm({ ...form, phone: v })} />
          <Field label="Date of Birth" type="date" v={form.date_of_birth} on={(v) => setForm({ ...form, date_of_birth: v })} />
          <Field label="Guardian Name" v={form.guardian_name} on={(v) => setForm({ ...form, guardian_name: v })} />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
          <button onClick={() => signOut()} className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted">
            Sign out
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Appearance</h2>
        </div>
        <p className="text-xs text-muted-foreground">Choose a theme for your portal.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {THEMES.map((t) => {
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative text-left p-3 rounded-xl border transition-all ${active ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"}`}
              >
                <div className="flex gap-1 mb-2">
                  {t.swatches.map((c, i) => (
                    <span key={i} className="h-6 w-6 rounded-md border border-border/60" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.label}</span>
                  {active && <Check className="h-3.5 w-3.5 text-primary" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Field2 = ({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) => (
  <div>
    <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
    <input type={type} value={v} onChange={(e) => on(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
  </div>
);

export default Profile;

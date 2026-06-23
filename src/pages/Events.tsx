import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Users, Loader2, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface EventRow {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  capacity: number | null;
}

const Events = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // Registration form state
  const [formEvent, setFormEvent] = useState<EventRow | null>(null);
  const [form, setForm] = useState({ full_name: "", phone: "", enrollment_number: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: evs } = await supabase
      .from("events")
      .select("id, title, description, event_date, location, capacity")
      .order("event_date", { ascending: true });
    setEvents(evs ?? []);

    if (user) {
      const { data: regs } = await supabase
        .from("event_registrations")
        .select("event_id")
        .eq("student_id", user.id);
      setRegistered(new Set((regs ?? []).map((r) => r.event_id)));
    }

    if (evs?.length) {
      const map: Record<string, number> = {};
      for (const e of evs) {
        const { count } = await supabase
          .from("event_registrations")
          .select("*", { count: "exact", head: true })
          .eq("event_id", e.id);
        map[e.id] = count ?? 0;
      }
      setCounts(map);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const openForm = (e: EventRow) => {
    setForm({
      full_name: profile?.full_name ?? "",
      phone: profile?.phone ?? "",
      enrollment_number: profile?.enrollment_number ?? "",
      notes: "",
    });
    setFormEvent(e);
  };

  const unregister = async (eventId: string) => {
    if (!user) return;
    const { error } = await supabase.from("event_registrations").delete()
      .eq("event_id", eventId).eq("student_id", user.id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Unregistered" });
    load();
  };

  const submitRegistration = async () => {
    if (!user || !formEvent) return;
    if (!form.full_name.trim() || !form.phone.trim()) {
      return toast({ title: "Name and phone are required", variant: "destructive" });
    }
    setSubmitting(true);
    const { error } = await supabase.from("event_registrations").insert({
      event_id: formEvent.id,
      student_id: user.id,
      full_name: form.full_name,
      phone: form.phone,
      enrollment_number: form.enrollment_number || null,
      notes: form.notes || null,
    });
    setSubmitting(false);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Registered!", description: `You're in for ${formEvent.title}.` });
    setFormEvent(null);
    load();
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Events</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No events scheduled</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((e, i) => {
            const isReg = registered.has(e.id);
            return (
              <motion.div key={e.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-5 card-hover">
                <h3 className="font-semibold text-foreground text-base mb-1.5">{e.title}</h3>
                {e.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{e.description}</p>}
                <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{new Date(e.event_date).toLocaleString()}</div>
                  {e.location && <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{e.location}</div>}
                  <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{counts[e.id] ?? 0}{e.capacity ? ` / ${e.capacity}` : ""} registered</div>
                </div>
                <button
                  onClick={() => isReg ? unregister(e.id) : openForm(e)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${isReg ? "bg-success/10 text-success border border-success/30" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                  {isReg ? <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" />Registered (click to cancel)</span> : "Register"}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {formEvent && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setFormEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">Register for Event</h2>
                  <p className="text-sm text-muted-foreground">{formEvent.title}</p>
                </div>
                <button onClick={() => setFormEvent(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>

              <div className="space-y-3">
                <Field label="Full Name *">
                  <input value={form.full_name} onChange={(ev) => setForm({ ...form, full_name: ev.target.value })} className={inputCls} />
                </Field>
                <Field label="Phone *">
                  <input value={form.phone} onChange={(ev) => setForm({ ...form, phone: ev.target.value })} className={inputCls} />
                </Field>
                <Field label="Enrollment Number">
                  <input value={form.enrollment_number} onChange={(ev) => setForm({ ...form, enrollment_number: ev.target.value })} className={inputCls} />
                </Field>
                <Field label="Notes (optional)">
                  <textarea rows={3} value={form.notes} onChange={(ev) => setForm({ ...form, notes: ev.target.value })} className={inputCls} placeholder="Any special requirements?" />
                </Field>
              </div>

              <div className="flex gap-2 mt-5">
                <button onClick={submitRegistration} disabled={submitting}
                  className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50">
                  {submitting ? "Registering…" : "Confirm Registration"}
                </button>
                <button onClick={() => setFormEvent(null)} className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const inputCls = "w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
    {children}
  </div>
);

export default Events;

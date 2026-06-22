import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, Loader2, Check } from "lucide-react";
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

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

    // Per-event counts (admin sees all; students see only own row, so count may be low — that's fine)
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

  const toggle = async (eventId: string) => {
    if (!user) return;
    if (registered.has(eventId)) {
      const { error } = await supabase.from("event_registrations").delete()
        .eq("event_id", eventId).eq("student_id", user.id);
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Unregistered" });
    } else {
      const { error } = await supabase.from("event_registrations").insert({ event_id: eventId, student_id: user.id });
      if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
      toast({ title: "Registered!" });
    }
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
                <button onClick={() => toggle(e.id)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${isReg ? "bg-success/10 text-success border border-success/30" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                  {isReg ? <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" />Registered</span> : "Register"}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Events;

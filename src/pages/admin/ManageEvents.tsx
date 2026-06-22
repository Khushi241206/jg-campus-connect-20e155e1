import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface E { id: string; title: string; description: string | null; event_date: string; location: string | null; capacity: number | null; }

const ManageEvents = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<E[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", event_date: "", location: "", capacity: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("events").select("*").order("event_date");
    setItems((data as E[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("events").insert({
      title: form.title,
      description: form.description || null,
      event_date: form.event_date,
      location: form.location || null,
      capacity: form.capacity ? Number(form.capacity) : null,
      created_by: user?.id,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Event created" });
    setForm({ title: "", description: "", event_date: "", location: "", capacity: "" });
    load();
  };
  const del = async (id: string) => { await supabase.from("events").delete().eq("id", id); load(); };

  return (
    <div className="space-y-4">
      <form onSubmit={create} className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">Create event</h3>
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
        <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inp} />
        <div className="grid grid-cols-2 gap-3">
          <input type="datetime-local" required value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className={inp} />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inp} />
        </div>
        <input type="number" placeholder="Capacity (optional)" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className={inp} />
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" />Create</button>
      </form>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div> :
        <div className="space-y-2">
          {items.map((e) => (
            <div key={e.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold">{e.title}</h4>
                <p className="text-xs text-muted-foreground">{new Date(e.event_date).toLocaleString()}{e.location ? ` • ${e.location}` : ""}</p>
              </div>
              <button onClick={() => del(e.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
const inp = "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
export default ManageEvents;

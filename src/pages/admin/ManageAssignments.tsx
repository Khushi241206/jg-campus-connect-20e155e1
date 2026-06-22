import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface A { id: string; title: string; subject: string; description: string | null; due_date: string | null; }

const ManageAssignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<A[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", subject: "", description: "", due_date: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("assignments").select("id, title, subject, description, due_date").order("due_date", { ascending: true, nullsFirst: false });
    setItems((data as A[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("assignments").insert({
      title: form.title, subject: form.subject, description: form.description || null,
      due_date: form.due_date || null, posted_by: user?.id,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Assignment posted" });
    setForm({ title: "", subject: "", description: "", due_date: "" });
    load();
  };
  const del = async (id: string) => { await supabase.from("assignments").delete().eq("id", id); load(); };

  return (
    <div className="space-y-4">
      <form onSubmit={create} className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">Post assignment</h3>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
          <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inp} />
        </div>
        <textarea placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inp} />
        <input type="datetime-local" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className={inp} />
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" />Post</button>
      </form>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div> :
        <div className="space-y-2">
          {items.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-xs text-muted-foreground">{a.subject}{a.due_date ? ` • Due ${new Date(a.due_date).toLocaleDateString()}` : ""}</p>
              </div>
              <button onClick={() => del(a.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
const inp = "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
export default ManageAssignments;

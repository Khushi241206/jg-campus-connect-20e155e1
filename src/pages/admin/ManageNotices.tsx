import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pin, PinOff, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Notice { id: string; title: string; body: string; category: string | null; pinned: boolean; created_at: string; }

const ManageNotices = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", body: "", category: "", pinned: false });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("notices").select("*").order("pinned", { ascending: false }).order("created_at", { ascending: false });
    setItems((data as Notice[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("notices").insert({ ...form, posted_by: user?.id });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Notice posted" });
    setForm({ title: "", body: "", category: "", pinned: false });
    load();
  };
  const del = async (id: string) => {
    await supabase.from("notices").delete().eq("id", id);
    load();
  };
  const togglePin = async (n: Notice) => {
    await supabase.from("notices").update({ pinned: !n.pinned }).eq("id", n.id);
    load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={create} className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">Post new notice</h3>
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inp} />
        <textarea required placeholder="Body" rows={3} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className={inp} />
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Category (optional)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inp} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} /> Pinned
          </label>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" />Post</button>
      </form>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div> :
        <div className="space-y-2">
          {items.map((n) => (
            <div key={n.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><h4 className="font-semibold">{n.title}</h4>{n.pinned && <Pin className="h-3.5 w-3.5 text-primary" />}</div>
                <p className="text-sm text-muted-foreground line-clamp-2">{n.body}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => togglePin(n)} className="p-2 rounded-lg hover:bg-muted">{n.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}</button>
                <button onClick={() => del(n.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

const inp = "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

export default ManageNotices;

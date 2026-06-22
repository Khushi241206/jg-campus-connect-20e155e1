import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

interface F {
  id: string; student_name: string; recipient: string; subject: string; message: string;
  response: string | null; status: string; created_at: string;
}

const ManageFeedback = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<F[]>([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    setItems((data as F[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const respond = async (id: string) => {
    const text = responses[id]?.trim();
    if (!text) return;
    const { error } = await supabase.from("feedback").update({
      response: text, status: "responded", responded_at: new Date().toISOString(),
    }).eq("id", id);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Response sent" });
    setResponses((r) => ({ ...r, [id]: "" }));
    load();
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-10">No feedback received.</p>}
      {items.map((f) => (
        <div key={f.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold">{f.subject}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-md ${f.status === "responded" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{f.status}</span>
          </div>
          <p className="text-xs text-muted-foreground">From: {f.student_name} • To: {f.recipient} • {new Date(f.created_at).toLocaleString()}</p>
          <p className="text-sm whitespace-pre-line">{f.message}</p>
          {f.response ? (
            <div className="p-2 rounded-lg bg-muted text-sm whitespace-pre-line"><span className="font-medium">Reply: </span>{f.response}</div>
          ) : (
            <div className="space-y-2 pt-1">
              <textarea rows={2} placeholder="Write a response…" value={responses[f.id] ?? ""}
                onChange={(e) => setResponses((r) => ({ ...r, [f.id]: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button onClick={() => respond(f.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageFeedback;

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FileText, Loader2, Upload, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string | null;
  due_date: string | null;
}

const Assignments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, { id: string; grade: string | null }>>({});
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: a } = await supabase
      .from("assignments")
      .select("id, title, subject, description, due_date")
      .order("due_date", { ascending: true, nullsFirst: false });
    setItems(a ?? []);
    if (user) {
      const { data: s } = await supabase
        .from("assignment_submissions")
        .select("id, assignment_id, grade")
        .eq("student_id", user.id);
      const map: Record<string, { id: string; grade: string | null }> = {};
      (s ?? []).forEach((x) => { map[x.assignment_id] = { id: x.id, grade: x.grade }; });
      setSubmissions(map);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const submit = async (assignmentId: string) => {
    if (!user) return;
    if (!file && !content.trim()) {
      return toast({ title: "Add a file or note", variant: "destructive" });
    }
    setSubmitting(true);
    let attachment_url: string | null = null;
    if (file) {
      const path = `${user.id}/${assignmentId}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("assignment-submissions").upload(path, file);
      if (upErr) {
        setSubmitting(false);
        return toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      }
      attachment_url = path;
    }
    const { error } = await supabase.from("assignment_submissions").insert({
      assignment_id: assignmentId,
      student_id: user.id,
      content: content.trim() || null,
      attachment_url,
    });
    setSubmitting(false);
    if (error) return toast({ title: "Submit failed", description: error.message, variant: "destructive" });
    toast({ title: "Submitted!", description: file ? `Uploaded ${file.name}` : "Your work was recorded." });
    setOpenId(null);
    setContent("");
    setFile(null);
    load();
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Assignments</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No assignments yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a, i) => {
            const sub = submissions[a.id];
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-card border border-border rounded-xl p-4 md:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.subject}{a.due_date ? ` • Due ${new Date(a.due_date).toLocaleDateString()}` : ""}</p>
                  </div>
                  {sub ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-success/10 text-success border border-success/30">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {sub.grade ? `Graded: ${sub.grade}` : "Submitted"}
                    </span>
                  ) : null}
                </div>
                {a.description && <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">{a.description}</p>}

                {!sub && (
                  openId === a.id ? (
                    <div className="space-y-2">
                      <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={3}
                        placeholder="Your answer / link to work…"
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      <div className="flex gap-2">
                        <button onClick={() => submit(a.id)} disabled={submitting}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">
                          {submitting ? "Submitting…" : "Submit"}
                        </button>
                        <button onClick={() => { setOpenId(null); setContent(""); }} className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setOpenId(a.id)} className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                      <Upload className="h-4 w-4" /> Submit work
                    </button>
                  )
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Assignments;

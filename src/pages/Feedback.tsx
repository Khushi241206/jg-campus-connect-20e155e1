import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Clock, CheckCircle2, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FeedbackItem {
  id: string;
  student_name: string;
  recipient: string;
  subject: string;
  message: string;
  response: string | null;
  status: string;
  created_at: string;
  responded_at: string | null;
}

const recipients = [
  { value: "professor", label: "Professor" },
  { value: "hod", label: "Head of Department" },
  { value: "dean", label: "Dean" },
  { value: "admin", label: "Admin Office" },
];

const Feedback = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [viewing, setViewing] = useState<FeedbackItem | null>(null);
  const [form, setForm] = useState({ recipient: "professor", subject: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("feedback")
      .select("*")
      .eq("student_id", user.id)
      .order("created_at", { ascending: false });
    setFeedbacks((data as FeedbackItem[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("feedback").insert({
      student_id: user.id,
      student_name: profile?.full_name || user.email || "Student",
      student_email: user.email,
      recipient: form.recipient,
      subject: form.subject,
      message: form.message,
    });
    setSubmitting(false);
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Feedback sent" });
    setForm({ recipient: "professor", subject: "", message: "" });
    setShowForm(false);
    load();
  };

  if (viewing) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button onClick={() => setViewing(null)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h2 className="font-semibold text-lg">{viewing.subject}</h2>
          <p className="text-xs text-muted-foreground">To: {recipients.find(r => r.value === viewing.recipient)?.label} • {new Date(viewing.created_at).toLocaleString()}</p>
          <p className="text-sm whitespace-pre-line">{viewing.message}</p>
          {viewing.response && (
            <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/30">
              <p className="text-xs font-semibold text-success mb-1">Response</p>
              <p className="text-sm whitespace-pre-line">{viewing.response}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold">Feedback</h1>
        </div>
        <button onClick={() => setShowForm((s) => !s)} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          {showForm ? "Cancel" : "New"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3 overflow-hidden">
            <select value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm">
              {recipients.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message…"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" />
            <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">
              <Send className="h-4 w-4" /> {submitting ? "Sending…" : "Send"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No feedback yet</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {feedbacks.map((f) => (
            <button key={f.id} onClick={() => setViewing(f)}
              className="w-full text-left bg-card border border-border rounded-xl p-4 hover:bg-muted/30 transition-colors flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm truncate">{f.subject}</h3>
                  {f.response ? (
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success"><CheckCircle2 className="h-3 w-3" />Replied</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-warning/10 text-warning"><Clock className="h-3 w-3" />Pending</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{f.message}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;

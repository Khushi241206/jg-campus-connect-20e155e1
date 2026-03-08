import { useState } from "framer-motion".startsWith ? "react" : "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, Clock, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const mockResponses: Record<string, string> = {
  professor: "Thank you for your feedback. I will address this in the next class session.",
  hod: "Your concern has been noted and forwarded to the relevant department for action.",
  dean: "We appreciate your feedback. The academic council will review this matter.",
  admin: "Your request has been processed. Please visit the admin office for further assistance.",
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [viewing, setViewing] = useState<FeedbackItem | null>(null);
  const [form, setForm] = useState({ recipient: "professor", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      student_name: "Rahul Sharma",
      recipient: form.recipient,
      subject: form.subject,
      message: form.message,
      response: null,
      status: "pending",
      created_at: new Date().toISOString(),
      responded_at: null,
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    toast({ title: "Feedback Sent! ✅", description: `Your feedback has been sent to the ${recipients.find(r => r.value === form.recipient)?.label}.` });
    setForm({ recipient: "professor", subject: "", message: "" });
    setShowForm(false);
    setLoading(false);

    setTimeout(() => {
      setFeedbacks(prev => prev.map(fb =>
        fb.id === newFeedback.id
          ? { ...fb, status: "responded", response: mockResponses[fb.recipient] || "Thank you for your feedback.", responded_at: new Date().toISOString() }
          : fb
      ));
      toast({ title: "Response Received! 💬", description: `${recipients.find(r => r.value === newFeedback.recipient)?.label} has responded to "${newFeedback.subject}".` });
    }, 3000);
  };

  if (viewing) {
    const latest = feedbacks.find(f => f.id === viewing.id) || viewing;
    return (
      <div className="space-y-5 md:space-y-6 animate-fade-in">
        <button onClick={() => setViewing(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Feedback
        </button>
        <div className="bg-card rounded-xl border border-border p-5 md:p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{latest.subject}</h2>
            <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${latest.status === "responded" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              {latest.status === "responded" ? "Responded" : "Pending"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Sent to: {recipients.find(r => r.value === latest.recipient)?.label} • {new Date(latest.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Your Message:</p>
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{latest.message}</p>
            </div>
          </div>
          {latest.response ? (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Response ({latest.responded_at ? new Date(latest.responded_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : ""}):</p>
              <div className="p-4 rounded-xl bg-success/5 border border-success/10">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{latest.response}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-muted/40 text-center">
              <Clock className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
              <p className="text-sm text-muted-foreground">Awaiting response...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Feedback</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all btn-lift flex items-center gap-2">
          <Send className="h-4 w-4" /> New Feedback
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-5 space-y-4 card-shadow">
              <h3 className="font-semibold text-foreground">Send Feedback</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Send To *</label>
                <select required value={form.recipient} onChange={e => setForm({...form, recipient: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                  {recipients.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                <input required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  placeholder="e.g., Query about ML assignment"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Write your feedback or query here..."
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 btn-lift">
                  {loading ? "Sending..." : "Send Feedback"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {feedbacks.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No feedback sent yet</p>
            <p className="text-sm mt-1">Click "New Feedback" to send your first feedback</p>
          </div>
        ) : (
          feedbacks.map((fb, i) => (
            <motion.div key={fb.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setViewing(fb)}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-all card-shadow">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 rounded-xl shrink-0 ${fb.status === "responded" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {fb.status === "responded" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{fb.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    To: {recipients.find(r => r.value === fb.recipient)?.label} • {new Date(fb.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
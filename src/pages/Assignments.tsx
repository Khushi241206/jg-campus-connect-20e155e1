import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image } from "lucide-react";
import { assignments } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Filter = "all" | "pending" | "submitted" | "graded";

const statusStyles = {
  pending: "bg-warning/10 text-warning",
  submitted: "bg-primary/10 text-primary",
  graded: "bg-success/10 text-success",
};

const Assignments = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [submitId, setSubmitId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submittedIds, setSubmittedIds] = useState<number[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filters: Filter[] = ["all", "pending", "submitted", "graded"];
  const filtered = filter === "all" ? assignments : assignments.filter(a => {
    if (submittedIds.includes(a.id) && a.status === "pending") return filter === "submitted";
    return a.status === filter;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(f.type)) {
        toast({ title: "Invalid file", description: "Please upload a PDF or image file.", variant: "destructive" });
        return;
      }
      if (f.size > 10 * 1024 * 1024) {
        toast({ title: "File too large", description: "Max file size is 10MB.", variant: "destructive" });
        return;
      }
      setFile(f);
    }
  };

  const handleSubmit = () => {
    if (!file || !submitId) return;
    setSubmittedIds([...submittedIds, submitId]);
    toast({ title: "Assignment Submitted! ✅", description: `"${file.name}" uploaded successfully.` });
    setFile(null);
    setSubmitId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Assignments</h1>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all btn-lift
              ${filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((a, i) => {
          const isSubmitted = submittedIds.includes(a.id);
          const effectiveStatus = isSubmitted && a.status === "pending" ? "submitted" : a.status;
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-4 card-hover">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyles[effectiveStatus]}`}>
                  {effectiveStatus === "graded" ? `Graded (${a.grade})` : effectiveStatus}
                </span>
              </div>
              <p className="text-sm text-primary font-medium">{a.subject}</p>
              <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Deadline: {a.deadline}</span>
                {a.status === "pending" && !isSubmitted && (
                  <button onClick={() => setSubmitId(a.id)}
                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium btn-lift flex items-center gap-1">
                    <Upload className="h-3 w-3" /> Submit
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {submitId !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => { setSubmitId(null); setFile(null); }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-card rounded-lg border border-border p-6 w-full max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Submit Assignment</h3>
                <button onClick={() => { setSubmitId(null); setFile(null); }} className="p-1 hover:bg-muted rounded-lg">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Upload a PDF or image file (max 10MB)</p>

              <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={handleFileChange} className="hidden" />

              {!file ? (
                <button onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to browse files</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG supported</p>
                </button>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  {file.type === "application/pdf" ? <FileText className="h-8 w-8 text-primary" /> : <Image className="h-8 w-8 text-primary" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="p-1 hover:bg-muted rounded-lg">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={handleSubmit} disabled={!file}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-all">
                  Submit
                </button>
                <button onClick={() => { setSubmitId(null); setFile(null); }}
                  className="px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-all">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assignments;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Student { id: string; full_name: string; enrollment_number: string | null; }

const STATUSES = ["present", "absent", "late"] as const;

const ManageAttendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [marks, setMarks] = useState<Record<string, "present" | "absent" | "late">>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("id, full_name, enrollment_number").order("full_name");
      setStudents((data as Student[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    if (!subject) return toast({ title: "Enter a subject", variant: "destructive" });
    const rows = students.map((s) => ({
      student_id: s.id,
      subject,
      date,
      status: marks[s.id] ?? "present",
      marked_by: user?.id,
    }));
    setSaving(true);
    const { error } = await supabase.from("attendance").upsert(rows, { onConflict: "student_id,subject,date" });
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Attendance saved" });
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={inp} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inp} />
        <button onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-10">No students registered yet.</p>
      ) : (
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {students.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{s.full_name}</p>
                <p className="text-xs text-muted-foreground">{s.enrollment_number ?? "—"}</p>
              </div>
              <div className="flex gap-1">
                {STATUSES.map((st) => (
                  <button key={st} onClick={() => setMarks((m) => ({ ...m, [s.id]: st }))}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize ${(marks[s.id] ?? "present") === st ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {st[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const inp = "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
export default ManageAttendance;

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Loader2 } from "lucide-react";

interface Student { id: string; full_name: string; enrollment_number: string | null; }
interface F { id: string; student_id: string; semester: string; amount_total: number; amount_paid: number; due_date: string | null; status: string; }

const ManageFees = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [items, setItems] = useState<F[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ student_id: "", semester: "", amount_total: "", amount_paid: "0", due_date: "", status: "pending" });

  const load = useCallback(async () => {
    setLoading(true);
    const [s, f] = await Promise.all([
      supabase.from("profiles").select("id, full_name, enrollment_number").order("full_name"),
      supabase.from("fee_records").select("*").order("created_at", { ascending: false }),
    ]);
    setStudents((s.data as Student[]) ?? []);
    setItems((f.data as F[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.student_id) return toast({ title: "Pick a student", variant: "destructive" });
    const { error } = await supabase.from("fee_records").insert({
      student_id: form.student_id,
      semester: form.semester,
      amount_total: Number(form.amount_total),
      amount_paid: Number(form.amount_paid),
      due_date: form.due_date || null,
      status: form.status,
    });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Fee record added" });
    setForm({ student_id: "", semester: "", amount_total: "", amount_paid: "0", due_date: "", status: "pending" });
    load();
  };
  const del = async (id: string) => { await supabase.from("fee_records").delete().eq("id", id); load(); };
  const nameOf = (id: string) => students.find((s) => s.id === id)?.full_name ?? id.slice(0, 8);

  return (
    <div className="space-y-4">
      <form onSubmit={create} className="bg-card border border-border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm">Add fee record</h3>
        <select required value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} className={inp}>
          <option value="">— Select student —</option>
          {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.enrollment_number ?? "—"})</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input required placeholder="Semester" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className={inp} />
          <input required type="number" step="0.01" placeholder="Total amount" value={form.amount_total} onChange={(e) => setForm({ ...form, amount_total: e.target.value })} className={inp} />
          <input type="number" step="0.01" placeholder="Paid" value={form.amount_paid} onChange={(e) => setForm({ ...form, amount_paid: e.target.value })} className={inp} />
          <input type="date" value={form.due_date} onChange={(e) => setForm({ ...form, due_date: e.target.value })} className={inp} />
        </div>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inp}>
          {["pending", "partial", "paid", "overdue"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="h-4 w-4" />Add</button>
      </form>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div> :
        <div className="space-y-2">
          {items.map((f) => (
            <div key={f.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{nameOf(f.student_id)} • Sem {f.semester}</p>
                <p className="text-xs text-muted-foreground">₹{Number(f.amount_paid).toLocaleString()} / ₹{Number(f.amount_total).toLocaleString()} • <span className="capitalize">{f.status}</span></p>
              </div>
              <button onClick={() => del(f.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};
const inp = "w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
export default ManageFees;

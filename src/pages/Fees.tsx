import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FeeRow {
  id: string;
  semester: string;
  amount_total: number;
  amount_paid: number;
  due_date: string | null;
  status: string;
  notes: string | null;
}

const statusColor: Record<string, string> = {
  paid: "bg-success/10 text-success border-success/30",
  pending: "bg-warning/10 text-warning border-warning/30",
  partial: "bg-warning/10 text-warning border-warning/30",
  overdue: "bg-destructive/10 text-destructive border-destructive/30",
};

const Fees = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<FeeRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("fee_records")
        .select("id, semester, amount_total, amount_paid, due_date, status, notes")
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });
      setRows((data as FeeRow[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const totalDue = rows.reduce((s, r) => s + Number(r.amount_total) - Number(r.amount_paid), 0);
  const totalPaid = rows.reduce((s, r) => s + Number(r.amount_paid), 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Fees</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Paid</p>
          <p className="text-xl md:text-2xl font-bold text-success">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Outstanding</p>
          <p className="text-xl md:text-2xl font-bold text-destructive">₹{totalDue.toLocaleString()}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <CreditCard className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No fee records yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Semester {r.semester}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-md border capitalize ${statusColor[r.status] || ""}`}>{r.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-medium">₹{Number(r.amount_total).toLocaleString()}</p></div>
                <div><p className="text-xs text-muted-foreground">Paid</p><p className="font-medium text-success">₹{Number(r.amount_paid).toLocaleString()}</p></div>
                <div><p className="text-xs text-muted-foreground">Due Date</p><p className="font-medium">{r.due_date ? new Date(r.due_date).toLocaleDateString() : "—"}</p></div>
              </div>
              {r.notes && <p className="text-xs text-muted-foreground mt-2">{r.notes}</p>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fees;

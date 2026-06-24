import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Loader2, Download, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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

// JG University B.Tech AI-ML standard semester fee breakup (INR)
const FEE_STRUCTURE = [
  { head: "Tuition Fee", amount: 32000 },
  { head: "Development Fee", amount: 4000 },
  { head: "Computer / Lab Fee", amount: 2500 },
  { head: "Library Fee", amount: 750 },
  { head: "Examination Fee", amount: 750 },
  { head: "Student Welfare", amount: 250 },
];
const STRUCTURE_TOTAL = FEE_STRUCTURE.reduce((s, x) => s + x.amount, 0);

const Fees = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
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

  const downloadReceipt = (r: FeeRow) => {
    const receiptNo = `JGU/${r.semester}/${r.id.slice(0, 8).toUpperCase()}`;
    const date = new Date().toLocaleDateString("en-IN");
    const studentName = profile?.full_name || "Student";
    const enroll = (profile as any)?.enrollment_number || "—";

    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Fee Receipt ${receiptNo}</title>
<style>
 body{font-family:Inter,Arial,sans-serif;max-width:720px;margin:32px auto;padding:24px;color:#111}
 h1{margin:0;color:#1e3a8a;font-size:22px}
 .sub{color:#555;font-size:13px}
 .box{border:1px solid #e5e7eb;border-radius:12px;padding:18px;margin-top:18px}
 table{width:100%;border-collapse:collapse;margin-top:8px;font-size:14px}
 th,td{padding:8px;border-bottom:1px solid #eee;text-align:left}
 th{background:#f8fafc}
 .right{text-align:right}
 .total{font-weight:700;background:#f1f5f9}
 .stamp{margin-top:24px;display:flex;justify-content:space-between;align-items:flex-end}
 .paid{display:inline-block;border:2px solid #16a34a;color:#16a34a;padding:6px 14px;border-radius:8px;transform:rotate(-6deg);font-weight:700;letter-spacing:1px}
 .meta{display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px}
 @media print{.noprint{display:none}}
</style></head><body>
 <div style="display:flex;justify-content:space-between;align-items:center">
  <div>
   <h1>JG University</h1>
   <div class="sub">Official Fee Receipt</div>
  </div>
  <div class="sub" style="text-align:right">
   Receipt No: <b>${receiptNo}</b><br/>Date: ${date}
  </div>
 </div>
 <div class="box meta">
  <div><b>Student Name:</b> ${studentName}</div>
  <div><b>Enrollment No:</b> ${enroll}</div>
  <div><b>Programme:</b> B.Tech (AI &amp; ML)</div>
  <div><b>Semester:</b> ${r.semester}</div>
  <div><b>Due Date:</b> ${r.due_date ? new Date(r.due_date).toLocaleDateString("en-IN") : "—"}</div>
  <div><b>Status:</b> ${r.status.toUpperCase()}</div>
 </div>
 <div class="box">
  <table>
   <thead><tr><th>Particulars</th><th class="right">Amount (INR)</th></tr></thead>
   <tbody>
    ${FEE_STRUCTURE.map(f => `<tr><td>${f.head}</td><td class="right">₹${f.amount.toLocaleString("en-IN")}</td></tr>`).join("")}
    <tr class="total"><td>Total Semester Fee</td><td class="right">₹${Number(r.amount_total).toLocaleString("en-IN")}</td></tr>
    <tr><td>Amount Paid</td><td class="right">₹${Number(r.amount_paid).toLocaleString("en-IN")}</td></tr>
    <tr class="total"><td>Balance Due</td><td class="right">₹${(Number(r.amount_total) - Number(r.amount_paid)).toLocaleString("en-IN")}</td></tr>
   </tbody>
  </table>
 </div>
 <div class="stamp">
  <div class="sub">This is a computer-generated receipt. Signature not required.</div>
  ${r.status === "paid" ? '<div class="paid">PAID</div>' : ""}
 </div>
 <div class="noprint" style="margin-top:20px;text-align:center">
  <button onclick="window.print()" style="padding:10px 18px;border-radius:8px;border:none;background:#1e3a8a;color:#fff;font-weight:600;cursor:pointer">Print / Save as PDF</button>
 </div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Fee-Receipt-${receiptNo.replace(/\//g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Receipt downloaded", description: "Open the file and print to save as PDF." });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Fees</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Paid</p>
          <p className="text-xl md:text-2xl font-bold text-success">₹{totalPaid.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Outstanding</p>
          <p className="text-xl md:text-2xl font-bold text-destructive">₹{totalDue.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Semester Fee Structure — B.Tech (AI &amp; ML)</h3>
          <span className="text-xs text-muted-foreground">per semester</span>
        </div>
        <div className="divide-y divide-border">
          {FEE_STRUCTURE.map((f) => (
            <div key={f.head} className="flex justify-between py-2 text-sm">
              <span className="text-foreground">{f.head}</span>
              <span className="font-medium">₹{f.amount.toLocaleString("en-IN")}</span>
            </div>
          ))}
          <div className="flex justify-between py-2.5 text-sm font-bold border-t-2 border-border mt-1">
            <span>Total</span>
            <span className="text-primary">₹{STRUCTURE_TOTAL.toLocaleString("en-IN")}</span>
          </div>
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
          <h3 className="font-semibold text-sm mt-2">Payment History</h3>
          {rows.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  Semester {r.semester}
                  {r.status === "paid" && <CheckCircle2 className="h-4 w-4 text-success" />}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-md border capitalize ${statusColor[r.status] || ""}`}>{r.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-medium">₹{Number(r.amount_total).toLocaleString("en-IN")}</p></div>
                <div><p className="text-xs text-muted-foreground">Paid</p><p className="font-medium text-success">₹{Number(r.amount_paid).toLocaleString("en-IN")}</p></div>
                <div><p className="text-xs text-muted-foreground">Due Date</p><p className="font-medium">{r.due_date ? new Date(r.due_date).toLocaleDateString("en-IN") : "—"}</p></div>
              </div>
              {r.notes && <p className="text-xs text-muted-foreground mt-2">{r.notes}</p>}
              <button
                onClick={() => downloadReceipt(r)}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download Receipt
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fees;

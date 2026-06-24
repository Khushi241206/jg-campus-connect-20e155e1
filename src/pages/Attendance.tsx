import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { UserCheck, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Row {
  id: string;
  subject: string;
  date: string;
  status: "present" | "absent" | "late";
}

const Attendance = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("attendance")
        .select("id, subject, date, status")
        .eq("student_id", user.id)
        .order("date", { ascending: false });
      setRows((data as Row[]) ?? []);
      setLoading(false);
    })();
  }, [user]);

  const summary = useMemo(() => {
    const bySub = new Map<string, { present: number; total: number }>();
    rows.forEach((r) => {
      const e = bySub.get(r.subject) ?? { present: 0, total: 0 };
      e.total += 1;
      if (r.status === "present") e.present += 1;
      bySub.set(r.subject, e);
    });
    return Array.from(bySub.entries()).map(([subject, v]) => ({
      subject,
      ...v,
      pct: v.total ? Math.round((v.present / v.total) * 100) : 0,
    }));
  }, [rows]);

  const overallPresent = rows.filter((r) => r.status === "present").length;
  const overallTotal = rows.length;
  const overallPct = overallTotal ? Math.round((overallPresent / overallTotal) * 100) : 0;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Attendance</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <Card label="Overall" value={`${overallPct}%`} color="text-primary" />
        <Card label="Present" value={overallPresent} color="text-success" />
        <Card label="Total Sessions" value={overallTotal} color="text-foreground" />
      </div>

      {!loading && overallTotal > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm">Overall Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: rows.filter(r => r.status === "present").length },
                      { name: "Absent", value: rows.filter(r => r.status === "absent").length },
                      { name: "Late", value: rows.filter(r => r.status === "late").length },
                    ].filter(d => d.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                    label={(e: any) => `${e.name} ${e.value}`}
                  >
                    {["hsl(var(--success))", "hsl(var(--destructive))", "hsl(var(--warning))"].map((c, i) => (
                      <Cell key={i} fill={c} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-center">
            <h3 className="font-semibold mb-3 text-sm">At a Glance</h3>
            <div className="space-y-2 text-sm">
              <Stat label="Attendance %" value={`${overallPct}%`} accent={overallPct >= 75 ? "text-success" : overallPct >= 60 ? "text-warning" : "text-destructive"} />
              <Stat label="Subjects Tracked" value={`${summary.length}`} />
              <Stat label="Best Subject" value={summary.length ? summary.slice().sort((a, b) => b.pct - a.pct)[0].subject : "—"} />
              <Stat label="Needs Focus" value={summary.length ? summary.slice().sort((a, b) => a.pct - b.pct)[0].subject : "—"} accent="text-destructive" />
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <>
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-3 text-sm">By Subject</h3>
            {summary.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No attendance records yet</p>
            ) : (
              <div className="space-y-3">
                {summary.map((s) => (
                  <div key={s.subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{s.subject}</span>
                      <span className="text-muted-foreground">{s.present}/{s.total} • {s.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full ${s.pct >= 75 ? "bg-success" : s.pct >= 60 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-3 text-sm">Recent Records</h3>
            {rows.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No records yet</p>
            ) : (
              <div className="space-y-2">
                {rows.slice(0, 30).map((r, i) => (
                  <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40">
                    <div>
                      <p className="text-sm font-medium">{r.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString()}</p>
                    </div>
                    <Badge status={r.status} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
  <div className="bg-card border border-border rounded-xl p-3 md:p-4 text-center">
    <p className={`text-xl md:text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-[10px] md:text-xs text-muted-foreground">{label}</p>
  </div>
);

const Badge = ({ status }: { status: "present" | "absent" | "late" }) => {
  if (status === "present") return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-success/10 text-success"><CheckCircle className="h-3 w-3" />Present</span>;
  if (status === "absent") return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive"><XCircle className="h-3 w-3" />Absent</span>;
  return <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-warning/10 text-warning"><Clock className="h-3 w-3" />Late</span>;
};

export default Attendance;

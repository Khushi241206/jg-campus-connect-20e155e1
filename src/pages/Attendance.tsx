import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { UserCheck, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { attendanceData } from "@/data/mockData";

interface Row {
  id: string;
  subject: string;
  date: string;
  status: "present" | "absent" | "late";
}

// Build display summary: prefer DB data; fall back to mock (synced with timetable subjects)
const subjectMeta: Record<string, { faculty: string; code: string }> = {
  "Software Engineering": { faculty: "Miss. Neelu Verma", code: "SE" },
  "Computer Networks": { faculty: "Mr. Sharad Patidar", code: "CN" },
  "Machine Learning": { faculty: "Mr. Sameer Deo", code: "ML" },
  "UI/UX Design": { faculty: "Ms. Anukreeti Chaudhary", code: "UX" },
  "Vector Calculus": { faculty: "Miss. Neelu Verma", code: "VC" },
  "Sustainable Energy": { faculty: "Ms. Anukreeti Chaudhary", code: "SEN" },
  "Entrepreneurship": { faculty: "Mr. Sharad Patidar", code: "ENT" },
};

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

  // Subject summary: combine DB rows with mock baseline so the page always reflects timetable subjects
  const summary = useMemo(() => {
    const map = new Map<string, { present: number; absent: number; late: number; total: number }>();
    attendanceData.forEach((m) => {
      map.set(m.subject, { present: m.present, absent: m.absent, late: 0, total: m.total });
    });
    rows.forEach((r) => {
      const key = r.subject.replace(/\s*\(.*\)\s*/, "").trim();
      const e = map.get(key) ?? { present: 0, absent: 0, late: 0, total: 0 };
      e.total += 1;
      e[r.status] += 1;
      map.set(key, e);
    });
    return Array.from(map.entries()).map(([subject, v]) => ({
      subject,
      ...v,
      faculty: subjectMeta[subject]?.faculty ?? "—",
      code: subjectMeta[subject]?.code ?? subject.slice(0, 3).toUpperCase(),
      pct: v.total ? Math.round((v.present / v.total) * 100) : 0,
    }));
  }, [rows]);

  const totals = summary.reduce(
    (a, s) => ({ present: a.present + s.present, absent: a.absent + s.absent, late: a.late + s.late, total: a.total + s.total }),
    { present: 0, absent: 0, late: 0, total: 0 }
  );
  const overallPct = totals.total ? Math.round((totals.present / totals.total) * 100) : 0;

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold">Attendance</h1>
      </div>
      <p className="text-xs md:text-sm text-muted-foreground -mt-3">Subjects synced with your weekly time table · Year 2, Div B</p>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <Card label="Overall" value={`${overallPct}%`} color={overallPct >= 75 ? "text-success" : overallPct >= 60 ? "text-warning" : "text-destructive"} />
        <Card label="Present" value={totals.present} color="text-success" />
        <Card label="Total Sessions" value={totals.total} color="text-foreground" />
      </div>

      {!loading && totals.total > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm">Overall Distribution</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: totals.present },
                      { name: "Absent", value: totals.absent },
                      { name: "Late", value: totals.late },
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

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-sm">Subject-wise %</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.map(s => ({ name: s.code, pct: s.pct }))} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} formatter={(v: any) => [`${v}%`, "Attendance"]} />
                  <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                    {summary.map((s, i) => (
                      <Cell key={i} fill={s.pct >= 75 ? "hsl(var(--success))" : s.pct >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">By Subject (as per Time Table)</h3>
              <span className="text-xs text-muted-foreground">{summary.length} subjects</span>
            </div>
            <div className="space-y-3">
              {summary.map((s) => (
                <div key={s.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="min-w-0">
                      <span className="font-medium">{s.subject}</span>
                      <span className="text-[11px] text-muted-foreground ml-2">{s.faculty}</span>
                    </div>
                    <span className="text-muted-foreground whitespace-nowrap ml-2">{s.present}/{s.total} • <span className={s.pct >= 75 ? "text-success" : s.pct >= 60 ? "text-warning" : "text-destructive"}>{s.pct}%</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${s.pct >= 75 ? "bg-success" : s.pct >= 60 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {rows.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold mb-3 text-sm">Recent Records</h3>
              <div className="space-y-2">
                {rows.slice(0, 20).map((r, i) => (
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
            </div>
          )}
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

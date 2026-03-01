import { motion } from "framer-motion";
import { attendanceData } from "@/data/mockData";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const Attendance = () => {
  const overall = attendanceData.reduce((s, a) => s + a.present, 0);
  const total = attendanceData.reduce((s, a) => s + a.total, 0);
  const overallPct = ((overall / total) * 100).toFixed(1);

  const chartData = attendanceData.map(a => ({ name: a.subject.split(" ").map(w => w[0]).join(""), percentage: a.percentage, fullName: a.subject }));
  const pieData = [
    { name: "Present", value: overall, fill: "hsl(var(--success))" },
    { name: "Absent", value: total - overall, fill: "hsl(var(--destructive))" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Attendance</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-3xl font-bold text-primary">{overallPct}%</p>
          <p className="text-xs text-muted-foreground">Overall</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-3xl font-bold text-success">{overall}</p>
          <p className="text-xs text-muted-foreground">Total Present</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <p className="text-3xl font-bold text-foreground">{total}</p>
          <p className="text-xs text-muted-foreground">Total Classes</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Subject-wise Attendance</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-2 text-xs shadow-lg">
                          <p className="font-medium text-foreground">{d.fullName}</p>
                          <p className="text-muted-foreground">{d.percentage}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.percentage < 80 ? "hsl(var(--destructive))" : "hsl(var(--success))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Overall Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                  label={({ name, value, percent, cx, cy, midAngle, outerRadius: oR }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = oR + 25;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="text-xs" fill="hsl(var(--foreground))">
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                  labelLine={false}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="text-sm font-semibold" fill="hsl(var(--foreground))">
                  Present : {overall}
                </text>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject-wise list */}
      <div className="space-y-4">
        {attendanceData.map((subj, i) => {
          const isLow = subj.percentage < 80;
          return (
            <motion.div key={subj.subject} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-card rounded-lg border border-border p-4 card-hover">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isLow ? <AlertTriangle className="h-4 w-4 text-destructive" /> : <CheckCircle className="h-4 w-4 text-success" />}
                  <h3 className="font-semibold text-foreground text-sm">{subj.subject}</h3>
                </div>
                <span className={`text-sm font-bold ${isLow ? "text-destructive" : "text-success"}`}>{subj.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${subj.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.06 }}
                  className={`h-full rounded-full ${isLow ? "bg-destructive" : "bg-success"}`} />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Lectures: {subj.total}</span>
                <span className="text-success">Present: {subj.present}</span>
                <span className="text-destructive">Absent: {subj.absent}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendance;

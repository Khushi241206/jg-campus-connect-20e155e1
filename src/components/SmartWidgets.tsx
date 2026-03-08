import { motion } from "framer-motion";
import { Brain, TrendingUp, Bell, Activity, Sparkles } from "lucide-react";
import { attendanceData } from "@/data/mockData";

// Attendance Prediction Indicator
export const AttendancePrediction = () => {
  const avg = attendanceData.reduce((s, a) => s + a.percentage, 0) / attendanceData.length;
  const trend = avg > 82 ? "stable" : avg > 75 ? "declining" : "critical";
  const prediction = avg > 82 ? Math.min(avg + 1.5, 95).toFixed(1) : Math.max(avg - 2, 60).toFixed(1);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-3 md:p-4 card-hover">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-primary/10"><Brain className="h-4 w-4 text-primary" /></div>
        <h3 className="font-semibold text-foreground text-sm">Attendance Prediction</h3>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-0.5">
          <Sparkles className="h-2.5 w-2.5" /> AI
        </span>
      </div>
      <div className="flex items-end gap-3">
        <div>
          <p className="text-2xl font-bold text-primary">{prediction}%</p>
          <p className="text-[10px] text-muted-foreground">Predicted end-of-sem</p>
        </div>
        <div className={`text-xs px-2 py-1 rounded-lg font-medium mb-1
          ${trend === "stable" ? "bg-success/10 text-success" : trend === "declining" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
          {trend === "stable" ? "↑ Stable" : trend === "declining" ? "→ Needs attention" : "↓ Critical"}
        </div>
      </div>
    </motion.div>
  );
};

// Academic Health Score
export const AcademicHealthScore = () => {
  const attendanceScore = attendanceData.reduce((s, a) => s + a.percentage, 0) / attendanceData.length;
  const healthScore = Math.round((attendanceScore * 0.4 + 84 * 0.35 + 80 * 0.25)); // attendance + CGPA-scaled + assignments

  const getColor = (score: number) => score >= 80 ? "text-success" : score >= 65 ? "text-warning" : "text-destructive";
  const getLabel = (score: number) => score >= 80 ? "Excellent" : score >= 65 ? "Good" : "Needs Improvement";

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (healthScore / 100) * circumference;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-3 md:p-4 card-hover">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-primary/10"><Activity className="h-4 w-4 text-primary" /></div>
        <h3 className="font-semibold text-foreground text-sm">Academic Health</h3>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-0.5">
          <Sparkles className="h-2.5 w-2.5" /> AI
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
              strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-bold ${getColor(healthScore)}`}>{healthScore}</span>
          </div>
        </div>
        <div className="space-y-1.5 text-xs">
          <p className={`font-semibold ${getColor(healthScore)}`}>{getLabel(healthScore)}</p>
          <div className="space-y-1 text-muted-foreground">
            <p>Attendance: {attendanceScore.toFixed(0)}%</p>
            <p>CGPA: 8.4/10</p>
            <p>Assignments: 3/5 done</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Smart Reminders
export const SmartReminders = () => {
  const reminders = [
    { text: "CN attendance below 80% — attend next 3 classes", type: "warning" as const, icon: "⚠️" },
    { text: "ML Assignment due in 2 days", type: "info" as const, icon: "📝" },
    { text: "Mid-term exams in 11 days", type: "info" as const, icon: "📅" },
    { text: "Fee payment completed ✓", type: "success" as const, icon: "✅" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-3 md:p-4 card-hover">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-primary/10"><Bell className="h-4 w-4 text-primary" /></div>
        <h3 className="font-semibold text-foreground text-sm">Smart Reminders</h3>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-0.5">
          <Sparkles className="h-2.5 w-2.5" /> AI
        </span>
      </div>
      <div className="space-y-2">
        {reminders.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
            className={`flex items-start gap-2 p-2 rounded-lg text-xs
              ${r.type === "warning" ? "bg-warning/5" : r.type === "success" ? "bg-success/5" : "bg-muted/30"}`}>
            <span className="shrink-0 mt-0.5">{r.icon}</span>
            <span className="text-foreground">{r.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Performance Analytics
export const PerformanceAnalytics = () => {
  const subjects = attendanceData.map(a => ({
    name: a.subject,
    attendance: a.percentage,
    risk: a.percentage < 75 ? "high" : a.percentage < 80 ? "medium" : "low",
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-3 md:p-4 card-hover">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-primary/10"><TrendingUp className="h-4 w-4 text-primary" /></div>
        <h3 className="font-semibold text-foreground text-sm">Performance Insights</h3>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-0.5">
          <Sparkles className="h-2.5 w-2.5" /> AI
        </span>
      </div>
      <div className="space-y-2">
        {subjects.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">{s.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ml-2
                  ${s.risk === "high" ? "bg-destructive/10 text-destructive" : s.risk === "medium" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                  {s.risk === "high" ? "At Risk" : s.risk === "medium" ? "Watch" : "On Track"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${s.risk === "high" ? "bg-destructive" : s.risk === "medium" ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${s.attendance}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{s.attendance}%</span>
              </div>
            </div>
          </div>
        ))}
        {subjects.every(s => s.risk === "low") && (
          <p className="text-sm text-success text-center py-2">✅ All subjects on track!</p>
        )}
      </div>
    </motion.div>
  );
};

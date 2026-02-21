import { motion } from "framer-motion";
import { attendanceData } from "@/data/mockData";
import { AlertTriangle, CheckCircle } from "lucide-react";

const Attendance = () => {
  const overall = attendanceData.reduce((s, a) => s + a.present, 0);
  const total = attendanceData.reduce((s, a) => s + a.total, 0);
  const overallPct = ((overall / total) * 100).toFixed(1);

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

      {/* Subject-wise */}
      <div className="space-y-4">
        {attendanceData.map((subj, i) => {
          const isLow = subj.percentage < 80;
          return (
            <motion.div
              key={subj.subject}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-lg border border-border p-4 card-hover"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isLow ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                  <h3 className="font-semibold text-foreground text-sm">{subj.subject}</h3>
                </div>
                <span className={`text-sm font-bold ${isLow ? "text-destructive" : "text-success"}`}>
                  {subj.percentage}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subj.percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  className={`h-full rounded-full ${isLow ? "bg-destructive" : "bg-success"}`}
                />
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

import { motion } from "framer-motion";
import {
  UserCheck, FileText, Bell, CreditCard, Clock, AlertTriangle, TrendingUp,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { attendanceData, assignments, notices, fees, attendanceTrend, timetableData } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import avatarAnanya from "@/assets/avatar-ananya.png";
import { AttendancePrediction, AcademicHealthScore, SmartReminders, PerformanceAnalytics } from "@/components/SmartWidgets";

const card = "bg-card rounded-xl border border-border p-4 md:p-5 card-hover card-shadow";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const avgAttendance = (attendanceData.reduce((s, a) => s + a.percentage, 0) / attendanceData.length).toFixed(1);
  const pendingAssignments = assignments.filter(a => a.status === "pending").length;
  const urgentNotices = notices.filter(n => n.urgent).length;

  const todayClasses = timetableData.Friday?.filter(c => c.subject !== "Break") || [];

  const stats = [
    { label: "Avg Attendance", value: `${avgAttendance}%`, icon: UserCheck, color: "text-success" },
    { label: "Pending Tasks", value: pendingAssignments, icon: FileText, color: "text-warning" },
    { label: "Urgent Notices", value: urgentNotices, icon: Bell, color: "text-destructive" },
    { label: "Fee Due", value: `₹${(fees.outstanding).toLocaleString()}`, icon: CreditCard, color: "text-primary" },
  ];

  const displayName = profile?.full_name || user?.email || "Student";
  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 md:hidden rounded-full overflow-hidden border-2 border-border/60 shadow-sm shrink-0">
          <img src={avatarAnanya} alt={displayName} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-foreground tracking-tight">Welcome, {displayName}</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{profile?.program || "—"} • Sem {profile?.semester || "—"}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={card}
          >
            <div className="flex items-center gap-2.5 md:gap-3">
              <div className={`p-2 md:p-2.5 rounded-xl bg-muted ${s.color}`}>
                <s.icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Smart Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <AttendancePrediction />
        <AcademicHealthScore />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {/* Today's Classes */}
        <div className={card}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Today's Classes
            </h3>
            <button onClick={() => navigate("/timetable")} className="text-xs text-primary font-medium hover:underline transition-colors">View All</button>
          </div>
          <div className="space-y-2">
            {todayClasses.slice(0, 4).map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{c.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.time} • {c.faculty}</p>
                </div>
                <span className={`shrink-0 ml-3 text-[11px] px-2.5 py-1 rounded-full font-medium
                  ${c.type === "Lab" || c.type === "Practical" ? "bg-accent/15 text-accent-foreground" : "bg-success/10 text-success"}`}>
                  {c.type || "Theory"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Reminders */}
        <SmartReminders />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {/* Recent Notices */}
        <div className={card}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Recent Notices
            </h3>
            <button onClick={() => navigate("/notices")} className="text-xs text-primary font-medium hover:underline transition-colors">View All</button>
          </div>
          <div className="space-y-2">
            {notices.slice(0, 4).map((n) => (
              <div key={n.id} className="p-2.5 rounded-lg bg-muted/40 text-sm">
                <div className="flex items-start gap-2">
                  {n.urgent && <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.date}</p>
                  </div>
                  {n.urgent && (
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">Urgent</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Analytics */}
        <PerformanceAnalytics />
      </div>

      {/* Attendance Trend */}
      <div className={card}>
        <h3 className="font-semibold text-foreground text-sm flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" /> Attendance Trend
        </h3>
        <div className="h-44 md:h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "10px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px -2px hsl(var(--shadow-color) / 0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="hsl(var(--primary))"
                fill="url(#attendanceGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
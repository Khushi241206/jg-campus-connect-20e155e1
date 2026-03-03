import { useState } from "react";
import { motion } from "framer-motion";
import { attendanceData } from "@/data/mockData";
import { AlertTriangle, CheckCircle, CalendarDays, FileText, ChevronLeft, ChevronRight, Send, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { useToast } from "@/hooks/use-toast";

// Generate daily attendance for a month based on timetable
const generateDailyAttendance = () => {
  const subjects: Record<string, { faculty: string; time: string }> = {
    "Computer Networks": { faculty: "Mr. Sharad Patidar", time: "13:30-14:10" },
    "Introduction to UI/UX": { faculty: "Ms. Anukreeti Chaudhary", time: "14:10-14:50" },
    "Introduction to Machine Learning": { faculty: "Mr. Sameer Deo", time: "15:30-16:10" },
    "Software Engineering": { faculty: "Miss. Neelu Verma", time: "16:10-16:50" },
    "Vector Calculus": { faculty: "Dr. R.K. Sharma", time: "14:10-14:50" },
    "Sustainable Energy": { faculty: "Dr. A. Gupta", time: "15:30-16:10" },
    "Entrepreneurship": { faculty: "Prof. M. Singh", time: "14:10-14:50" },
  };

  const dailySchedules: Record<string, string[]> = {
    Monday: ["Computer Networks", "Introduction to UI/UX", "Introduction to Machine Learning", "Software Engineering"],
    Tuesday: ["Introduction to Machine Learning", "Vector Calculus", "Computer Networks", "Introduction to UI/UX"],
    Wednesday: ["Introduction to UI/UX", "Introduction to Machine Learning", "Vector Calculus", "Computer Networks"],
    Thursday: ["Computer Networks", "Introduction to UI/UX", "Introduction to Machine Learning", "Software Engineering"],
    Friday: ["Software Engineering", "Entrepreneurship", "Sustainable Energy", "Introduction to Machine Learning"],
  };

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const data: Record<string, { subject: string; faculty: string; time: string; status: "P" | "A" | "N" }[]> = {};

  // Generate for Jan-Feb 2026
  for (let m = 0; m < 3; m++) {
    const month = m; // Jan=0, Feb=1, Mar=2
    const daysInMonth = new Date(2026, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(2026, month, d);
      const dayName = days[date.getDay()];
      const dateStr = date.toISOString().split("T")[0];
      
      if (dayName === "Sunday" || dayName === "Saturday") continue;
      const schedule = dailySchedules[dayName];
      if (!schedule) continue;

      // Seed-based pseudo-random for consistent results
      const seed = d * 7 + month * 31;
      data[dateStr] = schedule.map((subj, i) => ({
        subject: subj,
        faculty: subjects[subj]?.faculty || "TBA",
        time: subjects[subj]?.time || "TBA",
        status: ((seed + i) % 7 === 0 ? "A" : "P") as "P" | "A",
      }));
    }
  }
  // Today
  const today = new Date().toISOString().split("T")[0];
  if (!data[today]) {
    const dayName = days[new Date().getDay()];
    const schedule = dailySchedules[dayName] || dailySchedules["Monday"]!;
    data[today] = schedule.map((subj) => ({
      subject: subj,
      faculty: subjects[subj]?.faculty || "TBA",
      time: subjects[subj]?.time || "TBA",
      status: "N" as const,
    }));
  }

  return data;
};

const dailyAttendanceData = generateDailyAttendance();

type Tab = "summary" | "daily" | "leave";

interface LeaveApplication {
  id: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
}

const Attendance = () => {
  const [tab, setTab] = useState<Tab>("summary");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();

  // Leave application state
  const [leaves, setLeaves] = useState<LeaveApplication[]>([
    { id: 1, fromDate: "2026-02-10", toDate: "2026-02-11", reason: "Family function", status: "Approved", appliedOn: "2026-02-07" },
    { id: 2, fromDate: "2026-02-24", toDate: "2026-02-24", reason: "Medical appointment", status: "Pending", appliedOn: "2026-02-22" },
  ]);
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const overall = attendanceData.reduce((s, a) => s + a.present, 0);
  const total = attendanceData.reduce((s, a) => s + a.total, 0);
  const overallPct = ((overall / total) * 100).toFixed(1);

  const chartData = attendanceData.map(a => ({ name: a.subject.split(" ").map(w => w[0]).join(""), percentage: a.percentage, fullName: a.subject }));
  const pieData = [
    { name: "Present", value: overall, fill: "hsl(var(--success))" },
    { name: "Absent", value: total - overall, fill: "hsl(var(--destructive))" },
  ];

  // Daily view helpers
  const dateStr = selectedDate.toISOString().split("T")[0];
  const dailyLectures = dailyAttendanceData[dateStr] || [];
  const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const changeDate = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d);
  };

  const handleLeaveSubmit = () => {
    if (!leaveFrom || !leaveTo || !leaveReason.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const newLeave: LeaveApplication = {
      id: Date.now(),
      fromDate: leaveFrom,
      toDate: leaveTo,
      reason: leaveReason,
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };
    setLeaves(prev => [newLeave, ...prev]);
    setLeaveFrom("");
    setLeaveTo("");
    setLeaveReason("");
    toast({ title: "Leave application submitted!" });
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "daily", label: "Daily", icon: <CalendarDays className="h-4 w-4" /> },
    { key: "summary", label: "Summary", icon: <CheckCircle className="h-4 w-4" /> },
    { key: "leave", label: "Leave", icon: <FileText className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Attendance</h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Daily View */}
      {tab === "daily" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Date picker */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
            <button onClick={() => changeDate(-1)} className="p-2 rounded-lg hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            <div className="flex-1 flex items-center justify-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <input type="date" value={dateStr}
                onChange={e => setSelectedDate(new Date(e.target.value + "T00:00:00"))}
                className="bg-transparent text-foreground font-semibold text-sm border-none outline-none" />
              <span className="text-sm text-muted-foreground">({formatDate(selectedDate)})</span>
            </div>
            <button onClick={() => changeDate(1)} className="p-2 rounded-lg hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>

          {/* Lectures */}
          {dailyLectures.length > 0 ? (
            <div className="space-y-3">
              {dailyLectures.map((lec, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-lg border border-border overflow-hidden flex">
                  <div className="flex-1 p-4 border-l-4 border-primary">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" />
                      <span>{lec.time}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{lec.subject}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{lec.faculty}</p>
                  </div>
                  <div className={`w-16 flex items-center justify-center text-lg font-bold text-white
                    ${lec.status === "P" ? "bg-green-600" : lec.status === "A" ? "bg-destructive" : "bg-muted-foreground/40"}`}>
                    {lec.status}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No lectures on this date</p>
              <p className="text-xs mt-1">Weekends and holidays have no scheduled classes</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Summary View */}
      {tab === "summary" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
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
                  <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value"
                      label={({ name, percent, cx, cy, midAngle, outerRadius: oR }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = oR + 30;
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
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="text-xs font-semibold" fill="hsl(var(--foreground))">
                      {overall}/{total}
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
        </motion.div>
      )}

      {/* Leave Application */}
      {tab === "leave" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Apply for leave */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Apply for Leave</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">From Date</label>
                <input type="date" value={leaveFrom} onChange={e => setLeaveFrom(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">To Date</label>
                <input type="date" value={leaveTo} onChange={e => setLeaveTo(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Reason</label>
              <textarea value={leaveReason} onChange={e => setLeaveReason(e.target.value)}
                placeholder="Enter reason for leave..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm min-h-[80px] resize-none" />
            </div>
            <button onClick={handleLeaveSubmit}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              <Send className="h-4 w-4" /> Submit Application
            </button>
          </div>

          {/* Leave history */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Leave History</h3>
            {leaves.map((leave, i) => (
              <motion.div key={leave.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{leave.reason}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(leave.fromDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      {leave.fromDate !== leave.toDate && ` - ${new Date(leave.toDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}`}
                    </p>
                    <p className="text-xs text-muted-foreground">Applied: {new Date(leave.appliedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                    ${leave.status === "Approved" ? "bg-success/10 text-success" : leave.status === "Rejected" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                    {leave.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Attendance;

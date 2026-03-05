import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { attendanceData, timetableData } from "@/data/mockData";
import { AlertTriangle, CheckCircle, CalendarDays, FileText, ChevronLeft, ChevronRight, Send, Clock, Coffee } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { useToast } from "@/hooks/use-toast";

// Generate realistic daily attendance using exact timetable schedule
const generateDailyAttendance = () => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
  const data: Record<string, { subject: string; faculty: string; time: string; type: string; status: "P" | "A" | "N" }[]> = {};
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Seed-based pseudo-random for consistency
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };

  for (let m = 0; m < 3; m++) {
    const daysInMonth = new Date(2026, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(2026, m, d);
      const dayName = dayNames[date.getDay()];
      const dateStr = date.toISOString().split("T")[0];

      // Don't generate attendance for future dates
      if (dateStr > todayStr) continue;

      if (dayName === "Sunday" || dayName === "Saturday") continue;
      const schedule = timetableData[dayName as keyof typeof timetableData];
      if (!schedule) continue;

      const daySeed = d + m * 31 + 2026;
      const dayRand = seededRandom(daySeed);

      // ~8% chance of being fully absent (sudden holiday/sick day)
      const isFullAbsent = dayRand < 0.08;

      data[dateStr] = schedule.map((cls, i) => {
        if (cls.subject === "Break") {
          return { subject: cls.subject, faculty: cls.faculty, time: cls.time, type: cls.type, status: "N" as const };
        }

        if (isFullAbsent) {
          return { subject: cls.subject, faculty: cls.faculty, time: cls.time, type: cls.type, status: "A" as const };
        }

        // ~12% chance of being absent for individual lectures
        const lectureRand = seededRandom(daySeed * 10 + i * 7 + 3);
        const status: "P" | "A" = lectureRand < 0.12 ? "A" : "P";

        return { subject: cls.subject, faculty: cls.faculty, time: cls.time, type: cls.type, status };
      });
    }
  }

  // For today specifically, if it's a weekday and we have schedule, mark as "N" (not yet marked) for future lectures
  if (data[todayStr]) {
    // Keep as-is since we already generated it
  } else {
    const dayName = dayNames[today.getDay()];
    if (dayName !== "Sunday" && dayName !== "Saturday") {
      const schedule = timetableData[dayName as keyof typeof timetableData] || timetableData.Monday;
      data[todayStr] = schedule.map((cls) => ({
        subject: cls.subject,
        faculty: cls.faculty,
        time: cls.time,
        type: cls.type,
        status: cls.subject === "Break" ? ("N" as const) : ("P" as const),
      }));
    }
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
  const [tab, setTab] = useState<Tab>("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const dateStr = selectedDate.toISOString().split("T")[0];
  const dailyLectures = dailyAttendanceData[dateStr] || [];
  const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

  // Check if selected date is in the future
  const isFutureDate = dateStr > new Date().toISOString().split("T")[0];

  const changeDate = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d);
  };

  // Swipe handlers for date navigation
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) changeDate(diff > 0 ? 1 : -1);
    setTouchStart(null);
  };

  // Week calendar
  const getWeekDates = () => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
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

  const presentCount = dailyLectures.filter(l => l.status === "P").length;
  const absentCount = dailyLectures.filter(l => l.status === "A").length;
  const lectureCount = dailyLectures.filter(l => l.subject !== "Break").length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground">Attendance</h1>

      {/* Tabs - full width on mobile */}
      <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.icon}<span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Daily View */}
      <AnimatePresence mode="wait">
        {tab === "daily" && (
          <motion.div key="daily" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Swipeable week calendar */}
            <div
              ref={calendarRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="bg-card border border-border rounded-xl p-3 md:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => changeDate(-7)} className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-transform">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <p className="font-semibold text-foreground text-sm">{selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                  <p className="text-xs text-muted-foreground">{dayName}</p>
                </div>
                <button onClick={() => changeDate(7)} className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-transform">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className="text-center text-[10px] text-muted-foreground font-medium pb-1">{d}</div>
                ))}
                {getWeekDates().map((d, i) => {
                  const isSelected = d.toISOString().split("T")[0] === dateStr;
                  const isToday = d.toISOString().split("T")[0] === new Date().toISOString().split("T")[0];
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                  const isFuture = d.toISOString().split("T")[0] > new Date().toISOString().split("T")[0];
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center py-2 rounded-xl text-sm font-medium transition-all active:scale-95
                        ${isSelected ? "bg-primary text-primary-foreground shadow-md" :
                          isToday ? "bg-primary/10 text-primary" :
                          isFuture ? "text-muted-foreground/30" :
                          isWeekend ? "text-muted-foreground/50" : "text-foreground hover:bg-muted"}`}
                    >
                      <span className="text-sm font-semibold">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-1 mt-3">
                <input type="date" value={dateStr}
                  onChange={e => setSelectedDate(new Date(e.target.value + "T00:00:00"))}
                  className="bg-muted/50 text-foreground text-xs px-3 py-1.5 rounded-lg border border-border outline-none" />
              </div>
            </div>

            {/* Future date notice */}
            {isFutureDate && (
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
                <CalendarDays className="h-8 w-8 mx-auto mb-2 text-warning opacity-70" />
                <p className="font-medium text-foreground text-sm">Future Date</p>
                <p className="text-xs text-muted-foreground mt-1">Attendance data is not available for future dates</p>
              </div>
            )}

            {/* Daily stats */}
            {!isFutureDate && lectureCount > 0 && (
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-card border border-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{lectureCount}</p>
                  <p className="text-[10px] text-muted-foreground">Lectures</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-success">{presentCount}</p>
                  <p className="text-[10px] text-muted-foreground">Present</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-destructive">{absentCount}</p>
                  <p className="text-[10px] text-muted-foreground">Absent</p>
                </div>
              </div>
            )}

            {/* Lecture cards */}
            {!isFutureDate && dailyLectures.length > 0 ? (
              <div className="space-y-2.5">
                {dailyLectures.map((lec, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className={`bg-card rounded-xl border border-border overflow-hidden ${lec.subject === "Break" ? "opacity-60" : ""}`}>
                    {lec.subject === "Break" ? (
                      <div className="flex items-center gap-3 p-3 bg-muted/30">
                        <Coffee className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Break</p>
                          <p className="text-xs text-muted-foreground">{lec.time}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div className={`w-1.5 ${lec.status === "P" ? "bg-success" : lec.status === "A" ? "bg-destructive" : "bg-muted-foreground/30"}`} />
                        <div className="flex-1 p-3 md:p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm leading-tight">{lec.subject}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">{lec.faculty}</p>
                            </div>
                            <div className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold
                              ${lec.status === "P" ? "bg-success/10 text-success" : lec.status === "A" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                              {lec.status === "P" ? "Present" : lec.status === "A" ? "Absent" : "—"}
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{lec.time}</span>
                            {lec.type && <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${lec.type === "Lab" ? "bg-accent/10 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{lec.type}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : !isFutureDate ? (
              <div className="text-center py-16 text-muted-foreground">
                <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="font-medium">No lectures on this date</p>
                <p className="text-xs mt-1">Weekends and holidays have no scheduled classes</p>
              </div>
            ) : null}
          </motion.div>
        )}

        {/* Summary View */}
        {tab === "summary" && (
          <motion.div key="summary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 md:space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-card rounded-xl border border-border p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{overallPct}%</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Overall</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-success">{overall}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Present</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-3 md:p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{total}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">Total</p>
              </div>
            </div>

            {/* Charts - stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-card rounded-xl border border-border p-3 md:p-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Subject-wise Attendance</h3>
                <div className="h-48 md:h-56">
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

              <div className="bg-card rounded-xl border border-border p-3 md:p-4">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Overall Distribution</h3>
                <div className="h-56 md:h-72 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value"
                        label={({ name, percent, cx, cy, midAngle, outerRadius: oR }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = oR + 25;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <text x={x} y={y} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" className="text-[10px] md:text-xs" fill="hsl(var(--foreground))">
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

            {/* Subject-wise expandable cards */}
            <div className="space-y-2.5">
              {attendanceData.map((subj, i) => {
                const isLow = subj.percentage < 80;
                return (
                  <motion.div key={subj.subject} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className="bg-card rounded-xl border border-border p-3 md:p-4 card-hover">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {isLow ? <AlertTriangle className="h-4 w-4 text-destructive shrink-0" /> : <CheckCircle className="h-4 w-4 text-success shrink-0" />}
                        <h3 className="font-semibold text-foreground text-sm truncate">{subj.subject}</h3>
                      </div>
                      <span className={`text-sm font-bold shrink-0 ml-2 ${isLow ? "text-destructive" : "text-success"}`}>{subj.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${subj.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.06 }}
                        className={`h-full rounded-full ${isLow ? "bg-destructive" : "bg-success"}`} />
                    </div>
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                      <span>Total: {subj.total}</span>
                      <span className="text-success">P: {subj.present}</span>
                      <span className="text-destructive">A: {subj.absent}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Leave Application */}
        {tab === "leave" && (
          <motion.div key="leave" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 md:space-y-6">
            <div className="bg-card rounded-xl border border-border p-4 md:p-5">
              <h3 className="font-semibold text-foreground mb-4">Apply for Leave</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">From Date</label>
                  <input type="date" value={leaveFrom} onChange={e => setLeaveFrom(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">To Date</label>
                  <input type="date" value={leaveTo} onChange={e => setLeaveTo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-1 block">Reason</label>
                <textarea value={leaveReason} onChange={e => setLeaveReason(e.target.value)}
                  placeholder="Enter reason for leave..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm min-h-[80px] resize-none" />
              </div>
              <button onClick={handleLeaveSubmit}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium btn-lift">
                <Send className="h-4 w-4" /> Submit Application
              </button>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-semibold text-foreground">Leave History</h3>
              {leaves.map((leave, i) => (
                <motion.div key={leave.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border p-3 md:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{leave.reason}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{leave.fromDate} → {leave.toDate}</p>
                      <p className="text-[10px] text-muted-foreground">Applied: {leave.appliedOn}</p>
                    </div>
                    <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium
                      ${leave.status === "Approved" ? "bg-success/10 text-success" :
                        leave.status === "Rejected" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>
                      {leave.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Attendance;

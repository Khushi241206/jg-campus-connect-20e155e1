import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CalendarDays, GraduationCap, Users, Clock, MapPin } from "lucide-react";
import { examSchedule } from "@/data/mockData";

type Tab = "courses" | "calendar" | "class-info";

const courses = [
  { code: "CS401", name: "Machine Learning", faculty: "Mr. Sameer Deo", credits: 4, type: "Core" },
  { code: "CS402", name: "Computer Networks", faculty: "Mr. Sharad Patidar", credits: 4, type: "Core" },
  { code: "CS403", name: "Software Engineering", faculty: "Miss. Neelu Verma", credits: 3, type: "Core" },
  { code: "CS404", name: "UI/UX Design", faculty: "Ms. Anukreeti Chaudhary", credits: 3, type: "Core" },
  { code: "MA401", name: "Vector Calculus", faculty: "Dr. R.K. Sharma", credits: 4, type: "Core" },
  { code: "OE401", name: "Sustainable Energy", faculty: "Dr. A. Gupta", credits: 2, type: "Open Elective" },
  { code: "OE402", name: "Entrepreneurship", faculty: "Prof. M. Singh", credits: 2, type: "Open Elective" },
];

const academicCalendar = [
  { event: "Semester 4 Begins", date: "6 Jan 2026", type: "academic" as const },
  { event: "Mid-Term Examinations", date: "16 - 21 Feb 2026", type: "exam" as const },
  { event: "Holi Break", date: "14 - 15 Mar 2026", type: "holiday" as const },
  { event: "Internal Examinations", date: "6 - 15 Apr 2026", type: "exam" as const },
  { event: "External Examinations", date: "23 - 30 Apr 2026", type: "exam" as const },
  { event: "Semester 4 Ends", date: "30 Apr 2026", type: "academic" as const },
];

const Academics = () => {
  const [tab, setTab] = useState<Tab>("class-info");

  const tabs: { key: Tab; label: string }[] = [
    { key: "class-info", label: "Class Info" },
    { key: "courses", label: "Courses" },
    { key: "calendar", label: "Academic Calendar" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Academics</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Class Info */}
      {tab === "class-info" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-card rounded-lg border border-border p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">B.Tech - AI & ML</h3>
                <p className="text-xs text-muted-foreground">Semester 4 • 2025-2026</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xs">Division</span>
                </div>
                <p className="font-semibold text-foreground text-sm">Division B</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs">Room</span>
                </div>
                <p className="font-semibold text-foreground text-sm">Room 403</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">Timings</span>
                </div>
                <p className="font-semibold text-foreground text-sm">1:30 - 4:50 PM</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="text-xs">Total Credits</span>
                </div>
                <p className="font-semibold text-foreground text-sm">{courses.reduce((s, c) => s + c.credits, 0)}</p>
              </div>
            </div>
          </div>

          {/* Exam Schedule (moved from Exams) */}
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Upcoming Exam Schedule
            </h3>
            <div className="space-y-2">
              {examSchedule.map((exam, i) => (
                <motion.div key={exam.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-primary font-medium">{new Date(exam.date).toLocaleDateString("en", { month: "short" })}</span>
                    <span className="text-base font-bold text-primary">{new Date(exam.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{exam.subject}</p>
                    <p className="text-xs text-muted-foreground">{exam.time} • {exam.room}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium shrink-0">{exam.type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Courses */}
      {tab === "courses" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {courses.map((course, i) => (
            <motion.div key={course.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{course.name}</p>
                    <p className="text-xs text-muted-foreground">{course.code} • {course.faculty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{course.type}</span>
                  <p className="text-xs text-muted-foreground mt-1">{course.credits} Credits</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Academic Calendar */}
      {tab === "calendar" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="bg-card rounded-lg border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Semester 4 Academic Calendar (2025-2026)</h3>
            <div className="space-y-3">
              {academicCalendar.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-10 rounded-full shrink-0
                    ${item.type === "exam" ? "bg-destructive" : item.type === "holiday" ? "bg-warning" : "bg-primary"}`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{item.event}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${item.type === "exam" ? "bg-destructive/10 text-destructive" : item.type === "holiday" ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"}`}>
                    {item.type === "exam" ? "Exam" : item.type === "holiday" ? "Holiday" : "Academic"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> Academic</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-destructive" /> Exam</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-warning" /> Holiday</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Academics;

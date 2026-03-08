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
  { code: "MA401", name: "Vector Calculus", faculty: "Miss. Neelu Verma", credits: 4, type: "Core" },
  { code: "OE401", name: "Sustainable Energy", faculty: "Ms. Anukreeti Chaudhary", credits: 2, type: "Open Elective" },
  { code: "OE402", name: "Entrepreneurship", faculty: "Mr. Sharad Patidar", credits: 2, type: "Open Elective" },
];

const academicCalendar = [
  { event: "Semester 4 Begins", date: "6 Jan 2026", type: "academic" as const },
  { event: "Mid-Term Examinations", date: "16 - 21 Feb 2026", type: "exam" as const },
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
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Academics</h1>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all btn-lift
              ${tab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Class Info */}
      {tab === "class-info" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 card-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">B.Tech - AI & ML</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Semester 4 • 2025-2026</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: "Division", value: "Division B" },
                { icon: MapPin, label: "Room", value: "Room 403" },
                { icon: Clock, label: "Timings", value: "1:30 - 4:50 PM" },
                { icon: BookOpen, label: "Total Credits", value: String(courses.reduce((s, c) => s + c.credits, 0)) },
              ].map(item => (
                <div key={item.label} className="bg-muted/30 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="text-xs">{item.label}</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Schedule */}
          <div className="bg-card rounded-xl border border-border p-5 card-shadow">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-primary" /> Upcoming Exam Schedule
            </h3>
            <div className="space-y-2">
              {examSchedule.map((exam, i) => (
                <motion.div key={exam.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] text-primary font-medium">{new Date(exam.date).toLocaleDateString("en", { month: "short" })}</span>
                    <span className="text-base font-bold text-primary leading-none">{new Date(exam.date).getDate()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{exam.subject}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{exam.time} • {exam.room}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium shrink-0">{exam.type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Courses */}
      {tab === "courses" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
          {courses.map((course, i) => (
            <motion.div key={course.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 card-hover card-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{course.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{course.code} • {course.faculty}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">{course.type}</span>
                  <p className="text-xs text-muted-foreground mt-1 tabular-nums">{course.credits} Credits</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Academic Calendar */}
      {tab === "calendar" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-card rounded-xl border border-border p-5 card-shadow">
            <h3 className="font-semibold text-foreground mb-4">Semester 4 Academic Calendar (2025-2026)</h3>
            <div className="space-y-2.5">
              {academicCalendar.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
                  <div className={`w-[3px] h-10 rounded-full shrink-0
                    ${item.type === "exam" ? "bg-destructive" : "bg-primary"}`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{item.event}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0
                    ${item.type === "exam" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                    {item.type === "exam" ? "Exam" : "Academic"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary" /> Academic</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-destructive" /> Exam</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Academics;
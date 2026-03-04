import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timetableData } from "@/data/mockData";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Friday");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const classes = timetableData[selectedDay as keyof typeof timetableData] || [];

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground">Time Table</h1>
      <p className="text-xs md:text-sm text-muted-foreground -mt-2 md:-mt-4">Year 2 - Div B &nbsp;|&nbsp; Room: 403</p>

      {/* Day Tabs - scrollable on mobile */}
      <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => { setSelectedDay(day); setExpandedIdx(null); }}
            className={`flex-1 md:flex-none px-3 md:px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all btn-lift
              ${selectedDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
          >
            <span className="md:hidden">{day.slice(0, 3)}</span>
            <span className="hidden md:inline">{day}</span>
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Time</th>
                <th className="text-left p-3 font-semibold text-foreground">Subject</th>
                <th className="text-left p-3 font-semibold text-foreground">Faculty</th>
                <th className="text-left p-3 font-semibold text-foreground">Room</th>
                <th className="text-left p-3 font-semibold text-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classes.map((cls, i) => (
                <tr key={i} className={`transition-colors hover:bg-muted/30 ${cls.subject === "Break" ? "bg-muted/20" : ""}`}>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{cls.time}</td>
                  <td className="p-3 font-medium text-foreground">{cls.subject}</td>
                  <td className="p-3 text-muted-foreground">{cls.faculty || "—"}</td>
                  <td className="p-3 text-muted-foreground">{cls.room || "—"}</td>
                  <td className="p-3">
                    {cls.type && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium
                        ${cls.type === "Lab" || cls.type === "Practical" ? "bg-accent/20 text-accent-foreground" : "bg-success/10 text-success"}`}>
                        {cls.type}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile expandable cards */}
      <div className="md:hidden space-y-2">
        <AnimatePresence>
          {classes.map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`bg-card rounded-xl border border-border overflow-hidden ${cls.subject === "Break" ? "opacity-60" : ""}`}
            >
              <button
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-3 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col items-center text-[10px] text-muted-foreground shrink-0 w-12">
                    <Clock className="h-3 w-3 mb-0.5" />
                    <span>{cls.time.split(" - ")[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{cls.faculty || ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {cls.type && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium
                      ${cls.type === "Lab" ? "bg-accent/20 text-accent-foreground" : "bg-success/10 text-success"}`}>
                      {cls.type}
                    </span>
                  )}
                  {cls.subject !== "Break" && (
                    expandedIdx === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              {expandedIdx === i && cls.subject !== "Break" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-3 pb-3 border-t border-border pt-2"
                >
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{cls.time}</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground">Room</p>
                      <p className="font-medium text-foreground">{cls.room || "—"}</p>
                    </div>
                    <div className="p-2 bg-muted/30 rounded-lg col-span-2">
                      <p className="text-muted-foreground">Faculty</p>
                      <p className="font-medium text-foreground">{cls.faculty || "—"}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timetable;

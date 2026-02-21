import { useState } from "react";
import { timetableData } from "@/data/mockData";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Friday");
  const classes = timetableData[selectedDay as keyof typeof timetableData] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Time Table</h1>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all btn-lift
              ${selectedDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-semibold text-foreground">Time</th>
                <th className="text-left p-3 font-semibold text-foreground">Subject</th>
                <th className="text-left p-3 font-semibold text-foreground hidden sm:table-cell">Faculty</th>
                <th className="text-left p-3 font-semibold text-foreground hidden md:table-cell">Room</th>
                <th className="text-left p-3 font-semibold text-foreground">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {classes.map((cls, i) => (
                <tr key={i} className={`transition-colors hover:bg-muted/30 ${cls.subject === "Lunch Break" ? "bg-muted/20" : ""}`}>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{cls.time}</td>
                  <td className="p-3 font-medium text-foreground">{cls.subject}</td>
                  <td className="p-3 text-muted-foreground hidden sm:table-cell">{cls.faculty || "—"}</td>
                  <td className="p-3 text-muted-foreground hidden md:table-cell">{cls.room || "—"}</td>
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
    </div>
  );
};

export default Timetable;

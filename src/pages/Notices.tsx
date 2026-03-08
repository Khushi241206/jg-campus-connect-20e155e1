import { useState } from "react";
import { motion } from "framer-motion";
import { notices } from "@/data/mockData";
import { AlertTriangle } from "lucide-react";

const categories = ["All", "Exam", "Event", "General", "Fees", "Attendance"];

const Notices = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? notices : notices.filter(n => n.category === filter);

  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Notices</h1>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all btn-lift
              ${filter === c ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-foreground hover:bg-muted card-shadow"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-card rounded-xl border p-4 md:p-5 card-hover card-shadow ${n.urgent ? "border-destructive/30" : "border-border"}`}
          >
            <div className="flex items-start gap-3">
              {n.urgent && <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {n.urgent && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">Urgent</span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{n.category}</span>
                </div>
                <h3 className="font-semibold text-foreground leading-snug">{n.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{n.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{n.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
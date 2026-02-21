import { useState } from "react";
import { motion } from "framer-motion";
import { assignments } from "@/data/mockData";

type Filter = "all" | "pending" | "submitted" | "graded";

const statusStyles = {
  pending: "bg-warning/10 text-warning",
  submitted: "bg-primary/10 text-primary",
  graded: "bg-success/10 text-success",
};

const Assignments = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", "pending", "submitted", "graded"];
  const filtered = filter === "all" ? assignments : assignments.filter(a => a.status === filter);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Assignments</h1>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all btn-lift
              ${filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground hover:bg-muted"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-lg border border-border p-4 card-hover"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{a.title}</h3>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyles[a.status]}`}>
                {a.status === "graded" ? `Graded (${a.grade})` : a.status}
              </span>
            </div>
            <p className="text-sm text-primary font-medium">{a.subject}</p>
            <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Deadline: {a.deadline}</span>
              {a.status === "pending" && (
                <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium btn-lift">
                  Submit
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;

import { motion } from "framer-motion";
import { results } from "@/data/mockData";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Results = () => {
  const [expandedSem, setExpandedSem] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Results</h1>

      {/* CGPA Card */}
      <div className="bg-card rounded-lg border border-border p-6 text-center">
        <p className="text-sm text-muted-foreground">Cumulative GPA</p>
        <p className="text-5xl font-bold text-primary mt-1">{results.cgpa}</p>
      </div>

      {/* Semesters */}
      <div className="space-y-3">
        {results.semesters.map((sem, i) => (
          <motion.div
            key={sem.sem}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-lg border border-border overflow-hidden card-hover"
          >
            <button
              onClick={() => setExpandedSem(expandedSem === sem.sem ? null : sem.sem)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  S{sem.sem}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Semester {sem.sem}</p>
                  <p className="text-xs text-muted-foreground">{sem.subjects.length} subjects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary">SGPA: {sem.sgpa}</span>
                {expandedSem === sem.sem ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            {expandedSem === sem.sem && (
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 font-medium text-foreground">Subject</th>
                      <th className="text-center p-3 font-medium text-foreground">Grade</th>
                      <th className="text-center p-3 font-medium text-foreground">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sem.subjects.map((sub) => (
                      <tr key={sub.name}>
                        <td className="p-3 text-foreground">{sub.name}</td>
                        <td className="p-3 text-center font-semibold text-primary">{sub.grade}</td>
                        <td className="p-3 text-center text-muted-foreground">{sub.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Results;

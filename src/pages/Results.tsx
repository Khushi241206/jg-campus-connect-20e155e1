import { motion } from "framer-motion";
import { results } from "@/data/mockData";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const gradePoints: Record<string, number> = { "A+": 10, "A": 9, "B+": 8, "B": 7, "C+": 6, "C": 5 };

const Results = () => {
  const [expandedSem, setExpandedSem] = useState<number | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const downloadSemesterPDF = (semNum: number) => {
    const sem = results.semesters.find(s => s.sem === semNum);
    if (!sem) return;

    const content = `
========================================================
           JG UNIVERSITY - SEMESTER RESULT REPORT
========================================================

Student Name:     ${profile?.full_name || user?.email || "Student"}
Enrollment No:    ${profile?.enrollment_number || "N/A"}
Program:          B.Tech - AI-ML
Semester:         ${sem.sem}
SGPA:             ${sem.sgpa}
CGPA:             ${results.cgpa}

--------------------------------------------------------
SUBJECT-WISE RESULTS
--------------------------------------------------------
${"Subject".padEnd(30)}${"Grade".padEnd(10)}Credits
--------------------------------------------------------
${sem.subjects.map(s => `${s.name.padEnd(30)}${s.grade.padEnd(10)}${s.credits}`).join("\n")}
--------------------------------------------------------

Total Credits:    ${sem.subjects.reduce((s, sub) => s + sub.credits, 0)}
SGPA:             ${sem.sgpa}
Grade Points:     ${sem.subjects.map(s => `${s.grade}(${gradePoints[s.grade] || 0})`).join(", ")}

========================================================
Generated on: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
Report ID: JGU-RES-SEM${sem.sem}-${Date.now().toString(36).toUpperCase()}

This is a computer-generated result report.
========================================================
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `JGU_Semester_${sem.sem}_Result_${profile?.enrollment_number || "student"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Report Downloaded! ✅", description: `Semester ${sem.sem} result report saved.` });
  };

  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Results</h1>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8 text-center card-shadow">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Cumulative GPA</p>
        <p className="text-5xl font-bold text-primary mt-2 leading-none">{results.cgpa}</p>
      </div>

      <div className="space-y-3">
        {results.semesters.map((sem, i) => (
          <motion.div key={sem.sem} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border overflow-hidden card-hover card-shadow">
            <button onClick={() => setExpandedSem(expandedSem === sem.sem ? null : sem.sem)} className="w-full flex items-center justify-between p-4 md:p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">S{sem.sem}</div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Semester {sem.sem}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sem.subjects.length} subjects</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary tabular-nums">SGPA: {sem.sgpa}</span>
                {expandedSem === sem.sem ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            {expandedSem === sem.sem && (
              <div className="border-t border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left p-3.5 font-medium text-foreground text-xs uppercase tracking-wide">Subject</th>
                      <th className="text-center p-3.5 font-medium text-foreground text-xs uppercase tracking-wide">Grade</th>
                      <th className="text-center p-3.5 font-medium text-foreground text-xs uppercase tracking-wide">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {sem.subjects.map((sub) => (
                      <tr key={sub.name} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3.5 text-foreground">{sub.name}</td>
                        <td className="p-3.5 text-center font-semibold text-primary">{sub.grade}</td>
                        <td className="p-3.5 text-center text-muted-foreground tabular-nums">{sub.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 border-t border-border">
                  <button onClick={() => downloadSemesterPDF(sem.sem)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all btn-lift">
                    <Download className="h-4 w-4" /> Download Semester {sem.sem} Report
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Results;
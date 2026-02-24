import { useState } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle2, AlertCircle, ChevronRight, ArrowLeft, Timer } from "lucide-react";
import { examSchedule, onlineTests, OnlineTest, MCQQuestion } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Tab = "schedule" | "tests" | "test-results";

const Exams = () => {
  const [tab, setTab] = useState<Tab>("schedule");
  const [activeTest, setActiveTest] = useState<OnlineTest | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const { toast } = useToast();

  const tabs: { key: Tab; label: string }[] = [
    { key: "schedule", label: "Exam Schedule" },
    { key: "tests", label: "Online Tests" },
    { key: "test-results", label: "Test Results" },
  ];

  const startTest = (test: OnlineTest) => {
    setActiveTest(test);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTimeLeft(test.duration * 60);
  };

  const submitTest = () => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const totalScore = Math.round((correct / activeTest.questions.length) * activeTest.totalMarks);
    setScore(totalScore);
    setSubmitted(true);
    toast({ title: "Test Submitted!", description: `You scored ${totalScore}/${activeTest.totalMarks}` });
  };

  const exitTest = () => {
    setActiveTest(null);
    setSubmitted(false);
    setAnswers({});
  };

  // Active test view
  if (activeTest && !submitted) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={exitTest} className="p-2 rounded-lg hover:bg-muted"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{activeTest.title}</h1>
              <p className="text-sm text-muted-foreground">{activeTest.subject} • {activeTest.totalMarks} Marks</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
            <Timer className="h-4 w-4" />
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-4">
          {activeTest.questions.map((q, idx) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-lg border border-border p-5">
              <p className="font-medium text-foreground mb-3">
                <span className="text-primary mr-2">Q{idx + 1}.</span>{q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                    className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-all
                      ${answers[q.id] === oi ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-muted text-foreground"}`}>
                    <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">{Object.keys(answers).length}/{activeTest.questions.length} answered</p>
          <button onClick={submitTest}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
            Submit Test
          </button>
        </div>
      </div>
    );
  }

  // Test result view
  if (activeTest && submitted) {
    const percentage = Math.round((score / activeTest.totalMarks) * 100);
    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={exitTest} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Tests
        </button>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-lg border border-border p-8 text-center max-w-md mx-auto">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${percentage >= 60 ? "bg-success/10" : "bg-destructive/10"}`}>
            <span className={`text-2xl font-bold ${percentage >= 60 ? "text-success" : "text-destructive"}`}>{percentage}%</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{activeTest.title}</h2>
          <p className="text-muted-foreground mt-1">{activeTest.subject}</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div><p className="font-bold text-foreground text-lg">{score}</p><p className="text-muted-foreground">Score</p></div>
            <div className="w-px bg-border" />
            <div><p className="font-bold text-foreground text-lg">{activeTest.totalMarks}</p><p className="text-muted-foreground">Total</p></div>
          </div>
          <p className={`mt-4 text-sm font-medium ${percentage >= 60 ? "text-success" : "text-destructive"}`}>
            {percentage >= 80 ? "Excellent! 🎉" : percentage >= 60 ? "Good job! 👍" : "Needs improvement 📚"}
          </p>
        </motion.div>

        {/* Answer review */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Answer Review</h3>
          {activeTest.questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
                <p className="text-sm font-medium text-foreground mb-1">Q{idx + 1}. {q.question}</p>
                <p className="text-xs text-muted-foreground">Your answer: <span className={isCorrect ? "text-success" : "text-destructive"}>{q.options[userAns] ?? "Not answered"}</span></p>
                {!isCorrect && <p className="text-xs text-success mt-0.5">Correct: {q.options[q.correctAnswer]}</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Main view with tabs
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Exams & Online Tests</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "schedule" && (
        <div className="space-y-3">
          {examSchedule.map((exam, i) => (
            <motion.div key={exam.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs text-primary font-medium">{new Date(exam.date).toLocaleDateString("en", { month: "short" })}</span>
                <span className="text-lg font-bold text-primary">{new Date(exam.date).getDate()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{exam.subject}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{exam.time} • {exam.room}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-warning/10 text-warning font-medium shrink-0">{exam.type}</span>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "tests" && (
        <div className="space-y-3">
          {onlineTests.map((test, i) => (
            <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${test.status === "available" ? "bg-success/10 text-success" : test.status === "completed" ? "bg-muted text-muted-foreground" : "bg-warning/10 text-warning"}`}>
                    {test.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : test.status === "available" ? <ClipboardList className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{test.title}</p>
                    <p className="text-xs text-muted-foreground">{test.subject} • {test.totalMarks} marks • {test.duration} min</p>
                  </div>
                </div>
                {test.status === "available" && (
                  <button onClick={() => startTest(test)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90">
                    Start <ChevronRight className="h-3 w-3" />
                  </button>
                )}
                {test.status === "completed" && (
                  <span className="text-sm font-semibold text-success">{test.score}/{test.totalMarks}</span>
                )}
                {test.status === "upcoming" && (
                  <span className="text-xs text-muted-foreground">{test.date}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "test-results" && (
        <div className="space-y-3">
          {onlineTests.filter(t => t.status === "completed").map((test, i) => (
            <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{test.title}</p>
                <p className="text-xs text-muted-foreground">{test.subject} • {test.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{test.score}/{test.totalMarks}</p>
                <p className={`text-xs font-medium ${(test.score! / test.totalMarks) >= 0.6 ? "text-success" : "text-destructive"}`}>
                  {Math.round((test.score! / test.totalMarks) * 100)}%
                </p>
              </div>
            </motion.div>
          ))}
          {onlineTests.filter(t => t.status === "completed").length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No completed tests yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exams;

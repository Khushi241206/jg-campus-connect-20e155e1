import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle2, AlertCircle, ChevronRight, ArrowLeft, Timer } from "lucide-react";
import { onlineTests as initialTests, OnlineTest, MCQQuestion } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Tab = "tests" | "test-results";

interface CompletedTest {
  id: number;
  subject: string;
  title: string;
  totalMarks: number;
  score: number;
  date: string;
  percentage: number;
}

const Exams = () => {
  const [tab, setTab] = useState<Tab>("tests");
  const [activeTest, setActiveTest] = useState<OnlineTest | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedTests, setCompletedTests] = useState<CompletedTest[]>([]);
  const [availableTests, setAvailableTests] = useState(initialTests);
  const { toast } = useToast();

  const tabs: { key: Tab; label: string }[] = [
    { key: "tests", label: "Online Tests" },
    { key: "test-results", label: "Test Results" },
  ];

  const submitTest = useCallback(() => {
    if (!activeTest) return;
    let correct = 0;
    activeTest.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const totalScore = Math.round((correct / activeTest.questions.length) * activeTest.totalMarks);
    setScore(totalScore);
    setSubmitted(true);
    setCompletedTests(prev => [...prev, {
      id: activeTest.id, subject: activeTest.subject, title: activeTest.title,
      totalMarks: activeTest.totalMarks, score: totalScore,
      date: new Date().toISOString().split("T")[0],
      percentage: Math.round((totalScore / activeTest.totalMarks) * 100),
    }]);
    setAvailableTests(prev => prev.map(t => t.id === activeTest.id ? { ...t, status: "completed" as const, score: totalScore } : t));
    toast({ title: "Test Submitted!", description: `You scored ${totalScore}/${activeTest.totalMarks}` });
    window.dispatchEvent(new CustomEvent("exam-mode", { detail: false }));
  }, [activeTest, answers, toast]);

  useEffect(() => {
    if (!activeTest || submitted || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          submitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest, submitted, timeLeft, submitTest]);

  const startTest = (test: OnlineTest) => {
    setActiveTest(test);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setTimeLeft(test.duration * 60);
    window.dispatchEvent(new CustomEvent("exam-mode", { detail: true }));
  };

  const exitTest = () => {
    setActiveTest(null);
    setSubmitted(false);
    setAnswers({});
    window.dispatchEvent(new CustomEvent("exam-mode", { detail: false }));
  };

  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;
  const timerUrgent = timeLeft < 120;

  // Active test view
  if (activeTest && !submitted) {
    return (
      <div className="space-y-5 md:space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={exitTest} className="p-2 rounded-xl hover:bg-muted transition-colors"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-foreground tracking-tight">{activeTest.title}</h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{activeTest.subject} • {activeTest.totalMarks} Marks</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold tabular-nums ${timerUrgent ? "bg-destructive/10 text-destructive animate-pulse" : "bg-warning/10 text-warning"}`}>
            <Timer className="h-4 w-4" />
            {timerMinutes}:{String(timerSeconds).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-4">
          {activeTest.questions.map((q, idx) => (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
              className="bg-card rounded-xl border border-border p-5 card-shadow">
              <p className="font-medium text-foreground mb-3 leading-snug">
                <span className="text-primary mr-2">Q{idx + 1}.</span>{q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                    className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all
                      ${answers[q.id] === oi ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:bg-muted text-foreground"}`}>
                    <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground tabular-nums">{Object.keys(answers).length}/{activeTest.questions.length} answered</p>
          <button onClick={submitTest}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all btn-lift">
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
      <div className="space-y-5 md:space-y-6 animate-fade-in">
        <button onClick={exitTest} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Tests
        </button>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl border border-border p-8 text-center max-w-md mx-auto card-shadow">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${percentage >= 60 ? "bg-success/10" : "bg-destructive/10"}`}>
            <span className={`text-2xl font-bold tabular-nums ${percentage >= 60 ? "text-success" : "text-destructive"}`}>{percentage}%</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{activeTest.title}</h2>
          <p className="text-muted-foreground mt-1">{activeTest.subject}</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <div><p className="font-bold text-foreground text-lg tabular-nums">{score}</p><p className="text-muted-foreground">Score</p></div>
            <div className="w-px bg-border" />
            <div><p className="font-bold text-foreground text-lg tabular-nums">{activeTest.totalMarks}</p><p className="text-muted-foreground">Total</p></div>
          </div>
          <p className={`mt-4 text-sm font-medium ${percentage >= 60 ? "text-success" : "text-destructive"}`}>
            {percentage >= 80 ? "Excellent! 🎉" : percentage >= 60 ? "Good job! 👍" : "Needs improvement 📚"}
          </p>
        </motion.div>

        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Answer Review</h3>
          {activeTest.questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            return (
              <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}>
                <p className="text-sm font-medium text-foreground mb-1 leading-snug">Q{idx + 1}. {q.question}</p>
                <p className="text-xs text-muted-foreground">Your answer: <span className={isCorrect ? "text-success" : "text-destructive"}>{q.options[userAns] ?? "Not answered"}</span></p>
                {!isCorrect && <p className="text-xs text-success mt-0.5">Correct: {q.options[q.correctAnswer]}</p>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">Exams & Online Tests</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all btn-lift
              ${tab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "tests" && (
        <div className="space-y-3">
          {availableTests.map((test, i) => (
            <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 card-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${test.status === "available" ? "bg-success/10 text-success" : test.status === "completed" ? "bg-muted text-muted-foreground" : "bg-warning/10 text-warning"}`}>
                    {test.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : test.status === "available" ? <ClipboardList className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{test.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{test.subject} • {test.totalMarks} marks • {test.duration} min</p>
                  </div>
                </div>
                {test.status === "available" && (
                  <button onClick={() => startTest(test)} className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 btn-lift">
                    Start <ChevronRight className="h-3 w-3" />
                  </button>
                )}
                {test.status === "completed" && (
                  <span className="text-sm font-semibold text-success tabular-nums">{test.score}/{test.totalMarks}</span>
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
          {completedTests.length > 0 ? completedTests.map((test, i) => (
            <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-between card-shadow">
              <div>
                <p className="font-medium text-foreground">{test.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{test.subject} • {test.date}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground tabular-nums">{test.score}/{test.totalMarks}</p>
                <p className={`text-xs font-medium ${test.percentage >= 60 ? "text-success" : "text-destructive"}`}>{test.percentage}%</p>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-16 text-muted-foreground">
              <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No completed tests yet</p>
              <p className="text-sm mt-1">Take a test to see your results here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Exams;
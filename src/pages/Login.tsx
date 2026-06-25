import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth, StudentSignupData } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import jgCampus from "@/assets/jg-campus.jpeg";
import jgLogo from "@/assets/jg-logo-white.png";

type Mode = "login" | "register";

const Login = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reg, setReg] = useState<StudentSignupData>({
    email: "",
    password: "",
    full_name: "",
    enrollment_number: "",
    program: "",
    semester: "",
    division: "",
    phone: "",
    date_of_birth: "",
    guardian_name: "",
  });

  const { signIn, signUpStudent, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("mode") === "register") setMode("register");
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!" });
    navigate("/dashboard");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reg.password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUpStudent(reg);
    setLoading(false);
    if (error) {
      toast({ title: "Registration failed", description: error, variant: "destructive" });
      return;
    }
    toast({ title: "Account created!", description: "You can now sign in." });
    setEmail(reg.email);
    setMode("login");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setLoading(false);
      toast({ title: "Google sign-in failed", description: error, variant: "destructive" });
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setForgotLoading(false);
    if (error) {
      toast({ title: "Couldn't send email", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: "Reset link sent",
      description: `Check ${forgotEmail} for a password reset link.`,
    });
    setForgotOpen(false);
    setForgotEmail("");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={jgCampus} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 flex-1 hidden lg:flex flex-col justify-center px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-extrabold text-primary-foreground leading-tight">
            Your Academic<br />Journey,<br /><span className="text-accent">Simplified</span>
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-lg max-w-md leading-relaxed">
            Access your timetable, attendance, assignments, results, fees, and notices — all in one place.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-center flex-1 p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full max-w-md glass-card rounded-2xl p-6 md:p-8 shadow-2xl my-6"
        >
          <div className="flex flex-col items-center mb-6">
            <img src={jgLogo} alt="JG University" className="h-16 w-auto mb-2" />
            <p className="text-xs text-muted-foreground">Sponsored by ASIA Charitable Trust</p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-muted rounded-lg mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`py-2 text-sm font-medium rounded-md transition-all ${mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`py-2 text-sm font-medium rounded-md transition-all ${mode === "register" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Field label="Email">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
              </Field>
              <Field label="Password">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls + " pr-10"}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </Field>
              <div className="flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={() => { setForgotEmail(email); setForgotOpen(true); }}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
              <Field label="Full Name"><input required value={reg.full_name} onChange={(e) => setReg({ ...reg, full_name: e.target.value })} className={inputCls} /></Field>
              <Field label="Email"><input type="email" required value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} className={inputCls} /></Field>
              <Field label="Password"><input type="password" required minLength={6} value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} className={inputCls} /></Field>
              <Field label="Enrollment Number"><input required value={reg.enrollment_number} onChange={(e) => setReg({ ...reg, enrollment_number: e.target.value })} className={inputCls} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Program"><input required value={reg.program} onChange={(e) => setReg({ ...reg, program: e.target.value })} className={inputCls} placeholder="B.Tech CSE" /></Field>
                <Field label="Semester"><input required value={reg.semester} onChange={(e) => setReg({ ...reg, semester: e.target.value })} className={inputCls} placeholder="4" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Division"><input required value={reg.division} onChange={(e) => setReg({ ...reg, division: e.target.value })} className={inputCls} placeholder="B" /></Field>
                <Field label="Phone"><input required value={reg.phone} onChange={(e) => setReg({ ...reg, phone: e.target.value })} className={inputCls} /></Field>
              </div>
              <Field label="Date of Birth"><input type="date" required value={reg.date_of_birth} onChange={(e) => setReg({ ...reg, date_of_birth: e.target.value })} className={inputCls} /></Field>
              <Field label="Guardian Name"><input required value={reg.guardian_name} onChange={(e) => setReg({ ...reg, guardian_name: e.target.value })} className={inputCls} /></Field>
              <button type="submit" disabled={loading} className={btnPrimary}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Create Account"}
              </button>
            </form>
          )}

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <button onClick={handleGoogle} disabled={loading} className="w-full py-3 rounded-lg border border-input bg-background hover:bg-muted text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
const btnPrimary = "w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm btn-lift hover:opacity-90 transition-all disabled:opacity-50";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
    {children}
  </div>
);

export default Login;

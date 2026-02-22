import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Clock, UserCheck, FileText, BarChart3, Bell, Mail, Phone, MapPin, Users, GraduationCap, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import jgCampus from "@/assets/jg-campus.jpeg";
import jgLogoWhite from "@/assets/jg-logo-white.png";
import jgLogo from "@/assets/jg-logo.jpeg";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      toast({ title: "Welcome back!", description: "Login successful." });
      navigate("/dashboard");
    } else {
      toast({ title: "Login failed", description: "Please check your credentials.", variant: "destructive" });
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: Clock, title: "Time Table", desc: "Easy-to-read class schedules with real-time updates" },
    { icon: UserCheck, title: "Attendance", desc: "Transparent attendance records with daily tracking" },
    { icon: FileText, title: "Assignments", desc: "Track deadlines and submit assignments on time" },
    { icon: BarChart3, title: "Results", desc: "Subject-wise marks with downloadable results" },
    { icon: Bell, title: "Notices", desc: "Centralized university notices with urgent alerts" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg backdrop-blur-sm" : ""}`}
        style={{ background: scrolled ? "rgba(26, 26, 46, 0.95)" : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={jgLogoWhite} alt="JG University" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("features")} className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</button>
            <button onClick={() => scrollTo("about")} className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</button>
            <button onClick={() => scrollTo("contact")} className="text-white/80 hover:text-white text-sm font-medium transition-colors">Contact</button>
          </div>
          <button onClick={() => scrollTo("hero")}
            className="px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold hover:bg-white/90 transition-all">
            Student Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={jgCampus} alt="JG University Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
              <span className="text-white">Your Academic<br />Journey,</span><br />
              <span style={{ color: "#C89B3C" }}>Simplified</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg max-w-lg leading-relaxed">
              Access your timetable, track attendance, view results, manage fees, and stay updated with university notices — all in one place.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={() => scrollTo("hero")}
                className="px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #8B0000, #A1122F)" }}>
                Get Started <span>→</span>
              </button>
              <button onClick={() => scrollTo("features")}
                className="px-6 py-3 rounded-lg border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all">
                Explore Features
              </button>
            </div>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-md mx-auto lg:ml-auto bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex flex-col items-center mb-6">
              <img src={jgLogo} alt="JG University" className="h-16 w-auto rounded-lg mb-2" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-900/30 transition-all pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="submit"
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #8B0000, #A1122F)" }}>
                Login
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Everything You Need
            </h2>
            <p className="mt-3 text-gray-500 text-lg">One platform to manage your entire academic life at JG University</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #8B0000, #A1122F)" }}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              About JG University
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              JG University is committed to providing excellence in education with a focus on innovation, research, and holistic development. Our state-of-the-art campus features modern facilities for an enriching academic experience.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Sponsored by ASIA Charitable Trust, we offer programs in Engineering, Management, Sciences, and more with a mission to nurture future leaders.
            </p>
            <div className="flex gap-8">
              {[
                { num: "5000+", label: "Students", icon: Users },
                { num: "200+", label: "Faculty", icon: GraduationCap },
                { num: "50+", label: "Programs", icon: BookOpen },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold" style={{ color: "#8B0000" }}>{s.num}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={jgCampus} alt="JG University Campus" className="rounded-2xl shadow-xl w-full object-cover h-80" />
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20" style={{ background: "linear-gradient(135deg, #8B0000, #C0392B)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Get In Touch
            </h2>
            <p className="mt-3 text-white/80 text-lg">Have questions? Reach out to us and we'll be happy to help.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Email", lines: ["connect@jguni.in", "admission@jguni.in"] },
              { icon: Phone, title: "Phone", lines: ["+91 7567 7567 58/59"] },
              { icon: MapPin, title: "Address", lines: ["JG University, ASIA Campus, Drive in Rd,", "Thaltej, Ahmedabad - 380054, Gujarat, India"] },
            ].map((c, i) => (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#8B000015" }}>
                  <c.icon className="h-5 w-5" style={{ color: "#8B0000" }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                {c.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-600">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a2e" }} className="py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60 text-sm">© 2026 JG University. All rights reserved. | Excellence by Choice</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

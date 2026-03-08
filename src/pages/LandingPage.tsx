import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Clock, UserCheck, FileText, BarChart3, Bell, Mail, Phone, MapPin, Users, GraduationCap, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import jgCampus from "@/assets/jg-campus.jpeg";
import jgLogoWhite from "@/assets/jg-logo.jpeg";
import jgLogo from "@/assets/jg-logo-white.png";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
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
    <div className="min-h-screen scroll-smooth" style={{ fontFamily: "'Inter', sans-serif", background: "#fafafa" }}>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "shadow-xl" : ""}`}
        style={{
          background: scrolled
            ? "rgba(26, 26, 46, 0.97)"
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={jgLogoWhite} alt="JG University" className="h-10 w-auto rounded-lg" />
          </div>
          <div className="hidden md:flex items-center gap-10">
            {["features", "about", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider capitalize"
              >
                {id}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setShowLogin(true);
              setTimeout(() => document.getElementById("login-card")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
            }}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              color: "#1a1a2e",
            }}
          >
            Student Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={jgCampus} alt="JG University Campus" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(26,26,46,0.75) 0%, rgba(15,52,96,0.6) 50%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: "rgba(200, 155, 60, 0.2)", color: "#C89B3C", border: "1px solid rgba(200, 155, 60, 0.3)" }}
            >
              Welcome to JG University
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="text-white">Your Academic</span>
              <br />
              <span className="text-white">Journey,</span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #C89B3C 0%, #E8C872 50%, #C89B3C 100%)" }}
              >
                Simplified
              </span>
            </h1>

            <p className="mt-8 text-white/75 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Access your timetable, track attendance, view results, manage fees, and stay updated with university notices — all in one place.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setShowLogin(true);
                  setTimeout(() => document.getElementById("login-card")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
                }}
                className="px-8 py-3.5 rounded-[14px] text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2.5"
                style={{
                  background: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                  boxShadow: "0 8px 32px rgba(139, 0, 0, 0.35)",
                }}
              >
                Get Started <span className="text-lg">→</span>
              </button>
              <button
                onClick={() => scrollTo("features")}
                className="px-8 py-3.5 rounded-[14px] text-white font-semibold text-sm transition-all duration-300 hover:bg-white/15"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Explore Features
              </button>
            </div>
          </motion.div>

          {/* Login Card */}
          {showLogin && (
            <motion.div
              id="login-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md mx-auto lg:ml-auto"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px)",
                borderRadius: "20px",
                padding: "40px 36px",
                boxShadow: "0 24px 64px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="flex flex-col items-center mb-8">
                <img src={jgLogo} alt="JG University" className="h-28 w-72 object-contain mb-3" />
                <p className="text-xs font-medium tracking-wide" style={{ color: "#8B8B8B" }}>
                  Sponsored by ASIA Charitable Trust
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none"
                    style={{
                      borderRadius: "12px",
                      border: "1.5px solid #E5E7EB",
                      background: "#F9FAFB",
                      color: "#1F2937",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#8B0000";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 0, 0, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#E5E7EB";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#374151" }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none pr-11"
                      style={{
                        borderRadius: "12px",
                        border: "1.5px solid #E5E7EB",
                        background: "#F9FAFB",
                        color: "#1F2937",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#8B0000";
                        e.target.style.boxShadow = "0 0 0 3px rgba(139, 0, 0, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#E5E7EB";
                        e.target.style.boxShadow = "none";
                      }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                      style={{ color: "#9CA3AF" }}
                    >
                      {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button type="button" className="text-xs font-medium transition-colors duration-200" style={{ color: "#8B0000" }}>
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                  style={{
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                    boxShadow: "0 6px 24px rgba(139, 0, 0, 0.3)",
                  }}
                >
                  Login
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 lg:py-28" style={{ background: "#F5F5F7" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#8B0000" }}
            >
              Platform Features
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
              Everything You Need
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto font-light" style={{ color: "#6B7280" }}>
              One platform to manage your entire academic life at JG University
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group cursor-pointer text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "18px",
                  padding: "32px 24px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 48px rgba(139, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.04)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                    boxShadow: "0 4px 16px rgba(139, 0, 0, 0.25)",
                  }}
                >
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#1a1a2e" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: "#6B7280" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 lg:py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#8B0000" }}
            >
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-8" style={{ color: "#1a1a2e" }}>
              About JG University
            </h2>
            <p className="text-base leading-relaxed mb-4 font-light" style={{ color: "#4B5563" }}>
              JG University is committed to providing excellence in education with a focus on innovation, research, and holistic development. Our state-of-the-art campus features modern facilities for an enriching academic experience.
            </p>
            <p className="text-base leading-relaxed mb-10 font-light" style={{ color: "#4B5563" }}>
              Sponsored by ASIA Charitable Trust, we offer programs in Engineering, Management, Sciences, and more with a mission to nurture future leaders.
            </p>

            <div className="flex gap-10">
              {[
                { num: "5000+", label: "Students", icon: Users },
                { num: "200+", label: "Faculty", icon: GraduationCap },
                { num: "50+", label: "Programs", icon: BookOpen },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="text-3xl font-extrabold tracking-tight"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.num}
                  </p>
                  <p className="text-sm font-medium mt-1" style={{ color: "#6B7280" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0, 0, 0, 0.12)" }}>
              <img src={jgCampus} alt="JG University Campus" className="w-full object-cover h-96" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 lg:py-28"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#C89B3C" }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg text-white/60 font-light max-w-2xl mx-auto">
              Have questions? Reach out to us and we'll be happy to help.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: "Email", lines: ["connect@jguni.in", "admission@jguni.in"] },
              { icon: Phone, title: "Phone", lines: ["+91 7567 7567 58/59"] },
              { icon: MapPin, title: "Address", lines: ["JG University, ASIA Campus, Drive in Rd,", "Thaltej, Ahmedabad - 380054, Gujarat, India"] },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "18px",
                  padding: "36px 28px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(200, 155, 60, 0.15)", border: "1px solid rgba(200, 155, 60, 0.2)" }}
                >
                  <c.icon className="h-5.5 w-5.5" style={{ color: "#C89B3C" }} />
                </div>
                <h3 className="font-bold text-white text-base mb-3">{c.title}</h3>
                {c.lines.map((line, j) => (
                  <p key={j} className="text-sm text-white/60 leading-relaxed font-light">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ background: "#111122" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm font-light tracking-wide">
            © 2026 JG University. All rights reserved. | Excellence by Choice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

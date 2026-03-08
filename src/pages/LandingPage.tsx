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
    window.addEventListener("scroll", onScroll, { passive: true });
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

  const openLogin = () => {
    setShowLogin(true);
    setTimeout(() => document.getElementById("login-card")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const features = [
    { icon: Clock, title: "Time Table", desc: "Easy-to-read class schedules with real-time updates" },
    { icon: UserCheck, title: "Attendance", desc: "Transparent attendance records with daily tracking" },
    { icon: FileText, title: "Assignments", desc: "Track deadlines and submit assignments on time" },
    { icon: BarChart3, title: "Results", desc: "Subject-wise marks with downloadable results" },
    { icon: Bell, title: "Notices", desc: "Centralized university notices with urgent alerts" },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={jgLogoWhite} alt="JG University" className="h-8 sm:h-10 w-auto rounded-lg" />
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
          <motion.button
            onClick={openLogin}
            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              color: "#1a1a2e",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Student Login
          </motion.button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={jgCampus} alt="JG University Campus" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(15,52,96,0.7) 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139,0,0,0.15) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 80% 60%, rgba(200,155,60,0.12) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(15,52,96,0.18) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(139,0,0,0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating glass orbs - hidden on mobile */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full pointer-events-none hidden lg:block"
          style={{ background: "radial-gradient(circle, rgba(200,155,60,0.08) 0%, transparent 70%)", border: "1px solid rgba(200,155,60,0.08)" }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-40 h-40 rounded-full pointer-events-none hidden lg:block"
          style={{ background: "radial-gradient(circle, rgba(139,0,0,0.06) 0%, transparent 70%)", border: "1px solid rgba(255,255,255,0.05)" }}
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block mb-4 sm:mb-6 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(200, 155, 60, 0.12)",
                color: "#C89B3C",
                border: "1px solid rgba(200, 155, 60, 0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              Welcome to JG University
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
              <motion.span className="text-white block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                Your Academic
              </motion.span>
              <motion.span className="text-white block" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.6 }}>
                Journey,
              </motion.span>
              <motion.span
                className="bg-clip-text text-transparent block"
                style={{ backgroundImage: "linear-gradient(135deg, #C89B3C 0%, #F0D78C 40%, #C89B3C 80%)" }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Simplified
              </motion.span>
            </h1>

            <motion.p
              className="mt-5 sm:mt-8 text-white/70 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Access your timetable, track attendance, view results, manage fees, and stay updated with university notices — all in one place.
            </motion.p>

            <motion.div
              className="mt-7 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.button
                onClick={openLogin}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-[14px] text-white font-bold text-[15px] flex items-center justify-center gap-3 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #8B0000 0%, #C0392B 100%)",
                  boxShadow: "0 8px 32px rgba(139, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(139, 0, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="relative z-10">Start Matching</span>
                <motion.span
                  className="relative z-10 text-lg"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, #A50000 0%, #D94452 100%)" }}
                />
              </motion.button>

              <motion.button
                onClick={() => scrollTo("features")}
                className="w-full sm:w-auto px-8 py-4 rounded-[14px] text-white font-semibold text-[15px]"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  backdropFilter: "blur(12px)",
                  background: "rgba(255,255,255,0.06)",
                }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Learn How It Works
              </motion.button>
            </motion.div>

            {/* Floating glass stat cards */}
            <motion.div
              className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {[
                { value: "5000+", label: "Students" },
                { value: "200+", label: "Faculty" },
                { value: "98%", label: "Placement" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center px-3 sm:px-6 py-3 sm:py-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  whileHover={{ background: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(200, 155, 60, 0.3)", y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="text-lg sm:text-xl font-extrabold" style={{ color: "#C89B3C" }}>{stat.value}</span>
                  <span className="text-[10px] sm:text-xs text-white/50 font-medium mt-0.5">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
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
                padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 36px)",
                boxShadow: "0 24px 64px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                <img src={jgLogo} alt="JG University" className="h-20 sm:h-28 w-56 sm:w-72 object-contain mb-2 sm:mb-3" />
                <p className="text-[10px] sm:text-xs font-medium tracking-wide" style={{ color: "#8B8B8B" }}>
                  Sponsored by ASIA Charitable Trust
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5 sm:mb-2" style={{ color: "#374151" }}>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 sm:py-3.5 text-sm transition-all duration-300 focus:outline-none"
                    style={{ borderRadius: "12px", border: "1.5px solid #E5E7EB", background: "#F9FAFB", color: "#1F2937" }}
                    onFocus={(e) => { e.target.style.borderColor = "#8B0000"; e.target.style.boxShadow = "0 0 0 3px rgba(139, 0, 0, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1.5 sm:mb-2" style={{ color: "#374151" }}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 sm:py-3.5 text-sm transition-all duration-300 focus:outline-none pr-11"
                      style={{ borderRadius: "12px", border: "1.5px solid #E5E7EB", background: "#F9FAFB", color: "#1F2937" }}
                      onFocus={(e) => { e.target.style.borderColor = "#8B0000"; e.target.style.boxShadow = "0 0 0 3px rgba(139, 0, 0, 0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 p-1"
                      style={{ color: "#9CA3AF" }}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const subject = encodeURIComponent("Forgot Password - Request for Username and Password");
                      const body = encodeURIComponent("Dear JG University Admin,\n\nI forgot my password. Please mail my username and password again to my registered email ID.\n\nThank you.");
                      const mailtoUrl = `mailto:connect@jguni.in?subject=${subject}&body=${body}`;
                      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=connect@jguni.in&su=${subject}&body=${body}`;

                      const opened = window.open(mailtoUrl, "_blank", "noopener,noreferrer");
                      if (!opened) {
                        window.location.href = mailtoUrl;
                      }

                      toast({
                        title: "Opening mail app...",
                        description: "If your mail app didn't open, click below to use Gmail.",
                        action: (
                          <a
                            href={gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-primary underline"
                          >
                            Open Gmail
                          </a>
                        ),
                      });
                    }}
                    className="text-xs font-medium transition-colors duration-200"
                    style={{ color: "#8B0000" }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 text-white font-semibold text-sm"
                  style={{
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                    boxShadow: "0 6px 24px rgba(139, 0, 0, 0.3)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 32px rgba(139, 0, 0, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Login
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 sm:py-24 lg:py-28" style={{ background: "#F5F5F7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: "#8B0000" }}>
              Platform Features
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
              Everything You Need
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg max-w-2xl mx-auto font-light" style={{ color: "#6B7280" }}>
              One platform to manage your entire academic life at JG University
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group cursor-pointer text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "16px",
                  padding: "clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 24px)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(139, 0, 0, 0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.04)"; }}
              >
                <div
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-5 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                    boxShadow: "0 4px 16px rgba(139, 0, 0, 0.25)",
                  }}
                >
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2" style={{ color: "#1a1a2e" }}>{f.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: "#6B7280" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 sm:py-24 lg:py-28" style={{ background: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: "#8B0000" }}>
              About Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 sm:mb-8" style={{ color: "#1a1a2e" }}>
              About JG University
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light" style={{ color: "#4B5563" }}>
              JG University is committed to providing excellence in education with a focus on innovation, research, and holistic development. Our state-of-the-art campus features modern facilities for an enriching academic experience.
            </p>
            <p className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 font-light" style={{ color: "#4B5563" }}>
              Sponsored by ASIA Charitable Trust, we offer programs in Engineering, Management, Sciences, and more with a mission to nurture future leaders.
            </p>

            <div className="flex gap-6 sm:gap-10">
              {[
                { num: "5000+", label: "Students" },
                { num: "200+", label: "Faculty" },
                { num: "50+", label: "Programs" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  className="text-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #8B0000 0%, #B91C3C 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.num}
                  </p>
                  <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: "#6B7280" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 64px rgba(0, 0, 0, 0.12)" }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img src={jgCampus} alt="JG University Campus" className="w-full object-cover h-64 sm:h-80 lg:h-96" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-16 sm:py-24 lg:py-28"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-10 sm:mb-16"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3" style={{ color: "#C89B3C" }}>Contact</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Get In Touch</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-white/60 font-light max-w-2xl mx-auto">
              Have questions? Reach out to us and we'll be happy to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Mail, title: "Email", lines: ["connect@jguni.in", "admission@jguni.in"] },
              { icon: Phone, title: "Phone", lines: ["+91 7567 7567 58/59"] },
              { icon: MapPin, title: "Address", lines: ["JG University, ASIA Campus,", "Ahmedabad - 380054, Gujarat"] },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "16px",
                  padding: "clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5"
                  style={{ background: "rgba(200, 155, 60, 0.15)", border: "1px solid rgba(200, 155, 60, 0.2)" }}
                >
                  <c.icon className="h-5 w-5" style={{ color: "#C89B3C" }} />
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base mb-2 sm:mb-3">{c.title}</h3>
                {c.lines.map((line, j) => (
                  <p key={j} className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #111122 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(200,155,60,0.3) 50%, transparent 100%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={jgLogoWhite} alt="JG University" className="h-8 sm:h-10 w-auto rounded-lg" />
              </div>
              <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed max-w-xs">
                Empowering students with seamless access to academics, resources, and campus life — all in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sm:text-center"
            >
              <h4 className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-5">Quick Links</h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {[
                  { label: "About", id: "about" },
                  { label: "Privacy Policy", id: "contact" },
                  { label: "Community Guidelines", id: "features" },
                  { label: "Contact", id: "contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <motion.button
                      onClick={() => scrollTo(link.id)}
                      className="text-white/40 text-xs sm:text-sm font-light transition-all duration-300"
                      whileHover={{ color: "#C89B3C", x: 3 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sm:text-right"
            >
              <h4 className="text-white/80 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-5">Get In Touch</h4>
              <div className="space-y-2.5 sm:space-y-3">
                <p className="text-white/40 text-xs sm:text-sm font-light flex items-center gap-2 sm:justify-end">
                  <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" style={{ color: "#C89B3C" }} /> connect@jguni.in
                </p>
                <p className="text-white/40 text-xs sm:text-sm font-light flex items-center gap-2 sm:justify-end">
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" style={{ color: "#C89B3C" }} /> +91 7567 7567 58/59
                </p>
                <p className="text-white/40 text-xs sm:text-sm font-light flex items-center gap-2 sm:justify-end">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" style={{ color: "#C89B3C" }} /> Ahmedabad, Gujarat
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-white/30 text-[10px] sm:text-xs font-light tracking-wide">
            © 2026 Campus Connect. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] sm:text-xs font-light">
            Excellence by Choice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

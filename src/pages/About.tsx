import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Shield, Smartphone, Palette, Brain, Heart } from "lucide-react";
import jgLogoWhite from "@/assets/jg-logo-white.png";

const features = [
  { icon: Brain, title: "AI-Powered Insights", desc: "Smart attendance predictions, academic health scores, and personalized reminders powered by artificial intelligence." },
  { icon: Smartphone, title: "Mobile-First Design", desc: "Designed for students on the go — swipeable calendars, bottom navigation, and thumb-friendly interactions." },
  { icon: Palette, title: "Personalized Themes", desc: "Choose from 4 beautiful themes — Elegant Light, Dark Academic, Modern Blue, and Calm Mint." },
  { icon: Shield, title: "Real-Time Updates", desc: "Instant access to attendance, timetable, assignments, exam schedules, and fee status — always up to date." },
  { icon: Sparkles, title: "AI Chatbot Assistant", desc: "Ask anything — from SRS documents to exam prep. Your AI academic companion is always ready to help." },
  { icon: Heart, title: "Built for Students", desc: "Every feature is crafted around student needs — reducing cognitive load and keeping you focused on what matters." },
];

const About = () => {
  return (
    <div className="space-y-5 md:space-y-6 animate-fade-in max-w-3xl">
      <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">About</h1>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-5 md:p-8 card-hover card-shadow"
      >
        <div className="flex items-center gap-4 mb-5">
          <div className="h-14 w-28 rounded-xl overflow-hidden border border-border shadow-sm shrink-0 bg-white flex items-center justify-center">
            <img src={jgLogoWhite} alt="JG University" className="h-full w-full object-contain" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-foreground leading-snug">JG University Portal</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Smart Academic Companion</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The JG University Student Portal is a next-generation academic management platform designed to simplify and enhance the student experience. 
          From real-time attendance tracking and intelligent timetable management to AI-powered academic insights — everything a student needs is right at their fingertips.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["React", "TypeScript", "AI-Powered", "Mobile-First", "Real-Time"].map(tag => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl border border-border p-4 card-hover card-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-primary/10 shrink-0">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Version Info */}
      <div className="bg-card rounded-xl border border-border p-4 card-shadow">
        <div className="space-y-2.5">
          {[
            { label: "Version", value: "2.0.0" },
            { label: "Developer", value: "JG University Tech Team" },
            { label: "Last Updated", value: "March 2026" },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground pb-4">
        Made with <Heart className="inline h-3 w-3 text-destructive" /> for JG University students
      </p>
    </div>
  );
};

export default About;
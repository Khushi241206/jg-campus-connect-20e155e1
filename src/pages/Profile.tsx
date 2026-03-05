import { useAuth } from "@/contexts/AuthContext";
import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { LogOut, Check, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatarAnanya from "@/assets/avatar-ananya.png";

const themes: { name: ThemeName; label: string; primary: string; bg: string; accent: string; sidebar: string }[] = [
  { name: "elegant-light", label: "Elegant Light", primary: "#7B1E3A", bg: "#FFFFFF", accent: "#C89B3C", sidebar: "#2D1420" },
  { name: "dark-academic", label: "Dark Academic", primary: "#8B0000", bg: "#0F0F14", accent: "#C89B3C", sidebar: "#0A0A0F" },
  { name: "modern-blue", label: "Modern Blue", primary: "#2563EB", bg: "#F1F5F9", accent: "#0EA5E9", sidebar: "#1E293B" },
  { name: "calm-mint", label: "Calm Mint", primary: "#10B981", bg: "#ECFDF5", accent: "#14B8A6", sidebar: "#1A2E28" },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme, isTransitioning } = useTheme();

  if (!user) return null;

  const info = [
    { label: "Enrollment No.", value: user.enrollment },
    { label: "Program", value: "B.Tech - AI-ML" },
    { label: "Semester", value: user.semester },
    { label: "Year", value: user.year },
    { label: "Email", value: user.email },
    { label: "Date of Birth", value: user.dob },
    { label: "Guardian", value: user.guardian },
    { label: "Phone", value: user.phone },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-xl md:text-2xl font-bold text-foreground">Profile</h1>

      {/* Avatar & Name */}
      <div className="bg-card rounded-xl border border-border p-4 md:p-6 flex items-center gap-4">
        <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-primary shadow-md shrink-0">
          <img src={avatarAnanya} alt={user.name} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-foreground truncate">{user.name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground truncate">{user.program}</p>
          <p className="text-xs text-muted-foreground">{user.semester} • {user.division}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-card rounded-xl border border-border p-3 md:p-4">
        <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {info.map((item) => (
            <div key={item.label} className="p-2.5 rounded-lg bg-muted/30">
              <p className="text-[10px] md:text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Theme Selector */}
      <div className="bg-card rounded-xl border border-border p-3 md:p-4">
        <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" /> Theme
        </h3>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {themes.map((t) => (
            <motion.button
              key={t.name}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme(t.name)}
              className={`relative rounded-xl border-2 transition-all overflow-hidden
                ${theme === t.name ? "border-primary shadow-md" : "border-border hover:border-muted-foreground/30"}`}
            >
              {/* Mini preview thumbnail */}
              <div className="h-16 md:h-20 relative overflow-hidden rounded-t-lg" style={{ backgroundColor: t.bg }}>
                {/* Mini sidebar */}
                <div className="absolute left-0 top-0 bottom-0 w-5 md:w-6" style={{ backgroundColor: t.sidebar }} />
                {/* Mini header */}
                <div className="absolute top-0 left-5 md:left-6 right-0 h-3 md:h-4 border-b" style={{ backgroundColor: t.bg, borderColor: t.primary + '20' }} />
                {/* Mini cards */}
                <div className="absolute top-5 md:top-6 left-7 md:left-8 right-2 space-y-1">
                  <div className="h-2 rounded-sm" style={{ backgroundColor: t.primary, width: '60%', opacity: 0.8 }} />
                  <div className="flex gap-1">
                    <div className="h-4 md:h-5 flex-1 rounded-sm border" style={{ borderColor: t.primary + '30', backgroundColor: t.bg }} />
                    <div className="h-4 md:h-5 flex-1 rounded-sm border" style={{ borderColor: t.primary + '30', backgroundColor: t.bg }} />
                  </div>
                </div>
                {/* Accent dot */}
                <div className="absolute bottom-1 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
              </div>
              
              {/* Label */}
              <div className="p-2 flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium text-foreground">{t.label}</span>
                <AnimatePresence>
                  {theme === t.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Transitioning overlay */}
              {isTransitioning && theme === t.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium btn-lift"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </div>
  );
};

export default Profile;

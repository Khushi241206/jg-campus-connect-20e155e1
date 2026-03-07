import { useAuth } from "@/contexts/AuthContext";
import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { LogOut, Check, Palette, Sun, Moon, Droplets, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import avatarAnanya from "@/assets/avatar-ananya.png";

const themes: { name: ThemeName; label: string; icon: typeof Sun; gradient: string; preview: { bg: string; sidebar: string; primary: string; accent: string } }[] = [
  {
    name: "elegant-light",
    label: "Elegant Light",
    icon: Sun,
    gradient: "from-rose-100 via-amber-50 to-rose-50",
    preview: { bg: "#FFFFFF", sidebar: "#2D1420", primary: "#7B1E3A", accent: "#C89B3C" },
  },
  {
    name: "dark-academic",
    label: "Dark Academic",
    icon: Moon,
    gradient: "from-slate-900 via-zinc-800 to-slate-900",
    preview: { bg: "#0F0F14", sidebar: "#0A0A0F", primary: "#8B0000", accent: "#C89B3C" },
  },
  {
    name: "modern-blue",
    label: "Modern Blue",
    icon: Droplets,
    gradient: "from-blue-100 via-sky-50 to-indigo-100",
    preview: { bg: "#F1F5F9", sidebar: "#1E293B", primary: "#2563EB", accent: "#0EA5E9" },
  },
  {
    name: "calm-mint",
    label: "Calm Mint",
    icon: Leaf,
    gradient: "from-emerald-100 via-teal-50 to-green-100",
    preview: { bg: "#ECFDF5", sidebar: "#1A2E28", primary: "#10B981", accent: "#14B8A6" },
  },
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

      {/* Redesigned Theme Selector */}
      <div className="bg-card rounded-xl border border-border p-3 md:p-4">
        <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" /> Choose Theme
        </h3>
        <div className="space-y-2">
          {themes.map((t) => {
            const isActive = theme === t.name;
            const Icon = t.icon;
            return (
              <motion.button
                key={t.name}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(t.name)}
                className={`relative w-full rounded-xl border-2 transition-all overflow-hidden
                  ${isActive ? "border-primary shadow-lg ring-2 ring-primary/20" : "border-border hover:border-muted-foreground/30"}`}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Color orbs preview */}
                  <div className="relative h-10 w-10 shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: t.preview.primary, opacity: 0.9 }} />
                    <div className="absolute top-0 right-0 h-4 w-4 rounded-full border-2 border-card" style={{ backgroundColor: t.preview.accent }} />
                    <div className="absolute bottom-0 left-0 h-4 w-4 rounded-full border-2 border-card" style={{ backgroundColor: t.preview.sidebar }} />
                  </div>

                  {/* Label + icon */}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" />
                      {t.label}
                    </p>
                    {/* Mini color strip */}
                    <div className="flex gap-1 mt-1.5">
                      {[t.preview.primary, t.preview.accent, t.preview.sidebar, t.preview.bg].map((color, i) => (
                        <div
                          key={i}
                          className="h-1.5 flex-1 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Check indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0"
                      >
                        <Check className="h-3.5 w-3.5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Transitioning shimmer */}
                {isTransitioning && isActive && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                  />
                )}
              </motion.button>
            );
          })}
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

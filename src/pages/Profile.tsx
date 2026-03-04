import { useAuth } from "@/contexts/AuthContext";
import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { LogOut, Check } from "lucide-react";
import { motion } from "framer-motion";
import avatarAnanya from "@/assets/avatar-ananya.png";

const themes: { name: ThemeName; label: string; primary: string; bg: string }[] = [
  { name: "elegant-light", label: "Elegant Light", primary: "#7B1E3A", bg: "#FFFFFF" },
  { name: "dark-academic", label: "Dark Academic", primary: "#8B0000", bg: "#0F0F14" },
  { name: "modern-blue", label: "Modern Blue", primary: "#2563EB", bg: "#F1F5F9" },
  { name: "calm-mint", label: "Calm Mint", primary: "#10B981", bg: "#ECFDF5" },
];

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

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

      {/* Theme Selector */}
      <div className="bg-card rounded-xl border border-border p-3 md:p-4">
        <h3 className="font-semibold text-foreground mb-3 md:mb-4 text-sm">Theme</h3>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {themes.map((t) => (
            <motion.button
              key={t.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTheme(t.name)}
              className={`relative flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl border-2 transition-all
                ${theme === t.name ? "border-primary" : "border-border hover:border-muted-foreground/30"}`}
            >
              <div className="flex gap-1">
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-md" style={{ backgroundColor: t.primary }} />
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-md border border-border" style={{ backgroundColor: t.bg }} />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground">{t.label}</span>
              {theme === t.name && (
                <Check className="absolute top-2 right-2 h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
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

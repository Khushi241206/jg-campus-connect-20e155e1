import { useAuth } from "@/contexts/AuthContext";
import { useTheme, ThemeName } from "@/contexts/ThemeContext";
import { LogOut, Check } from "lucide-react";
import { motion } from "framer-motion";

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
    { label: "Program", value: user.program },
    { label: "Semester", value: user.semester },
    { label: "Year", value: user.year },
    { label: "Email", value: user.email },
    { label: "Date of Birth", value: user.dob },
    { label: "Guardian", value: user.guardian },
    { label: "Phone", value: user.phone },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      {/* Avatar & Name */}
      <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.program}</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {info.map((item) => (
            <div key={item.label}>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selector */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold text-foreground mb-4">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <motion.button
              key={t.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTheme(t.name)}
              className={`relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                ${theme === t.name ? "border-primary" : "border-border hover:border-muted-foreground/30"}`}
            >
              <div className="flex gap-1">
                <div className="h-8 w-8 rounded-md" style={{ backgroundColor: t.primary }} />
                <div className="h-8 w-8 rounded-md border border-border" style={{ backgroundColor: t.bg }} />
              </div>
              <span className="text-sm font-medium text-foreground">{t.label}</span>
              {theme === t.name && (
                <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium btn-lift"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </div>
  );
};

export default Profile;

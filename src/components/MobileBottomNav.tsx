import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Clock, UserCheck, FileText, Bell, User,
} from "lucide-react";

const items = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { path: "/timetable", icon: Clock, label: "Timetable" },
  { path: "/attendance", icon: UserCheck, label: "Attend." },
  { path: "/assignments", icon: FileText, label: "Tasks" },
  { path: "/notices", icon: Bell, label: "Notices" },
  { path: "/profile", icon: User, label: "Profile" },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-1.5 px-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-xs transition-all active:scale-90"
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? "bg-primary/10" : ""}`}>
                <item.icon className={`h-5 w-5 transition-colors ${isActive ? "text-primary stroke-[2.5]" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomnav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                />
              )}
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

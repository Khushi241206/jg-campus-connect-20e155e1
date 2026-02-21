import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Clock, UserCheck, FileText, Bell, User,
} from "lucide-react";

const items = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { path: "/timetable", icon: Clock, label: "Timetable" },
  { path: "/attendance", icon: UserCheck, label: "Attendance" },
  { path: "/assignments", icon: FileText, label: "Tasks" },
  { path: "/notices", icon: Bell, label: "Notices" },
  { path: "/profile", icon: User, label: "Profile" },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs transition-colors duration-200
                ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="font-medium">{item.label}</span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

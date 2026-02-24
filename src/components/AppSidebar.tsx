import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Clock, UserCheck, FileText, BarChart3,
  Bell, CreditCard, User, X, GraduationCap, ClipboardList, CalendarDays,
} from "lucide-react";


const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Time Table", path: "/timetable", icon: Clock },
  { title: "Attendance", path: "/attendance", icon: UserCheck },
  { title: "Assignments", path: "/assignments", icon: FileText },
  { title: "Exams & Tests", path: "/exams", icon: ClipboardList },
  { title: "Results", path: "/results", icon: BarChart3 },
  { title: "Events", path: "/events", icon: CalendarDays },
  { title: "Notices", path: "/notices", icon: Bell },
  { title: "Fees", path: "/fees", icon: CreditCard },
  { title: "Profile", path: "/profile", icon: User },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-foreground/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-sidebar text-sidebar-foreground w-60 
        transition-transform duration-300 ease-in-out flex flex-col
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button (mobile) */}
        <div className="p-4 flex items-center justify-end lg:hidden">
          <button onClick={onClose} className="p-1 rounded hover:bg-sidebar-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <RouterNavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-6 bg-sidebar-primary-foreground rounded-r"
                  />
                )}
              </RouterNavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
            <GraduationCap className="h-4 w-4" />
            <span>Smart Academic Portal</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;

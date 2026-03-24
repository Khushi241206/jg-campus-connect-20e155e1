import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Clock, UserCheck, FileText, BarChart3,
  Bell, CreditCard, User, X, GraduationCap, ClipboardList, CalendarDays, MessageSquare, BookOpen, Info,
} from "lucide-react";
import jgLogoWhite from "@/assets/jg-logo-nobg.png";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Time Table", path: "/timetable", icon: Clock },
  { title: "Attendance", path: "/attendance", icon: UserCheck },
  { title: "Assignments", path: "/assignments", icon: FileText },
  { title: "Exams & Tests", path: "/exams", icon: ClipboardList },
  { title: "Academics", path: "/academics", icon: BookOpen },
  { title: "Results", path: "/results", icon: BarChart3 },
  { title: "Events", path: "/events", icon: CalendarDays },
  { title: "Notices", path: "/notices", icon: Bell },
  { title: "Fees", path: "/fees", icon: CreditCard },
  { title: "Feedback", path: "/feedback", icon: MessageSquare },
  { title: "About", path: "/about", icon: Info },
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
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-sidebar text-sidebar-foreground w-[15rem] 
        transition-transform duration-300 ease-in-out flex flex-col
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header with logo */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2">
            <img src={jgLogoWhite} alt="JG University" className="h-8 w-auto rounded" />
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-sidebar-accent lg:hidden transition-colors">
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <RouterNavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                  ${isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-[3px] h-5 bg-sidebar-primary-foreground rounded-r-full"
                  />
                )}
              </RouterNavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-[11px] text-sidebar-foreground/40">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Smart Academic Portal</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
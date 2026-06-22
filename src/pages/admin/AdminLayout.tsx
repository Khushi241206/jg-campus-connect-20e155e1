import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Bell, CalendarDays, FileText, UserCheck, CreditCard, MessageSquare, ArrowLeft } from "lucide-react";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/notices", label: "Notices", icon: Bell },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/assignments", label: "Assignments", icon: FileText },
  { to: "/admin/attendance", label: "Attendance", icon: UserCheck },
  { to: "/admin/fees", label: "Fees", icon: CreditCard },
  { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

const AdminLayout = () => {
  const loc = useLocation();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Admin</h1>
          <p className="text-xs text-muted-foreground">Manage university data</p>
        </div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Student view
        </Link>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {links.map((l) => {
          const active = l.exact ? loc.pathname === l.to : loc.pathname.startsWith(l.to);
          return (
            <Link key={l.to} to={l.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
};

export default AdminLayout;

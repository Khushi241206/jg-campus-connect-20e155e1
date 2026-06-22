import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import MobileBottomNav from "@/components/MobileBottomNav";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import AIChatbot from "@/components/AIChatbot";
import avatarAnanya from "@/assets/avatar-ananya.png";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, logout } = useAuth();
  const displayName = profile?.full_name || user?.email || "";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-14 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 md:px-5 gap-3 shrink-0 card-shadow">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <NotificationsDropdown />

          <div className="hidden sm:flex items-center gap-2.5 text-sm">
            <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-border/60 shadow-sm">
              <img src={avatarAnanya} alt={displayName} className="h-full w-full object-cover" />
            </div>
            <span className="font-medium text-foreground">{displayName}</span>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive active:scale-95"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        <MobileBottomNav />
      </div>
      <AIChatbot />
    </div>
  );
};

export default DashboardLayout;
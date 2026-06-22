import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import AdminRoute from "@/components/AdminRoute";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Timetable from "@/pages/Timetable";
import Attendance from "@/pages/Attendance";
import Assignments from "@/pages/Assignments";
import Exams from "@/pages/Exams";
import Results from "@/pages/Results";
import Events from "@/pages/Events";
import Notices from "@/pages/Notices";
import Fees from "@/pages/Fees";
import Feedback from "@/pages/Feedback";
import Profile from "@/pages/Profile";
import Academics from "@/pages/Academics";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import InstallPrompt from "@/components/InstallPrompt";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageNotices from "@/pages/admin/ManageNotices";
import ManageEvents from "@/pages/admin/ManageEvents";
import ManageAssignments from "@/pages/admin/ManageAssignments";
import ManageAttendance from "@/pages/admin/ManageAttendance";
import ManageFees from "@/pages/admin/ManageFees";
import ManageFeedback from "@/pages/admin/ManageFeedback";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/register" element={<PublicRoute><Login /></PublicRoute>} />
    <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/results" element={<Results />} />
      <Route path="/events" element={<Events />} />
      <Route path="/notices" element={<Notices />} />
      <Route path="/fees" element={<Fees />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="assignments" element={<ManageAssignments />} />
        <Route path="attendance" element={<ManageAttendance />} />
        <Route path="fees" element={<ManageFees />} />
        <Route path="feedback" element={<ManageFeedback />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            <InstallPrompt />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

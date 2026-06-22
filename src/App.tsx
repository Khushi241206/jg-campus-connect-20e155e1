import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import Login from "@/pages/Login";
import LandingPage from "@/pages/LandingPage";
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

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
    <Route path="/login" element={<PublicRoute><LandingPage /></PublicRoute>} />
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

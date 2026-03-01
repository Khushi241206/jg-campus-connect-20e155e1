import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  enrollment: string;
  program: string;
  semester: string;
  year: string;
  division: string;
  email: string;
  phone: string;
  dob: string;
  guardian: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const mockUser: User = {
  id: "1",
  name: "Rahul Sharma",
  enrollment: "JGU2022CSE1142",
  program: "B.Tech - CSE|AI-ML|AI-DS|IT",
  semester: "4th Semester",
  year: "Year 2 - B",
  division: "Div B",
  email: "rahul.sharma@jgu.edu.in",
  phone: "+91 98765 43211",
  dob: "15 March 2004",
  guardian: "Mr. Rajesh Sharma",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem("jg-auth") === "true"
  );

  const login = (username: string, password: string) => {
    if (username && password) {
      setIsAuthenticated(true);
      localStorage.setItem("jg-auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("jg-auth");
  };

  return (
    <AuthContext.Provider value={{ user: isAuthenticated ? mockUser : null, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

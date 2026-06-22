import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string;
  enrollment_number: string | null;
  program: string | null;
  semester: string | null;
  division: string | null;
  phone: string | null;
  date_of_birth: string | null;
  guardian_name: string | null;
  avatar_url: string | null;
}

export type AppRole = "student" | "admin";

export interface StudentSignupData {
  email: string;
  password: string;
  full_name: string;
  enrollment_number: string;
  program: string;
  semester: string;
  division: string;
  phone: string;
  date_of_birth: string;
  guardian_name: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpStudent: (data: StudentSignupData) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  // Legacy compatibility
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  role: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: "not ready" }),
  signUpStudent: async () => ({ error: "not ready" }),
  signInWithGoogle: async () => ({ error: "not ready" }),
  signOut: async () => {},
  refreshProfile: async () => {},
  login: async () => false,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfileAndRole = useCallback(async (uid: string) => {
    const [{ data: prof }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid),
    ]);
    setProfile((prof as Profile) ?? null);
    const roleList = (roles ?? []).map((r) => r.role as AppRole);
    setRole(roleList.includes("admin") ? "admin" : roleList[0] ?? "student");
  }, []);

  useEffect(() => {
    // Register listener FIRST
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // Defer DB calls to avoid recursion in the listener
        setTimeout(() => {
          loadProfileAndRole(sess.user.id);
        }, 0);
      } else {
        setProfile(null);
        setRole(null);
      }
    });

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        loadProfileAndRole(sess.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfileAndRole]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUpStudent = async (data: StudentSignupData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: data.full_name,
          enrollment_number: data.enrollment_number,
          program: data.program,
          semester: data.semester,
          division: data.division,
          phone: data.phone,
          date_of_birth: data.date_of_birth,
          guardian_name: data.guardian_name,
        },
      },
    });
    return { error: error?.message ?? null };
  };

  const signInWithGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return { error: result.error.message ?? "Google sign-in failed" };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setRole(null);
  };

  const refreshProfile = async () => {
    if (user) await loadProfileAndRole(user.id);
  };

  // Legacy compat
  const login = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    return !error;
  };
  const logout = async () => signOut();

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        isAuthenticated: !!session,
        isAdmin: role === "admin",
        loading,
        signIn,
        signUpStudent,
        signInWithGoogle,
        signOut,
        refreshProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// import { DEMO_USERS } from "./mockData";

// export type Role = "admin" | "receptionist" | "customer";
// export type AuthUser = { email: string; name: string; role: Role };

// type Ctx = {
//   user: AuthUser | null;
//   login: (email: string, password: string) => { ok: boolean; error?: string; role?: Role };
//   signup: (name: string, email: string, password: string) => { ok: boolean };
//   logout: () => void;
// };

// const AuthContext = createContext<Ctx | null>(null);
// const KEY = "mulugu.auth";

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<AuthUser | null>(null);

//   useEffect(() => {
//     try {
//       const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
//       if (raw) setUser(JSON.parse(raw));
//     } catch {}
//   }, []);

//   const login: Ctx["login"] = (email, password) => {
//     const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
//     if (!found) return { ok: false, error: "Invalid email or password" };
//     const u: AuthUser = { email: found.email, name: found.name, role: found.role as Role };
//     setUser(u);
//     localStorage.setItem(KEY, JSON.stringify(u));
//     return { ok: true, role: u.role };
//   };

//   const signup: Ctx["signup"] = (name, email) => {
//     const u: AuthUser = { email, name, role: "customer" };
//     setUser(u);
//     localStorage.setItem(KEY, JSON.stringify(u));
//     return { ok: true };
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem(KEY);
//   };

//   return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }



import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import API from "@/api/api";

export type Role = "admin" | "receptionist" | "customer";

export type AuthUser = {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  role: Role;
};

type Ctx = {
  user: AuthUser | null;

  login: (
    email: string,
    password: string
  ) => Promise<{
    ok: boolean;
    error?: string;
    role?: Role;
  }>;

  signup: (
    first_name: string,
    email: string,
    password: string
  ) => Promise<{
    ok: boolean;
    error?: string;
  }>;

  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

const USER_KEY = "mulugu.auth";
const ACCESS_KEY = "access";
const REFRESH_KEY = "refresh";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);

      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const login: Ctx["login"] = async (
    email,
    password
  ) => {
    try {
      const response = await API.post("/login/", {
        email,
        password,
      });

      const data = response.data;

      localStorage.setItem(
        ACCESS_KEY,
        data.access
      );

      localStorage.setItem(
        REFRESH_KEY,
        data.refresh
      );

      const loggedUser: AuthUser = {
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        role: data.user.role,
      };

      setUser(loggedUser);

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(loggedUser)
      );

      return {
        ok: true,
        role: loggedUser.role,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Invalid email or password",
      };
    }
  };

  const signup: Ctx["signup"] = async (
    first_name,
    email,
    password
  ) => {
    try {
      await API.post("/signup/", {
        first_name,
        last_name: "",
        email,
        phone_number: "",
        password,
      });

      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Signup failed",
      };
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}
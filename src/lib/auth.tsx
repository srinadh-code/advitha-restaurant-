



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
// type Ctx = {
//   user: AuthUser | null;
type Ctx = {
  user: AuthUser | null;
  authLoading: boolean;

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

  setUser: React.Dispatch<
    React.SetStateAction<AuthUser | null>
  >;

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
  const [authLoading, setAuthLoading] = useState(true);

  // useEffect(() => {
  //   try {
  //     const raw = localStorage.getItem(USER_KEY);

  //     if (raw) {
  //       setUser(JSON.parse(raw));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  useEffect(() => {
  try {
    const raw = localStorage.getItem(USER_KEY);

    if (raw) {
      setUser(JSON.parse(raw));
    }
  } catch (error) {
    console.error(error);
  } finally {
    setAuthLoading(false);
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
        "mulugu.auth",
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
    // <AuthContext.Provider
    //   value={{
    //     user,
    //     setUser,
    //     login,
    //     signup,
    //     logout,
    //   }}
    // >
    <AuthContext.Provider
  value={{
    user,
    authLoading,
    setUser,
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
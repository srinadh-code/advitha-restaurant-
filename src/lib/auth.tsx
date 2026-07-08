



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
  password: string,
  last_name?: string,
  phone_number?: string
) => Promise<{
    ok: boolean;
    error?: string;
  }>;

  updateUser: (user: AuthUser) => void;

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
  const updateUser = (newUser: AuthUser) => {
  setUser(newUser);

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(newUser)
  );
};
const syncUserFromStorage = () => {
  try {
    // First, check if valid tokens exist
    const accessToken = localStorage.getItem(ACCESS_KEY);
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    
    // If no tokens exist, clear user data and set user to null
    if (!accessToken || !refreshToken) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
      setUser(null);
      setAuthLoading(false);
      return;
    }

    const raw = localStorage.getItem(USER_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);

      const validRoles = [
        "admin",
        "receptionist",
        "customer",
      ];

      if (
        parsed &&
        typeof parsed.email === "string" &&
        validRoles.includes(parsed.role)
      ) {
        setUser(parsed);
      } else {
        localStorage.removeItem(USER_KEY);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error(error);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    setUser(null);
  } finally {
    setAuthLoading(false);
  }
};

  useEffect(() => {
    syncUserFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === USER_KEY || event.key === ACCESS_KEY || event.key === REFRESH_KEY) {
        syncUserFromStorage();
      }
    };

    // Handle logout event from API interceptor (401 responses)
    const handleLogout = () => {
      setUser(null);
      setAuthLoading(false);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("logout", handleLogout);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const login: Ctx["login"] = async (
    email,
    password
  ) => {
    try {
      const response = await API.post("/api/accounts/login/", {
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
    } catch (error: any) {
  return {
    ok: false,
    error:
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Invalid email or password",
  };
}
  };

  const signup: Ctx["signup"] = async (
    first_name,
    email,
    password
  ) => {
    try {
      await API.post("/api/accounts/signup/", {
        first_name,
        last_name: "",
        email,
        phone_number: "",
        password,
      });

      return {
        ok: true,
      };
    } catch (error: any) {
  return {
    ok: false,
    error:
      error?.response?.data?.message ||
      error?.response?.data?.email?.[0] ||
      "Signup failed",
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
    authLoading,
    updateUser,
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
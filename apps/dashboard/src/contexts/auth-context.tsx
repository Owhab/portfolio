import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "@/services/auth.service";
import { authHelpers } from "@/lib/api-client";
import type { LoginCredentials, RegisterCredentials, User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check authentication status and fetch user on mount
  useEffect(() => {
    const checkAuth = async () => {
      const hasToken = authHelpers.isAuthenticated();

      if (hasToken) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid or expired
          authHelpers.removeAuthToken();
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        await authService.login(credentials);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
        navigate({ to: "/dashboard" });
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      }
    },
    [navigate],
  );

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        await authService.register(credentials);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
        navigate({ to: "/dashboard" });
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      }
    },
    [navigate],
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate({ to: "/login" });
  }, [navigate]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = authService.getGoogleAuthUrl();
  }, []);

  const loginWithGithub = useCallback(() => {
    window.location.href = authService.getGithubAuthUrl();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        loginWithGoogle,
        loginWithGithub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

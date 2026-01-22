import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { authService } from '@/services/auth.service';
import { authHelpers } from '@/lib/api-client';
import type { LoginCredentials, RegisterCredentials } from '@/types';

interface AuthContextType {
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authHelpers.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      await authService.login(credentials);
      setIsAuthenticated(true);
      navigate({ to: '/dashboard' });
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, [navigate]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await authService.register(credentials);
      setIsAuthenticated(true);
      navigate({ to: '/dashboard' });
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    navigate({ to: '/login' });
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

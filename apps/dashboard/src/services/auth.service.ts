import { apiClient, authHelpers } from '@/lib/api-client';
import type { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    authHelpers.setAuthToken(response.accessToken);
    return response;
  },

  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    authHelpers.setAuthToken(response.accessToken);
    return response;
  },

  /**
   * Logout - clear token
   */
  logout(): void {
    authHelpers.removeAuthToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return authHelpers.isAuthenticated();
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  /**
   * Get OAuth login URL for Google
   */
  getGoogleAuthUrl(): string {
    return `${API_BASE_URL}/auth/google`;
  },

  /**
   * Get OAuth login URL for GitHub
   */
  getGithubAuthUrl(): string {
    return `${API_BASE_URL}/auth/github`;
  },
};

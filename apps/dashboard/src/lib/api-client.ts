import { router } from "@/router";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown,
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

function getAuthToken(): string | null {
  return localStorage.getItem("accessToken");
}

function setAuthToken(token: string): void {
  localStorage.setItem("accessToken", token);
}

function removeAuthToken(): void {
  localStorage.removeItem("accessToken");
}

function isAuthenticated(): boolean {
  return !!getAuthToken();
}

async function request<T>(
  method: RequestMethod,
  endpoint: string,
  data?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // Add query params for GET requests
  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url.toString(), config);

  // Handle 401 Unauthorized - redirect to login
  if (response.status === 401) {
    removeAuthToken();
    router.navigate({ to: "/login" });
    throw new ApiError(response.status, response.statusText);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(response.status, response.statusText, errorData);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

// HTTP method helpers
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("GET", endpoint, undefined, options),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>("POST", endpoint, data, options),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", endpoint, data, options),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>("PUT", endpoint, data, options),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>("DELETE", endpoint, undefined, options),
};

// Auth helpers exported for use in auth context
export const authHelpers = {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isAuthenticated,
};

export { ApiError };

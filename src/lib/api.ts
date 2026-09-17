const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export interface ApiError {
  message: string;
  status?: number;
}

async function request<T = unknown>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const err: ApiError = {
      // Laravel 422 memakai format { message, errors: {...} }
      message: body?.message || `Error ${res.status}`,
      status: res.status,
    };
    throw err;
  }

  return body as T;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>(path),
  post: <T = unknown>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) }),
  put: <T = unknown>(path: string, data: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data) }),
  del: <T = unknown>(path: string) => request<T>(path, { method: "DELETE" }),
};

export type Role = "pasien" | "klinik" | "admin";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResult {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    user: SessionUser;
    admin?: unknown;
  };
}

/** Role backend -> role design FE */
export function feRoleOf(backendRole?: string): Role {
  switch (backendRole) {
    case "admin":
      return "admin";
    case "doctor":
      return "klinik";
    case "customer":
      return "pasien";
    default:
      return "pasien";
  }
}

export async function login(email: string, password: string): Promise<SessionUser> {
  const res = await api.post<LoginResult>("/auth/login", { email, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data.user;
}

export async function fetchMe(): Promise<SessionUser> {
  const res = await api.get<{ success: boolean; data: { user: SessionUser } }>("/me");
  return res.data.user;
}

export function logout(): void {
  localStorage.removeItem("token");
  window.location.href = "/";
}
import { createContext, useCallback, useMemo, useState } from "react";
import { loginRequest, logoutRequest } from "@/api/auth.api";
import { userFromToken } from "@/utils/auth";

export const AuthContext = createContext(null);
const TOKEN_KEY = "keystone_token";
const USER_KEY = "keystone_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) { try { return JSON.parse(stored); } catch {} }
    const t = localStorage.getItem(TOKEN_KEY);
    return t ? userFromToken(t) : null;
  });

  const login = useCallback(async (credentials) => {
    const { data } = await loginRequest(credentials);
    const nextUser = userFromToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(data.token); setUser(nextUser);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try { if (localStorage.getItem(TOKEN_KEY)) await logoutRequest(); } catch {}
    localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY);
    setToken(null); setUser(null);
  }, []);

  const value = useMemo(() => ({ token, user, isAuthenticated: Boolean(token && user), login, logout }), [token, user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

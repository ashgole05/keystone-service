export function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch { return null; }
}
export function userFromToken(token) {
  const payload = decodeJwt(token);
  if (!payload) return null;
  return { email: payload.sub, role: payload.role, expiresAt: payload.exp ? payload.exp * 1000 : null };
}

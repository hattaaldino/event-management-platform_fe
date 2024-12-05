import { jwtDecode } from "jwt-decode";

// Tipe data token yang didekode
interface DecodedToken {
  username: string;
  exp: number;
}

// Fungsi login
export const login = async (username: string, password: string): Promise<void> => {
  const response = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login gagal");

  const data = await response.json();
  localStorage.setItem("token", data.token);
};

// Fungsi logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Fungsi memvalidasi autentikasi
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decoded: DecodedToken = jwtDecode(token);
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp > now;
};

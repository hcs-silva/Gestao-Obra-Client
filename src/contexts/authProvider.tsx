import { useState, type ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import type { User } from "../types/auth";
import { AuthContext } from "./authContext";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5005";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.authToken);
      localStorage.setItem("userId", response.data.userId);
      setIsLoggedIn(true);
      setUser({
        clientId: response.data.clientId,
        userId: response.data.userId,
        username,
        role: response.data.role,
        resetPassword: response.data.resetPassword,
      });
      
      toast.success("Login successful!");
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

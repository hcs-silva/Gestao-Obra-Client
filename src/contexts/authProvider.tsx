import { useState, type ReactNode } from "react";
import axios from "axios";

import type {User} from "../types/auth";
import { AuthContext } from "./authContext";



const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5005";





interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  
  const login = (username: string, password: string) => {
    axios
      .post(`${BACKEND_URL}/users/login`, { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.authToken);
        localStorage.setItem("userId", response.data.userId);
        
      });
    setUser({ username, password });
  };

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



import type { UserRole } from "../config/roleConfig";

export type User = {
  userId: string;
  username: string;
  // isAdmin: boolean;
  // masterAdmin: boolean;
  role: UserRole;
  resetPassword: boolean;
};

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

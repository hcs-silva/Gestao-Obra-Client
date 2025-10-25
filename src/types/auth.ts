export type User = { userId: string; username: string; password: string; isAdmin: boolean; masterAdmin: boolean; resetPassword: boolean };

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: boolean, 
}

// roleConfig.ts

export type UserRole = 'masterAdmin' | 'Admin' | 'user' | 'guest';

export type NavAction =
  | { id: string; label: string; to: string }                 // navigational action
  | { id: string; label: string; onClick: 'logout' | 'login' };// UI-invoked action tokens

export type RoleConfig = {
  actions: Record<UserRole, NavAction[]>;
  routeAccess: Record<
    string,                                                   // route path or key
    { allowedRoles: UserRole[] }
  >;
};

export const roleConfig: RoleConfig = {
  actions: {
    masterAdmin: [
      { id: 'master-dashboard', label: 'Master Dashboard', to: '/masterdash' },
      { id: 'clients', label: 'Clients', to: '/clients' },
      { id: 'add-client', label: 'Add Client', to: '/addclient' },
      { id: 'settings', label: 'Settings', to: '/settings' },
      { id: 'logout', label: 'Logout', onClick: 'logout' },
    ],
    Admin: [
      { id: 'admin-home', label: 'Home', to: '/dashboard' },      
      { id: 'team', label: 'Team', to: '/team' },
      { id: 'logout', label: 'Logout', onClick: 'logout' },
    ],
    user: [
      { id: 'app-home', label: 'Home', to: '/app' },
      { id: 'profile', label: 'Profile', to: '/profile' },
      { id: 'logout', label: 'Logout', onClick: 'logout' },
    ],
    guest: [
      { id: 'login', label: 'Login', onClick: 'login' },
    ],
  },

  // Route-level authorization metadata (for ProtectedRoute use)
  routeAccess: {
    '/masterdash': { allowedRoles: ['masterAdmin'] },
    '/clients': { allowedRoles: ['masterAdmin'] },
    '/addclient': { allowedRoles: ['masterAdmin'] },
    '/settings': { allowedRoles: ['masterAdmin'] },

    '/admin': { allowedRoles: ['Admin'] },    
    '/team': { allowedRoles: ['masterAdmin', 'Admin'] },

    '/app': { allowedRoles: ['masterAdmin', 'Admin', 'user'] },
    '/profile': { allowedRoles: ['masterAdmin', 'Admin', 'user'] },
  },
};

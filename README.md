# Nexus Obra – Gestão de Obra Client

Client-side application for **Nexus Obra**, a multi-tenant construction management system (Gestão de Obra). Users can manage clients, builds (obras), and quotations (orçamentos) with role-based access control.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** – build tool and dev server
- **React Router 7** – routing
- **Axios** – HTTP client
- **SASS** – styling (CSS Modules)
- **React Toastify** – notifications

## Features

- **Authentication** – login, logout, password reset
- **Role-based access** – `masterAdmin`, `Admin`, `user`, `guest`
- **Protected routes** – client-scoped access for non-admin users
- **Client management** (masterAdmin) – create, list, edit, delete clients
- **Client logo** – fetched from backend, displayed in navbar
- **Dashboard** – per-client dashboard with links to Obras and Orçamentos
- **Master Dashboard** – admin overview and client management entry points

### User Roles

| Role        | Access                                                                 |
|-------------|------------------------------------------------------------------------|
| masterAdmin | Master Dashboard, client list, add/edit clients, full system access    |
| Admin       | Client-specific dashboard, Obras, Orçamentos, team management          |
| user        | Home, Profile                                                          |
| guest       | Login only                                                             |

## Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── BuildList.tsx   # Obras list (placeholder)
│   ├── ClientList.tsx  # Client list (masterAdmin)
│   ├── CreateClient.tsx
│   ├── EditClient.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx      # Role-based navigation
│   ├── ProtectedRoute.tsx
│   └── QuotationList.tsx # Orçamentos list (placeholder)
├── config/
│   └── roleConfig.ts   # Role definitions and nav actions
├── contexts/
│   ├── authContext.ts
│   └── authProvider.tsx
├── hooks/
│   └── useAuth.ts
├── Pages/
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── MasterDashboard.tsx
│   ├── PasswordUpdatePage.tsx
│   └── WelcomePage.tsx
├── sass/               # SCSS modules
├── styles/             # Compiled CSS modules
└── types/
    └── auth.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BACKEND_URL=http://localhost:5005
```

> **Note:** Vite exposes only variables prefixed with `VITE_` to the client. The backend URL defaults to `http://localhost:5005` if not set.

### Development

```bash
npm run dev
```

Runs the app at [http://localhost:5173](http://localhost:5173) (or the next available port).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path                     | Access                     | Description                    |
|--------------------------|----------------------------|--------------------------------|
| `/`                      | Public                     | Welcome page                   |
| `/login`                 | Public                     | Login form                     |
| `/masterdash`            | masterAdmin                | Master dashboard               |
| `/allclients`            | masterAdmin                | Client list                    |
| `/addclient`             | masterAdmin                | Create client                  |
| `/editclient/:clientId`  | masterAdmin / client match | Edit client                    |
| `/dashboard/:clientId`   | Admin (client match)       | Client dashboard               |
| `/builds`                | Authenticated              | Obras list                     |
| `/quotations`            | Authenticated              | Orçamentos list                |
| `/resetpassword/:userId` | Authenticated              | Password reset                 |

## Design & Styling

- **Design system:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) – NexusObra palette, typography, components
- **Implementation guide:** [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) – how to use SASS modules and mixins

## Backend

This client expects a backend API. Ensure the backend is running and reachable at the URL configured in `VITE_BACKEND_URL`.

## License

Private project.

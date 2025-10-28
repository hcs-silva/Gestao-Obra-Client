import styles from "../styles/main.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { roleConfig} from "../config/roleConfig";
import type { UserRole } from "../config/roleConfig";

const Navbar = () => {
 const { isLoggedIn, logout, user } = useAuth();
  const nav = useNavigate();

  const role: UserRole = (isLoggedIn ? user?.role : 'guest') ?? 'guest'
  const items = role ? roleConfig.actions[role] : [];

  const handlers: Record<string, () => void> = {
    login: () => nav('/login'),
    logout: () => { logout(); nav('/'); },
  };

  return (
    <div className={`${styles.navbar} ${role === 'guest' ? styles.loginButton : styles.logoutButton}`}>
      {items.map((it) =>
        'to' in it
          ? <button key={it.label} onClick={() => nav(it.to)}>{it.label}</button>
          : <button key={it.label} onClick={handlers[it.onClick] ?? (() => {})}>{it.label}</button>
      )}
    </div>
  );
};
export default Navbar;

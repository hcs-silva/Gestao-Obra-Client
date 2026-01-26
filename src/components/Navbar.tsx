import styles from "../styles/main.module.css";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { roleConfig} from "../config/roleConfig";
import type { UserRole } from "../config/roleConfig";
import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

const Navbar = () => {
 const { isLoggedIn, logout, user } = useAuth();
  const nav = useNavigate();
  const [logoToDisplay, setLogoToDisplay] = useState<string>();
  const role: UserRole = (isLoggedIn ? user?.role : 'guest') ?? 'guest'
  const items = role ? roleConfig.actions[role] : [];
  

  const handlers: Record<string, () => void> = {
    login: () => nav('/login'),
    logout: () => { logout(); nav('/'); },
  };

   useEffect(() => {
    if (!isLoggedIn || !user || !user.clientId) {
      setLogoToDisplay(undefined);
      return;
    }

    axios
      .get(`${BACKEND_URL}/clients/${user?.clientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        
        const logoUrl = response.data.clientLogo;
        
        setLogoToDisplay(logoUrl);
      })
      .catch((error) => {
        console.error("Error fetching client logo:", error);
      });
  }, [user, isLoggedIn]);

  // Determine if image should be hidden
  const shouldHideImage = !isLoggedIn || user?.role === "masterAdmin";

  return (
    <div className={`${styles.navbar} ${role === 'guest' ? styles.loginButton : styles.logoutButton}`}>
      <img
        src={logoToDisplay}
        alt=""
        className={`${styles.img} ${shouldHideImage ? styles.hidden : ""}`}
      />
      <span> Client ID: {user?.clientId}</span>
      {items.map((it) =>
        'to' in it
          ? <button key={it.label} onClick={() => nav(it.to)}>{it.label}</button>
          : <button key={it.label} onClick={handlers[it.onClick] ?? (() => {})}>{it.label}</button>
      )}
    </div>
  );
};
export default Navbar;

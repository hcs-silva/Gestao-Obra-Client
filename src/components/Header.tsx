import styles from "../styles/header.module.css";

import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";
const Header = () => {
  const { user, isLoggedIn } = useAuth();
  const [logoToDisplay, setLogoToDisplay] = useState<string>();

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
        console.log("Full Response:", response);
        console.log("Response Data:", response.data);
        const logoUrl = response.data.clientLogo;
        console.log("Client Logo URL:", logoUrl);
        setLogoToDisplay(logoUrl);
      })
      .catch((error) => {
        console.error("Error fetching client logo:", error);
      });
  }, [user, isLoggedIn]);

  // Determine if image should be hidden
  const shouldHideImage = !isLoggedIn || user?.role === "masterAdmin";

  return (
    <div className={styles.header}>
      <img
        src={logoToDisplay}
        alt=""
        className={`${styles.img} ${shouldHideImage ? styles.hidden : ""}`}
      />
      <h1>Gestão de Obra</h1>
    </div>
  );
};
export default Header;

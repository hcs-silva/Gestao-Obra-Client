import styles from "../styles/main.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const nav = useNavigate();

  function goToLogin() {
    nav("/login");
  }
  console.log(isLoggedIn);
  return (
    <div
      className={`${styles.navbar} ${
        isLoggedIn ? styles.logoutButton : styles.loginButton
      }`}
    >
      {" "}
      {isLoggedIn ? (
        <button
          onClick={() => {
            logout();
            nav("/");
          }}
        >
          Logout
        </button>
      ) : (
        <button onClick={goToLogin}>Login</button>
      )}
    </div>
  );
};
export default Navbar;

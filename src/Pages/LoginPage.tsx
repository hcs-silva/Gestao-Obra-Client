import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginpage.module.css";

import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { login, user } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      login(username, password);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      // Error handling is done in authProvider, but we catch here to prevent unhandled rejection
      // Toast notification is already shown by authProvider
    }
  }
  useEffect(() => {
    if (user?.resetPassword === true) {
      nav(`/resetpassword/${user.userId}`);
    } else if (user?.role === "masterAdmin") {
      nav("/masterdash");
    } else if (user?.role === "Admin") {
      nav(`/dashboard/${user.clientId}`);
    }
  }, [user, nav]);

  return (
    <div className={styles.loginpage}>
      <h1 className={styles.h1}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;

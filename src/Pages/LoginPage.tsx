import { useState } from "react";
import styles from "../styles/loginpage.module.css";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userToLogin = {
      username,
      password,
    };

      //TODO: Finish implementing login workflow here and in the server and role-based authentication

    axios
      .post(`${BACKEND_URL}/users/login`, userToLogin).then((response) => {
        localStorage.setItem("token", response.data.authToken);
        localStorage.setItem("userId", response.data.userId)
      })
      
  }

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

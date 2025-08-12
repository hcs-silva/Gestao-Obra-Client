import { useState } from "react";
import styles from "../styles/loginpage.module.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.loginpage}>
      <h1 className={styles.h1}>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;

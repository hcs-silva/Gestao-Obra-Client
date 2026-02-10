import styles from "../styles/welcome.module.css";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const nav = useNavigate();

  return (
    <div className={styles.welcomePage}>
      <h1>Bem vindo. Faça login com as suas credenciais para continuar.</h1>
      <div className={styles.actions}>
        <button className={styles.btnPrimary} onClick={() => nav("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};
export default WelcomePage;
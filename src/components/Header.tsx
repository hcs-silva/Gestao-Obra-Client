import styles from "../styles/header.module.css";
import logoPt from "../assets/Nexus_Build.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={logoPt} alt="Nexus Obra Logo" className={styles.logo} />
    </div>
  );
};
export default Header;

import styles from "../sass/dashboard.module.scss";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const nav = useNavigate();
  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      <div>
        <button onClick={()=> nav("/builds")}>Obras</button>
        <button onClick={()=> nav("/quotations")}>Orçamentos</button>
      </div>
    </div>
  );
};
export default DashboardPage;

import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import MasterDashboard from "./Pages/MasterDashboard";
import PasswordUpdatePage from "./Pages/PasswordUpdatePage";
import WelcomePage from "./Pages/WelcomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import styles from "./styles/common.module.css";
import { Routes, Route } from "react-router-dom";

function App() {

  //TODO: Implement protection for relevant Routes 
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>
          <Navbar />

          <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="/masterdash" element={<MasterDashboard />}></Route>
            <Route path="/resetpassword/:userId" element={<PasswordUpdatePage/>}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

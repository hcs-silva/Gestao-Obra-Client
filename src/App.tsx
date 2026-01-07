import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import MasterDashboard from "./Pages/MasterDashboard";
import PasswordUpdatePage from "./Pages/PasswordUpdatePage";
import WelcomePage from "./Pages/WelcomePage";
import ClientList from "./components/ClientList";
import CreateClient from "./components/CreateClient";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import styles from "./styles/common.module.css";
import { Routes, Route } from "react-router-dom";

function App() {

  
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>
          <Navbar />

          <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/dashboard/:clientId" element={<DashboardPage />}></Route>
            <Route path="/masterdash" element={<MasterDashboard />}></Route>
            <Route path="/resetpassword/:userId" element={<PasswordUpdatePage/>}></Route>
            <Route path="/addclient" element={<CreateClient/>}></Route>
            <Route path="/allclients" element ={<ClientList/>}></Route> 
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import MasterDashboard from "./Pages/MasterDashboard";
import PasswordUpdatePage from "./Pages/PasswordUpdatePage";
import WelcomePage from "./Pages/WelcomePage";
import ClientList from "./components/ClientList";
import CreateClient from "./components/CreateClient";
import EditClient from "./components/EditClient";
import ObraList from "./components/ObraList";
import CreateObra from "./components/CreateObra";
import EditObra from "./components/EditObra";
import ManageObra from "./components/ManageObra";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import styles from "./styles/common.module.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { logout } = useAuth();

  // Logout on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only logout if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        logout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [logout]);

  return (
    <>
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>
          <Navbar />

          <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route
              path="/dashboard/:clientId"
              element={<DashboardPage />}
            ></Route>
            <Route path="/masterdash" element={<MasterDashboard />}></Route>
            <Route
              path="/resetpassword/:userId"
              element={<PasswordUpdatePage />}
            ></Route>
            <Route path="/addclient" element={<CreateClient />}></Route>
            <Route path="/allclients" element={<ClientList />}></Route>
            <Route
              path="/editclient/:clientId"
              element={<EditClient />}
            ></Route>
            <Route path="/allobras" element={<ObraList />}></Route>
            <Route path="/addobra" element={<CreateObra />}></Route>
            <Route
              path="/editobra/:obraId"
              element={<EditObra />}
            ></Route>
            <Route
              path="/manageobra/:obraId"
              element={<ManageObra />}
            ></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

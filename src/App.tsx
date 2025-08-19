import LoginPage from "./Pages/LoginPage";
import WelcomePage from "./Pages/WelcomePage";
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
          <WelcomePage />
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

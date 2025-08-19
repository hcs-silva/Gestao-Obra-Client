import LoginPage from "./Pages/LoginPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import styles from "./styles/common.module.css"


function App() {
  return (
    <>
      <div className={styles.layout}>
        <Header />
        <div className={styles.main}>  
          <Navbar />        
          <LoginPage />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

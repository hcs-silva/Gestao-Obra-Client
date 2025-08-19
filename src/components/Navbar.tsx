import styles from '../styles/main.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const nav = useNavigate();

    function goToLogin() {
        nav("/login")
    }

  return (
    <div className={styles.navbar}>        
        <button onClick={goToLogin}>Login</button>
    </div>
  )
}
export default Navbar
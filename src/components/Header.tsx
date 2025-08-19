import logo from '../assets/logo.png'
import styles from '../styles/header.module.css'
const Header = () => {
  return (
    <div className={styles.header}>
        <img src={logo} alt="" />
        <h1>Gestão de Obra</h1>
    </div>
  )
}
export default Header
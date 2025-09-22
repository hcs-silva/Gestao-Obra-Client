import styles from '../styles/passwordupdatepage.module.css'
const PasswordUpdatePage = () => {

  function handlePasswordChange(){
    console.log("Mandatory password change")
  }

  //TODO: Finish implementing styles in password update page, and logic for first mandatory password update
  return (
    <div className={styles.passwordUpdatePage}>
        <h1>Password Update Page</h1>

        <form onSubmit={handlePasswordChange}>
          <label>Current Password:
            <input type="password" />
          </label>
          <label>New Password:
            <input type="password" />
          </label>
          <label>Confirm new password:
            <input type="password" />
          </label>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
    </div>
  )
}
export default PasswordUpdatePage
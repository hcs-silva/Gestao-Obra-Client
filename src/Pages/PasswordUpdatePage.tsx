import styles from "../styles/passwordupdatepage.module.css";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5005";

const PasswordUpdatePage = () => {
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const {user} = useAuth();
  const nav = useNavigate();

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await axios.patch(`${BACKEND_URL}/users/resetpassword/${userId}`, {
        newPassword,
      });
      setNewPassword("")
      setConfirmNewPassword("")
      if(user?.masterAdmin === true){
        console.log(user.masterAdmin)
        nav("/masterdash")
      }else if (user?.isAdmin === true){
        nav("/dashboard")
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: Finish implementing styles in password update page, and logic for first mandatory password update
  return (
    <div className={styles.passwordUpdatePage}>
      <h1>Password Update Page</h1>

      <form onSubmit={handlePasswordChange}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </label>
        <label>
          Confirm new password:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default PasswordUpdatePage;

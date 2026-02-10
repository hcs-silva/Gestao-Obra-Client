import styles from "../styles/clientlist.module.css";
import commonStyles from "../styles/common.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


import type { Client } from "../types/auth";


const ClientList = () => {
  const nav = useNavigate();
  
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/clients/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        // Handle the response data here
        console.log("Fetched clients:", response.data);
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  return (
    <div className={styles.clientListWrapper}>
      <h1 className={styles.title}>Client List</h1>
      <form className={commonStyles.form}>
        <label>
          Search Client:
          <input type="text" />
          <button type="submit" className={commonStyles.button}>Search</button>
        </label>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client Phone</th>
            <th>Subscription Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client) => (
            <tr key={client._id}>
              <td>{client._id}</td>
              <td>{client.clientName}</td>
              <td>{client.clientEmail}</td>
              <td>{client.clientPhone}</td>
              <td>{client.subStatus ? 'Ativo' : 'Inativo'}</td>
              <td><button className={styles.editBtn} onClick={()=> {nav(`/editclient/${client._id}`)}}>Edit</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => nav("/masterdash")} className={commonStyles.cancelBtn}>Back</button>
    </div>
  );
};
export default ClientList;

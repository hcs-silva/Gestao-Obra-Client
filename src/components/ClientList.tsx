import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/clientlist.module.css";
import type { Client } from "../types/auth";

const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5005";
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
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);
  // ...existing code...
  return (
    <div>
      <h1>Client List</h1>
      <form>
        <label>
          Search Client:
          <input type="text" />
          <button type="submit">Search</button>
        </label>
      </form>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Client Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client) => (
            <tr key={client._id}>
              <td>{client._id}</td>
              <td>{client.clientName}</td>
              <td>{client.clientEmail}</td>
              <td>{client.clientPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => nav("/masterdash")}>Back</button>
    </div>
  );
};
export default ClientList;

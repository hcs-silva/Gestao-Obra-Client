import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:5005";
const ClientList = () => {
  const nav = useNavigate()
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/clients/`, {
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
      <table>

        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      <button onClick={()=>nav("/masterdash")}>Back</button>
    </div>
  );
};
export default ClientList;

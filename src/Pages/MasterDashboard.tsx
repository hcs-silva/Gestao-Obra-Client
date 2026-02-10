import { useNavigate } from "react-router-dom";
const MasterDashboard = () => {
  const nav = useNavigate();

  function toClientList() {
    nav("/allclients")
  }
  
  function toObraList() {
    nav("/allobras")
  }
  
  return (
    <div>
      <h1>Master Dashboard</h1>
      <button onClick={() => nav("/addclient")}>Add Client</button>
      <button onClick={toClientList}>Client List</button>
      <button onClick={toObraList}>Obras List</button>
    </div>
  );
};
export default MasterDashboard;

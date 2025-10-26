import { useNavigate } from "react-router-dom";
const ClientList = () => {
  const nav = useNavigate()
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
      <button onClick={()=>nav("/masterdash")}>Back</button>
    </div>
  );
};
export default ClientList;

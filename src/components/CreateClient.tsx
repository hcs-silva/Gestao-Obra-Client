import { useNavigate } from "react-router-dom";
const CreateClient = () => {
  const nav = useNavigate();

  //TODO: Implement connection between front and backend. 

  function handleCreateClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleCreateClient}>
        <label>
          Client Name:
          <input type="text" />
        </label>
        <label>
            Client Address:
            <input type="text" />
        </label>
        <label>
          Administrator Username:
          <input type="text" />
        </label>
        <label>
          Administrator Password:
          <input type="password" />
        </label>
        <button type="submit">Create Client</button>
      </form>
      <button onClick={()=> nav("/masterdash")}>Back</button>
    </div>
  );
};
export default CreateClient;

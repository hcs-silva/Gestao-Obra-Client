import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const CreateClient = () => {
  const nav = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  function handleCreateClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  
//TODO: fix image upload functionality and correct models on the backend ASAP


  const handleImageChange = (e: React.FormEvent<HTMLFormElement>) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzdrwiugn/image/upload",
        formData
      );

      console.log(response);
      setProfilePicture(response.data.secure_url);
      console.log(profilePicture);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      <h1>Create Client</h1>
      <form onSubmit={handleCreateClient}>
        <label>
          Client Name:
          <input type="text" />
        </label>
        <label>
          Client Logo:
           <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                
                className='border-cream-300 text-cream-700'
              />
              <button
                type='button'
                onClick={handleUpload}
                disabled={uploading}
                
                className={
                  uploading ? 'bg-cream-400 cursor-not-allowed' : 'bg-cream-600'
                }
                
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
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
      <button onClick={() => nav("/masterdash")}>Back</button>
    </div>
  );
};
export default CreateClient;

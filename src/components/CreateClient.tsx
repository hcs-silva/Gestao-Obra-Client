import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";
const CreateClient = () => {
  const nav = useNavigate();
  const [clientLogo, setClientLogo] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const DEFAULT_CLIENT_LOGO = "../assets/defaultUser.jpg";

  async function handleCreateClient(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate required fields
    if (!clientName.trim() || !adminUsername.trim() || !adminPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    // Validate password length
    if (adminPassword.length < 8) {
      toast.error("Administrator password must be at least 8 characters long");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BACKEND_URL}/clients/createClient`,
        {
          clientName: clientName.trim(),
          adminUsername: adminUsername.trim().toLowerCase(),
          adminPassword: adminPassword,
          clientLogo: clientLogo || DEFAULT_CLIENT_LOGO,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Client created successfully!");

      // Reset form
      setClientName("");
      setAdminUsername("");
      setAdminPassword("");
      setClientLogo("");
      setImageFile(null);

      // Navigate back after a short delay
      setTimeout(() => {
        nav("/masterdash");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create client. Please try again.";
      toast.error(errorMessage);
    }
  }

  //TODO: fix image upload functionality and correct models on the backend ASAP

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.warning("Please select an image file");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzdrwiugn/image/upload",
        formData
      );

      setClientLogo(response.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to upload image. Please try again.";
      toast.error(errorMessage);
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
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </label>
        <label>
          Client Logo:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border-cream-300 text-cream-700"
          />
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className={
              uploading ? "bg-cream-400 cursor-not-allowed" : "bg-cream-600"
            }
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </label>
        <label>
          Administrator Username:
          <input
            type="text"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
          />
        </label>
        <label>
          Administrator Password:
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </label>
        <button type="submit">Create Client</button>
      </form>
      <button onClick={() => nav("/masterdash")}>Back</button>
    </div>
  );
};
export default CreateClient;

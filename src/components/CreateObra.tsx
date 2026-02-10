import styles from "../sass/createclient.module.scss";
import commonStyles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5005";

const CreateObra = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<"planned" | "in-progress" | "completed" | "cancelled">("planned");
  const [cadernoFile, setCadernoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(xls|xlsx)$/i)) {
        toast.error("Please upload a valid .xls or .xlsx file");
        return;
      }
      setCadernoFile(file);
    }
  };

  const handleUploadCaderno = async () => {
    if (!cadernoFile) {
      return null;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", cadernoFile);
    formData.append("upload_preset", "ml_default");
    formData.append("resource_type", "raw");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzdrwiugn/raw/upload",
        formData
      );

      return {
        fileName: cadernoFile.name,
        fileUrl: response.data.secure_url,
        uploadDate: new Date(),
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload caderno de encargos");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCreateObra = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim()) {
      toast.error("Nome da obra é obrigatório");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      let cadernoEncargos = null;

      // Upload caderno if file is selected
      if (cadernoFile) {
        cadernoEncargos = await handleUploadCaderno();
        if (!cadernoEncargos) {
          return; // Upload failed
        }
      }

      await axios.post(
        `${BACKEND_URL}/obras/`,
        {
          name: name.trim(),
          description: description.trim(),
          location: location.trim(),
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          status,
          cadernoEncargos,
          faturas: [],
          totalExpenses: 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Obra criada com sucesso!");

      // Reset form
      setName("");
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setStatus("planned");
      setCadernoFile(null);

      // Navigate back after a short delay
      setTimeout(() => {
        nav("/allobras");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create obra. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className={styles.createClientWrapper}>
      <h1 className={styles.title}>Criar Nova Obra</h1>
      <form className={commonStyles.form} onSubmit={handleCreateObra}>
        <label>
          Nome da Obra:*
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </label>
        <label>
          Localização:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Estado:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "planned" | "in-progress" | "completed" | "cancelled")}
          >
            <option value="planned">Planeada</option>
            <option value="in-progress">Em Progresso</option>
            <option value="completed">Concluída</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </label>
        <label>
          Caderno de Encargos (.xls/.xlsx):
          <input
            type="file"
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileChange}
          />
          {cadernoFile && (
            <p style={{ fontSize: "0.9em", marginTop: "5px" }}>
              Ficheiro selecionado: {cadernoFile.name}
            </p>
          )}
        </label>
        <div className={commonStyles.actions}>
          <button
            type="button"
            onClick={() => nav("/allobras")}
            className={commonStyles.cancelBtn}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={uploading}
            className={commonStyles.submitBtn}
          >
            {uploading ? "A carregar ficheiro..." : "Criar Obra"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateObra;

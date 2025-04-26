import React, { useEffect, useState } from "react";
import styles from "./EditInfo.module.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import useResident from "../hooks/useResident";
import { useMessage } from "../context/MessageContext";
import useImage from "../hooks/useImage";
import Loading from "../components/Loading";

const EditInfo = () => {
  const { id } = useParams()
  const { fetchResidentById, updateResident } = useResident()
  const { getImageUrl } = useImage()
  const { showMessage } = useMessage()
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [born, setBorn] = useState("");
  const [gender, setGender] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [comorbidities, setComorbidities] = useState("");
  const [otherHospitalizations, setOtherHospitalizations] = useState("");
  const [legalIssues, setLegalIssues] = useState("");
  const [loading, setLoading] = useState("");
  const [obs, setObs] = useState("")
  const [responsible, setResponsible] = useState({ name: "", address: "", phone: "", cpf: "", familiarity: "" });
  const [exitPlug, setExitPlug] = useState(null)
  const navigate = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      e.target.value = '';
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("responsible.")) {
      const field = name.split(".")[1];
      setResponsible((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else if (name.includes("exitPlug.")) {
      const field = name.split(".")[1];
      setExitPlug((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "cpf":
          setCpf(value);
          break;
        case "phone":
          setPhone(value);
          break;
        case "address":
          setAddress(value);
          break;
        case "born":
          setBorn(value);
          break;
        case "gender":
          setGender(value);
          break;
        case "entryDate":
          setEntryDate(value);
          break;
        case "comorbidities":
          setComorbidities(value);
          break;
        case "otherHospitalizations":
          setOtherHospitalizations(value);
          break;
        case "legalIssues":
          setLegalIssues(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let fetchedImg = imageUrl || "";
    if (image) {
      try {
        fetchedImg = await getImageUrl(image);
        setImageUrl(fetchedImg);
      } catch (error) {
        showMessage("Erro ao enviar a imagem", "error");
        setLoading(false);
        return;
      }
    }

    try {
      await updateResident(id, {
        name,
        imageUrl: fetchedImg || null,
        cpf,
        phone,
        address,
        born,
        gender,
        entryDate,
        comorbidities,
        otherHospitalizations,
        legalIssues,
        responsible,
        obs,
        ...(exitPlug && { exitPlug }),      });

      showMessage("Dados atualizados com sucesso!", "success");
      navigate(`/dashboard/residente/${id}/perfil`);
    } catch (error) {
      showMessage("Erro ao atualizar os dados :(", "error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const getResident = async () => {
      try {
        const fetchedResident = await fetchResidentById(id);
        if (fetchedResident) {
          setName(fetchedResident.name || "");
          setImageUrl(fetchedResident.imageUrl || "");
          setCpf(fetchedResident.cpf || "");
          setPhone(fetchedResident.phone || "");
          setAddress(fetchedResident.address || "");
          setBorn(fetchedResident.born || "");
          setGender(fetchedResident.gender || "");
          setEntryDate(fetchedResident.entryDate || "");
          setComorbidities(fetchedResident.comorbidities || "");
          setOtherHospitalizations(fetchedResident.otherHospitalizations || "");
          setLegalIssues(fetchedResident.legalIssues || "");
          setResponsible(fetchedResident.responsible || { name: "", address: "", phone: "", cpf: "", familiarity: "" });
          setExitPlug(fetchedResident.exitPlug || "");
          setObs(fetchedResident.obs || "")
        }
      } catch (error) {
        showMessage(`Erro ao buscar residente`, "error", 5000);
        navigate("/")
        console.log(error);
      } finally {
        setIsLoaded(true)
      }
    };
    getResident();

  }, []);
  if (!isLoaded) {
    return (
      <div style={{ height: "70vh" }}><Loading /></div>
    )
  }
  return (
    <div className={styles.editContainer}>
      <h2>Editar Residente</h2>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <span className={styles.labelText}>Foto *</span>
            <div className={styles.imageField}>
              {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
              {(!image && imageUrl) && <img src={imageUrl} alt="Foto de perfil" />}
            </div>
            <label htmlFor="image" className={styles.customFileUpload}>
              {image || imageUrl ? "Escolher outra foto" : <MdAddPhotoAlternate />}
            </label>
            <input
              type="file"
              id="image"
              className={styles.hiddenInput}
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              className={styles.input}
              value={cpf}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={styles.input}
              value={phone}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              className={styles.input}
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="born">Data de Nascimento</label>
            <input
              type="text"
              id="born"
              name="born"
              className={styles.input}
              value={born}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gender">Gênero</label>
            <input
              type="text"
              id="gender"
              name="gender"
              className={styles.input}
              value={gender}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="entryDate">Data de Entrada</label>
            <input
              type="text"
              id="entryDate"
              name="entryDate"
              className={styles.input}
              value={entryDate}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="comorbidities">Comorbidades</label>
            <select
              id="comorbidities"
              name="comorbidities"
              className={styles.input}
              value={comorbidities}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="otherHospitalizations">Outras internações</label>
            <select
              id="otherHospitalizations"
              name="otherHospitalizations"
              className={styles.input}
              value={otherHospitalizations}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="legalIssues">Pendências judiciais</label>
            <select
              id="legalIssues"
              name="legalIssues"
              className={styles.input}
              value={legalIssues}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>
        </div>


        <div className={styles.container}>
          {exitPlug && <>
            <div className={styles.formGroup}>
              <label >Tempo de residência</label>
              <input
                type="text"
                className={styles.input}
                value={exitPlug.time}
                name="exitPlug.time"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>

              <label >Data de saida</label>
              <input
                type="text"
                className={styles.input}
                name="exitPlug.date"
                value={exitPlug.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label >Motivo da saída</label>
              <input
                type="text"
                name="exitPlug.reason"
                className={styles.input}
                value={exitPlug.reason}
                onChange={handleChange}
                required
              />
            </div>

          </>
          }
          <div className={styles.formGroup}>
            <label htmlFor="responsible.name">Nome do responsável</label>
            <input
              type="text"
              id="responsible.name"
              name="responsible.name"
              className={styles.input}
              value={responsible.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="responsible.address">Endereço do responsável</label>
            <input
              type="text"
              id="responsible.address"
              name="responsible.address"
              className={styles.input}
              value={responsible.address}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="responsible.phone">Telefone do responsável</label>
            <input
              type="text"
              id="responsible.phone"
              name="responsible.phone"
              className={styles.input}
              value={responsible.phone}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="responsible.cpf">CPF do responsável</label>
            <input
              type="text"
              id="responsible.cpf"
              name="responsible.cpf"
              className={styles.input}
              value={responsible.cpf}
              onChange={handleChange}

            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="responsible.familiarity">Parentesco</label>
            <input
              type="text"
              id="responsible.familiarity"
              name="responsible.familiarity"
              className={styles.input}
              value={responsible.familiarity}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label >Observações</label>
            <textarea
              name="obs"
              id="obs"
              className={styles.input}
              value={obs}
              onChange={(e)=>setObs(e.target.value)}
            />

          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInfo;

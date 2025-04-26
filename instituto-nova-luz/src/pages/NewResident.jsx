import React, { useState } from 'react';
import styles from './NewResident.module.css';
import { MdAddPhotoAlternate } from "react-icons/md";
import useImage from '../hooks/useImage';
import useResident from '../hooks/useResident';
import { useMessage } from '../context/MessageContext';
import { useNavigate } from 'react-router-dom';

const NewResident = () => {
  const { getImageUrl } = useImage();
  const { createResident } = useResident();
  const navigate = useNavigate()
  const { showMessage } = useMessage()
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [born, setBorn] = useState('');
  const [gender, setGender] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [comorbidities, setComorbidities] = useState('');
  const [otherHospitalizations, setOtherHospitalizations] = useState('');
  const [legalIssues, setLegalIssues] = useState('');
  const [obs, setObs] = useState("")
  const [responsible, setResponsible] = useState({
    name: '',
    address: '',
    phone: '',
    cpf: '',
    familiarity: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      e.target.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('responsible.')) {
      const field = name.split('.')[1];
      setResponsible((prev) => ({
        ...prev,
        [field]: value
      }));
    } else {
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'cpf':
          setCpf(value);
          break;
        case 'phone':
          setPhone(value);
          break;
        case 'address':
          setAddress(value);
          break;
        case 'born':
          setBorn(value);
          break;
        case 'gender':
          setGender(value);
          break;
        case 'entryDate':
          setEntryDate(value);
          break;
        case 'comorbidities':
          setComorbidities(value);
          break;
        case 'otherHospitalizations':
          setOtherHospitalizations(value);
          break;
        case 'legalIssues':
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
    try {
      let fetchImg = "";
      if (image) {
        fetchImg = await getImageUrl(image);
        setImageUrl(fetchImg);
      }
      await createResident({
        name,
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
        imageUrl: fetchImg || null
      });

      showMessage("Residente cadastrado com sucesso!", "success");
      navigate("/dashboard");
    } catch (error) {
      showMessage('Erro ao cadastrar o residente', "error");
    } finally { setLoading(false) }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Cadastrar residente</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
          <span className={styles.labelText}>Foto </span>
          {(!image && !imageUrl) && <p className={styles.type}>Dica: Para evitar que a foto fique esticada, tente usar uma o mais quadrada possível.</p>}
          <div className={styles.imageField}>
            {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
          </div>
          <label htmlFor="image" className={`${styles.customFileUpload} ${styles.input}`}>
            {image ? 'Alterar Foto' :
              <MdAddPhotoAlternate />
            }
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className={styles.hiddenInput}
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <button onClick={() => setImage(null)} className={styles.rmPhoto}>Remover foto</button>}
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
          <label htmlFor="born">Data de nascimento</label>
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
          <label htmlFor="entryDate">Data de entrada</label>
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

        <div className={styles.formGroup}>
          <label htmlFor="responsible.name">Nome do responsável</label>
          <input
            type="text"
            id="responsible.name"
            name="responsible.name"
            className={styles.input}
            value={responsible.name}
            onChange={handleChange}
            required
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
          <label htmlFor="text">Observações</label>
          <textarea value={obs} onChange={(e) => setObs(e.target.value)} id="obs" />
        </div>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>

      </form>
    </div>
  );
};

export default NewResident;

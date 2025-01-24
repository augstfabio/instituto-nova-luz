import React, { useEffect, useState } from 'react';
import { RiHeartAdd2Line } from "react-icons/ri";
import styles from './ResidentProfile.module.css';
import { FaEdit } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { GoDesktopDownload } from "react-icons/go";
import { FaRegCircleDot } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useResident from '../hooks/useResident';
import ResidentPdf from '../components/ResidentPdf';
import { useMessage } from '../context/MessageContext';
import { LuUserCheck,LuUserX } from "react-icons/lu";
import Modal from '../components/Modal';

export default function ResidentProfile() {
    const [modalText, setModalText] = useState("")
    const [modalTitle, setModaTitle] = useState("")
    const [action, setAction] = useState("")
    const navigate = useNavigate()
    const { id } = useParams();
    const { resident: residente, getResidentById, deleteResident, reactivateResident } = useResident()
    const { showMessage } = useMessage()
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const fetchResident = () => {
            getResidentById(id)
        };
        fetchResident();
    }, [reload]);
    const handleShowModal = (modText, modTitle, action) => {
        setIsModalOpen(true)
        setModalText(modText)
        setModaTitle(modTitle)
        setAction(action)
    }
    const handleReactivate = async () => {
        setLoading(true)
        try {
            await reactivateResident(id);
            setIsModalOpen(false)
            setReload(!reload)
        } catch {
            showMessage("Erro ao reativar o residente", "error")
            setIsModalOpen(false)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteResident(id)
            showMessage("Residente excuido com sucesso", "warning", 5000)
            navigate('/dashboard')

        } catch (error) {
            showMessage(error, "error", 5000)
        } finally {
            setLoading(false)
        }
    }

    if (!residente || loading) {
        return <div className={styles.notFound}><Loading /></div>;
    }

    return (
        <div className={styles.residentProfile}>
            {isModalOpen && (
                <Modal
                    cancelBtn={() => setIsModalOpen(false)}
                    okBtn={() => {
                        if (action === "excluir") {
                            handleDelete();
                            setIsModalOpen(false)
                        } else {
                            handleReactivate()
                        }
                    }}
                    icon={<IoWarningOutline />}
                    strongTitle={modalTitle}
                    text={modalText}
                />
            )}
            <div className={styles.profileContent}>
                <div className={styles.personalInfo}>
                    <div className={styles.profilePhoto}>
                        {residente.imageUrl && <img src={residente.imageUrl} alt={residente.name} />}
                    </div>
                    <div className={styles.profileInfo}>
                        {residente.exitPlug &&
                            <h3 className={styles.inativo}> <LuUserX /> Residente Desligado</h3>}
                        {!residente.exitPlug &&
                            <h3 className={styles.ativo}><LuUserCheck /> Residente Ativo</h3>}
                        {residente.name && <p><span>Nome: </span>{residente.name}</p>}
                        {residente.cpf && <p><span>CPF: </span>{residente.cpf}</p>}
                        {residente.phone && <p><span>Telefone: </span>{residente.phone}</p>}
                        {residente.address && <p><span>Endereço: </span>{residente.address}</p>}
                        {residente.born && <p><span>Nascimento: </span>{residente.born}</p>}
                        {residente.gender && <p><span>Gênero: </span>{residente.gender}</p>}
                        {residente.entryDate && <p><span>Data de entrada: </span>{residente.entryDate}</p>}
                        {residente.comorbidities && <p><span>Comorbidades: </span>{residente.comorbidities}</p>}
                        {residente.otherHospitalizations && <p><span>Outras internações: </span>{residente.otherHospitalizations}</p>}
                        {residente.legalIssues && <p><span>Problemas judiciais: </span>{residente.legalIssues}</p>}
                        {residente.exitPlug && residente.exitPlug.time &&
                            <p className={styles.redText}><span>Tempo de residência: </span>{residente.exitPlug.time}</p>}
                        {residente.exitPlug && residente.exitPlug.date &&
                            <p className={styles.redText}><span>Data da saída: </span>{residente.exitPlug.date}</p>}
                        {residente.exitPlug && residente.exitPlug.reason &&
                            <p className={styles.redText}><span>Motivo da saída: </span>{residente.exitPlug.reason}</p>}
                    </div>
                </div>
                <div className={styles.responsible}>
                    <h3>Familiar ou responsável</h3>
                    {residente.responsible?.name && <p><span>Nome:</span> {residente.responsible.name}</p>}
                    {residente.responsible?.address && <p><span>Endereço:</span> {residente.responsible.address}</p>}
                    {residente.responsible?.phone && <p><span>Telefone:</span> {residente.responsible.phone}</p>}
                    {residente.responsible?.cpf && <p><span>CPF:</span> {residente.responsible.cpf}</p>}
                    {residente.responsible?.familiarity && <p><span>Grau de parentesco:</span> {residente.responsible.familiarity}</p>}
                </div>
            </div>
            <div className={styles.actions}>
                <span onClick={() => navigate(`/dashboard/residente/${id}/perfil/editar`)} className={styles.yelowBtn}><GrDocumentUpdate /> Atualizar dados</span>
                {!residente.exitPlug && <span onClick={() => navigate(`/dashboard/residente/${id}/ficha-de-saida`)} className={styles.yelowBtn}><MdDriveFolderUpload /> Ficha de saída</span>}
                {residente.exitPlug && <span onClick={() => handleShowModal("Os dados da ficha de saída do residente serão excluidos", "Reativar vinculo?", "reativar")} className={styles.yelowBtn}><RiHeartAdd2Line /> Reativar vínculo</span>}
                <span className={styles.download}><ResidentPdf residente={residente} /></span>
                <span onClick={() => handleShowModal("Todos os dados do residente serão peridos e nao há como recuperá-los", "Atenção", "excluir")} className={styles.redBtn}><BiTrash /> Excluir residente</span>
            </div>
            <span className={styles.test}></span>
        </div>

    );
}

import React, { useEffect, useState } from 'react'
import styles from './ExitPlug.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import useResident from '../hooks/useResident'
import { useMessage } from '../context/MessageContext'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import { CgDanger } from "react-icons/cg";
export default function ExitPlug() {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [time, setTime] = useState("")
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reason, setReason] = useState("")
    const { id } = useParams()
    const { getResidentById, resident, updateResident } = useResident()
    const { showMessage } = useMessage()
    const navigate = useNavigate()
    useEffect(() => {
        const getResident = async () => {
            try {
                await getResidentById(id);
              
            } catch (error) {
                showMessage(`Erro ao buscar residente`, "error", 5000);
                console.log(error)
            }
        };
        getResident();
    }, []);
    const handleCancel = () => {
        setShowModal(false)
        navigate(`/dashboard/residente/${id}/perfil`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await updateResident(id, {
                time,
                date,
                reason
            }, true);
            navigate(`/dashboard/residente/${id}/perfil`)
            showMessage("Ficha de saída criada ", "success", 5000);
        } catch (error) {
            showMessage("Erro ao lançar a ficha de saída", "error", 5000);
        } finally {
            setLoading(false)
        }
    };

    if (!resident) {
        return <div className={styles.notFound}><Loading /></div>;
    }
    return (
        <div className={styles.exitContainer}>
            {showModal && <Modal cancelBtn={handleCancel} okBtn={() => setShowModal(false)} icon={<CgDanger />} strongTitle="Atenção" text="Certifique-se de que os dados estão corretos. Após a criação da ficha de saída, o residente estará com status de DESLIGADO, mas continuará no banco de dados." />}
            <div className={styles.profileContainer}>
                {resident && <>
                   
                    <img src={resident.imageUrl} alt={resident.name} />
                    <p onClick={()=>navigate(`/dashboard/residente/${id}/perfil`)}>{resident.name}</p>
                   
                </>}
            </div>
            <form onSubmit={handleSubmit} className={styles.exitForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="text">Tempo de residência</label>
                    <input
                        type="text"
                        id="tempo"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Digite o tempo de residência"
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="text">Data de saída</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Digite a data de saida do residente"
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="text">Motivo da saída</label>
                    <input
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Desistência, alta terapêutica, etc."
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
        </div>
    )
}

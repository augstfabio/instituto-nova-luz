import React from 'react'
import styles from './ResidentCard.module.css'
import { useNavigate } from 'react-router-dom'
import { LuUserCheck,LuUserX } from "react-icons/lu";

export default function ResidentCard({ resident }) {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/dashboard/residente/${resident.id}/perfil`)
    }
    return (
        <div onClick={handleClick} className={styles.residentCard}>
            <div className={styles.infoContainer}>
                <div className={styles.imageProfile}>
                    <img src={resident.imageUrl} alt={resident.name} />
                </div>
                <div className={styles.info}>
                    <p>{resident.name}</p>
                    <span>{resident.cpf}</span>
                </div>
            </div>

            <div className={styles.status}>
                {!resident.exitPlug ? <span className={styles.ativo}><LuUserCheck /></span> : <span className={styles.inativo}><LuUserX /></span>}
            </div>

        </div>
    )
}

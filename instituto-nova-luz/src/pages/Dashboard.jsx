import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { FaSearch } from "react-icons/fa";
import ResidentCard from '../components/ResidentCard';
import { useNavigate } from 'react-router-dom';
import useResident from '../hooks/useResident';
import Loading from '../components/Loading';
import { useMessage } from '../context/MessageContext';
export default function Dashboard() {
    const navigate = useNavigate()
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false)
    const [activeSearch, setActiveSearch] = useState(false)
    const { residents: residentes, searchResident } = useResident();
    const { showMessage } = useMessage()

    const handleSearch = async (e)=>{
        e.preventDefault()
        setActiveSearch(true)
        setLoading(true)
        try {
            await searchResident(value)
        } catch {
            showMessage("falha ao pesquisar")
        }finally{
            setLoading(false)
        }
    }
    
    return (
        <div className={styles.dashboard}>
            <div className={styles.searchContainer}>
                <form onSubmit={handleSearch} className={styles.form}>
                    <label className={styles.label}>
                        <input  value={value} onChange={(e) => setValue(e.target.value)} placeholder='Digite o nome ou cpf' type="text" />
                    </label>
                    <button type='submit' className={styles.seachBtn}><FaSearch /></button>
                </form>
                <div className={styles.result}>
    
                    {activeSearch&& <h2>Resultados</h2>}
                    {loading && <div className={styles.loading}><Loading /></div>}
                    <div className={styles.results}>
                        {residentes.map((residente) => (
                            <ResidentCard key={residente.id} resident={residente} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.dashboardSection}>
                <h2>Dashboard</h2>
                <span onClick={() => navigate('/dashboard/residente/novo')} className={styles.newResident}>Novo residente</span>
            </div>
        </div>
    )
}

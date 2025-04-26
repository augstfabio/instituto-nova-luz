import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { FiSearch, FiPlus, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useResident from '../hooks/useResident';
import Loading from '../components/Loading';
import { useMessage } from '../context/MessageContext';
import { BiCamera, BiPhotoAlbum } from 'react-icons/bi';
import { GiGalley } from 'react-icons/gi';

export default function Dashboard() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);
    const { residents, searchResident } = useResident();
    const { showMessage } = useMessage();
    
    const handleSearch = async (e) => {
        e.preventDefault();
        setActiveSearch(true);
        setLoading(true);
        try {
            await searchResident(value);
        } catch {
            showMessage("Falha ao pesquisar", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Painel de Gestão</h1>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <div className={styles.searchInput}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Buscar residente por nome ou CPF"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button type="submit" className={styles.searchButton}>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

  
            <div className={styles.quickActions}>
                <div className={styles.actionCard} onClick={() => navigate('/dashboard/imagens')}>
                    <BiPhotoAlbum className={styles.actionIcon} />
                    <div>
                        <h3>Imagens</h3>
                        <p>Gerencie imagens da aplicação</p>
                    </div>
                </div>

                <div className={styles.actionCard} onClick={() => navigate('/dashboard/residente/novo')}>
                    <FiPlus className={styles.actionIcon} />
                    <div>
                        <h3>Novo Residente</h3>
                        <p>Adicione um novo residente ao sistema</p>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                {activeSearch && (
                    <div className={styles.resultsHeader}>
                        <h2>Resultados da Busca ({residents.length})</h2>
                    </div>
                )}

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <Loading />
                    </div>
                ) : (
                    <div className={styles.residentsGrid}>
                        {residents.map((resident) => (
                            <div onClick={()=>navigate(`/dashboard/residente/${resident.id}/perfil`)} key={resident.id} className={styles.residentCard}>
                                <div className={styles.cardHeader}>
                                    <h3>{resident.name}</h3>
                                    <span className={resident.exitPlug ? styles.inativo : styles.ativo}></span>
                                </div>
                                <div className={styles.cardContent}>
                                    <p><strong>CPF:</strong> {resident.cpf}</p>
                                    <p><strong>Status:</strong> {resident.exitPlug ? "Desligado" : "Ativo"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
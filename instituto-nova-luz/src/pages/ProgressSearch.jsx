import React, { useState } from 'react';
import styles from './ProgressSearch.module.css';
import { FiSearch, FiX, FiDownload } from "react-icons/fi";
import { useMessage } from '../context/MessageContext';
import Loading from '../components/Loading';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ResidentPdf from '../components/ResidentPdf';

export default function ProgressSearch() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [residente, setResidente] = useState(null);
    const { showMessage } = useMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            showMessage("Por favor, insira um código válido", "warning");
            return;
        }

        setLoading(true);
        try {
            const residentRef = doc(db, "residentes", code);
            const residentSnapshot = await getDoc(residentRef);

            if (residentSnapshot.exists()) {
                setResidente(residentSnapshot.data());
            } else {
                showMessage("Residente não encontrado", "warning");
                setResidente(null);
            }
        } catch (error) {
            showMessage("Erro ao buscar residente", "error");
            setResidente(null);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCode("");
        setResidente(null);
    };

    if (loading) {
        return (
            <div className={styles.loadingOverlay}>
                <div className={styles.loadingContent}>
                    <Loading />
                    <p>Buscando residente...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundPattern}></div>

            <div className={styles.card}>
                {!residente ? (
                    <>
                        <div className={styles.header}>
                            <div className={styles.logo}>
                                <svg viewBox="0 0 24 24" width="40" height="40">
                                    <path fill="#f5a900" d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                                    <path fill="#f5a900" d="M12 2v20l8-5V7l-8-5z" />
                                    <path fill="#333" d="M12 12l-8-5v10l8 5v-10z" />
                                </svg>
                            </div>
                            <h1 className={styles.title}>Acompanhar residente</h1>
                            <p className={styles.subtitle}>Insira o código único fornecido pelo instituto para acessar as informações de progresso</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.searchForm}>
                            <div className={`${styles.inputContainer} ${isFocused ? styles.focused : ''}`}>
                                <div className={styles.inputIcon}>
                                    <FiSearch />
                                </div>
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    type="text"
                                    id="code"
                                    name="code"
                                    required
                                    placeholder="Código do residente"
                                    className={styles.inputField}
                                />
                                {code && (
                                    <button
                                        type="button"
                                        onClick={() => setCode("")}
                                        className={styles.clearButton}
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.searchButton}
                                disabled={loading || !code.trim()}
                            >
                                <span>Ver Progresso</span>
                                <FiSearch className={styles.searchIcon} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className={styles.residentCard}>
                        <div className={styles.residentHeader}>
                            <h2 className={styles.residentName}>{residente.name || 'Nome não informado'}</h2>
                            <button
                                onClick={handleReset}
                                className={styles.backButton}
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className={styles.residentInfo}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Data de Entrada:</span>
                                <span className={styles.infoValue}>{residente.entryDate || 'Não informado'}</span>
                            </div>

                            {residente.exitPlug && (
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Data de Saída:</span>
                                    <span className={styles.infoValue}>{residente.exitPlug.date || 'Não informado'}</span>
                                </div>
                            )}

                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Status:</span>
                                <span className={styles.infoValue}>
                                    {residente.exitPlug ? 'Desligado' : 'Ativo'}
                                </span>
                            </div>

                        </div>

                        <div className={styles.downloadPdf}>
                            <ResidentPdf residente={residente}></ResidentPdf>
                        </div>
                    </div>
                )}

                <div className={styles.footer}>
                    <p className={styles.helpText}>
                        Não possui um código? <a href="https://wa.me/559870212132" target='blank' className={styles.helpLink}>Contate a administração</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
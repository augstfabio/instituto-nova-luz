import React, { useRef, useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import styles from './ResidentPdf.module.css';
import logo from '../assets/logo.jpeg'
import { GoDesktopDownload } from "react-icons/go";
import { useMessage } from '../context/MessageContext';

const ResidentPdf = ({ residente }) => {
    const [loading, setLoading] = useState(false)
    const contentRef = useRef();
    const { showMessage } = useMessage()

    const generatePDF = () => {
        setLoading(true);
        const element = contentRef.current;
        const filename = `${residente.name.replace(/\s+/g, '')}_relatorio.pdf`;

        html2pdf()
            .from(element)
            .save(filename)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                showMessage("Erro ao gerar o PDF", "error", 5000);
            });
    };

    const renderData = (data) => {
        return data && data.trim() !== "" ? data : "Não informado";
    };

    return (
        <>
            <button
                className={styles.button}
                onClick={generatePDF}
                disabled={loading}
            >
                <GoDesktopDownload />
                {loading ? "Baixando..." : "Baixar informações"}
            </button>

            <div ref={contentRef} className={styles.container}>
                <div className={styles.header}>
                    <img src={logo} alt="Logo" className={styles.logo} />
                    <div className={styles.headerText}>
                        <h1 className={styles.title}>ASSOCIAÇÃO DE APOIO AOS DEPENDENTES QUÍMICOS DE TURIAÇU MA</h1>
                        <h2 className={styles.subtitle}>"ASADEQTMA" - COMUNIDADE TERAPÊUTICA "INSTITUTO NOVA LUZ"</h2>
                        <p className={styles.institutionInfo}>CNPJ: 52.400.404/0001-76 | email: institutonovaluz22@outlook.com</p>
                    </div>
                    <div className={styles.headerSpace}></div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>FICHA DE CADASTRO DO RESIDENTE</h2>

                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Nome Completo:</p>
                            <p className={styles.value}>{renderData(residente.name)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Data de Nascimento:</p>
                            <p className={styles.value}>{renderData(residente.born)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Gênero:</p>
                            <p className={styles.value}>{renderData(residente.gender)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>CPF:</p>
                            <p className={styles.value}>{renderData(residente.cpf)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Endereço:</p>
                            <p className={styles.value}>{renderData(residente.address)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Telefone:</p>
                            <p className={styles.value}>{renderData(residente.phone)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Data de Entrada:</p>
                            <p className={styles.value}>{renderData(residente.entryDate)}</p>
                        </div>
                        {residente.exitPlug && (
                            <div className={styles.gridItem}>
                                <p className={styles.label}>Data de Saída:</p>
                                <p className={styles.value}>{renderData(residente.exitPlug.date)}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>INFORMAÇÕES ADICIONAIS</h2>
                    <div className={styles.infoBlock}>
                        <p className={styles.label}>Comorbidades:</p>
                        <p className={styles.value}>{renderData(residente.comorbidities)}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <p className={styles.label}>Internações Anteriores:</p>
                        <p className={styles.value}>{renderData(residente.otherHospitalizations)}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <p className={styles.label}>Problemas judiciais:</p>
                        <p className={styles.value}>{renderData(residente.legalIssues)}</p>
                    </div>
                    {residente.exitPlug && (
                        <>
                            <div className={styles.infoBlock}>
                                <p className={styles.label}>Tempo de residência:</p>
                                <p className={styles.value}>{renderData(residente.exitPlug.time)}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <p className={styles.label}>Motivo da saída:</p>
                                <p className={styles.value}>{renderData(residente.exitPlug.reason)}</p>
                            </div>
                        </>
                    )}
                    <div className={styles.infoBlock}>
                        <p className={styles.label}>Observações:</p>
                        <p className={styles.valueLarge}>{renderData(residente.obs)}</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>RESPONSÁVEL LEGAL</h2>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Nome:</p>
                            <p className={styles.value}>{renderData(residente.responsible.name)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Familiaridade:</p>
                            <p className={styles.value}>{renderData(residente.responsible.familiarity)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>Telefone:</p>
                            <p className={styles.value}>{renderData(residente.responsible.phone)}</p>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.label}>CPF:</p>
                            <p className={styles.value}>{renderData(residente.responsible.cpf)}</p>
                        </div>
                        <div className={styles.gridItemFull}>
                            <p className={styles.label}>Endereço:</p>
                            <p className={styles.value}>{renderData(residente.responsible.address)}</p>
                        </div>
                    </div>
                </div>
                <h2 className={styles.sectionTitle}>RESPONSÁVEL NA ASSOCIAÇÃO</h2>
                <div className={styles.signatureSection}>
                    <div className={styles.signatureField}>
                        <p className={styles.label}>Responsável pelo Acolhimento:</p>
                        <div className={styles.signatureLine}></div>

                    </div>
                    <div className={styles.signatureField}>
                        <p className={styles.label}>Função:</p>
                        <div className={styles.signatureLine}></div>
                    </div>
                    <div className={styles.signatureField}>
                        <p className={styles.label}>Assinatura:</p>
                        <div className={styles.signatureLine}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResidentPdf;
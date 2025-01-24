import React, { useRef, useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import styles from './ResidentPdf.module.css';
import logo from '../assets/logo.jpeg'
import { GoDesktopDownload } from "react-icons/go";
import { useMessage } from '../context/MessageContext';
const ResidentPdf = ({ residente }) => {
    const [loading, setLoading] = useState(false)
    const contentRef = useRef();
    const [imageBase64, setImageBase64] = useState(null);
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

    useEffect(() => {
        const loadImageAsBase64 = async () => {
            if (residente.imageUrl) {
                try {
                    const response = await fetch(residente.imageUrl);
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => setImageBase64(reader.result);
                } catch (error) {
                    console.error("Erro ao carregar imagem:", error);
                }
            }
        };
        loadImageAsBase64();
    }, [residente.imageUrl]);

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
                    <img src={logo} alt="" />
                    <div className={styles.text}>
                        <h1 className={styles.title}>ASSOCIAÇÃO DE APOIO AOS DEPENDENTES
                            QUÍMICOS DE TURIAÇU MA “ASADEQTMA”
                            COMUNIDADE TERAPÊUTICA “INSTITUTO NOVA LUZ”</h1>
                        <p>CNPJ: 52.400.404/0001-76 <br /> email: institutonovaluz22@outlook.com</p>
                    </div>
                    <span></span>
                </div>
                <h2 className={styles.subtitle}>Relatório de residente</h2>
                {imageBase64 ? (
                    <img src={imageBase64} alt="Residente" className={styles.image} />
                ) : (
                    <p className={styles.info}>Imagem não disponível</p>
                )}
                <p className={styles.info}><span className={styles.bold}>Nome:</span> {renderData(residente.name)}</p>
                <p className={styles.info}><span className={styles.bold}>Gênero:</span> {renderData(residente.gender)}</p>
                <p className={styles.info}><span className={styles.bold}>Data de Nascimento:</span> {renderData(residente.born)}</p>
                <p className={styles.info}><span className={styles.bold}>Endereço:</span> {renderData(residente.address)}</p>
                <p className={styles.info}><span className={styles.bold}>Telefone:</span> {renderData(residente.phone)}</p>
                <p className={styles.info}><span className={styles.bold}>CPF:</span> {renderData(residente.cpf)}</p>
                <p className={styles.info}><span className={styles.bold}>Data de Entrada:</span> {renderData(residente.entryDate)}</p>
                <p className={styles.info}><span className={styles.bold}>Comorbidades:</span> {renderData(residente.comorbidities)}</p>
                <p className={styles.info}><span className={styles.bold}>Internações Anteriores:</span> {renderData(residente.otherHospitalizations)}</p>
                <p className={styles.info}><span className={styles.bold}>Problemas judiciais:</span> {renderData(residente.legalIssues)}</p>
                {residente.exitPlug && <>
                    <p className={styles.info}><span className={styles.bold}>tempo de residência:</span> {renderData(residente.exitPlug.time)}</p>
                    <p className={styles.info}><span className={styles.bold}>Data de saída:</span> {renderData(residente.exitPlug.date)}</p>
                    <p className={styles.info}><span className={styles.bold}>Motivo da saida:</span> {renderData(residente.exitPlug.reason)}</p>


                </>}
                <h2 className={styles.subtitle}>Responsável</h2>
                <p className={styles.info}><span className={styles.bold}>Nome:</span> {renderData(residente.responsible.name)}</p>
                <p className={styles.info}><span className={styles.bold}>Familiaridade:</span> {renderData(residente.responsible.familiarity)}</p>
                <p className={styles.info}><span className={styles.bold}>Telefone:</span> {renderData(residente.responsible.phone)}</p>
                <p className={styles.info}><span className={styles.bold}>CPF:</span> {renderData(residente.responsible.cpf)}</p>
                <p className={styles.info}><span className={styles.bold}>Endereço:</span> {renderData(residente.responsible.address)}</p>

            </div>
        </>
    );
};

export default ResidentPdf;

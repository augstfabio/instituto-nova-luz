import React from 'react';
import styles from './RecentCard.module.css';
import { MdContentCopy } from "react-icons/md";
import { useMessage } from '../context/MessageContext';

export default function RecentCard({ code }) {
    const { showMessage } = useMessage();

    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code)
                .then(() => {
                    showMessage("Código copiado para a área de transferência", "success");
                })
                .catch(err => {
                    showMessage("Erro ao copiar", "error");
                });
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            
            if (successful) {
                showMessage("Código copiado para a área de transferência", "success");
            } else {
                showMessage("Erro ao copiar", "error");
            }
        }
    };

    return (
        <div className={styles.card}>
            <input type="text" value={code} readOnly />
            <span className={styles.copyBtn} onClick={copyToClipboard}>
                <MdContentCopy />
            </span>
        </div>
    );
}

import React from 'react'
import styles from './Modal.module.css'
export default function Modal({cancelBtn, okBtn, strongTitle, text, icon}) {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
            <strong>{icon} {strongTitle}</strong>
                <p>{text}</p>
                <div className={styles.btns}>
                    <button onClick={cancelBtn} className={styles.cancelBtn}>Cancelar</button>
                    <button onClick={okBtn} className={styles.okBtn}>OK</button>
                </div>
            </div>
        </div>
    )
}

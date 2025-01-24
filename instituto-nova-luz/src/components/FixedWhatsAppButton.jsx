import React from 'react';
import styles from './FixedWhatsAppButton.module.css';
import { FaWhatsapp } from "react-icons/fa";

export default function FixedWhatsAppButton() {
    return (
        <a
            href="https://wa.me/559870212132"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
        >
            <div className={styles.whatsappIcon}> <FaWhatsapp /></div>
    </a >
  );
}

import React from 'react';
import styles from './Footer.module.css';
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { GiSunflower } from "react-icons/gi";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <div className={styles.logoText}>
                        <h2>Instituto<br/><span>Nova Luz</span></h2>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.contactItem}>
                        <MdPhone className={styles.icon} />
                        <p>98 7021-2132</p>
                    </div>

                    <div className={styles.contactItem}>
                        <MdEmail className={styles.icon} />
                        <p>  institutonovaluz22@outlook.com</p>
                    </div>

                    <div className={styles.contactItem}>
                        <MdLocationOn className={styles.icon} />
                        <p>Av. Santos Drumont, Turiaçu-MA</p>
                    </div>

                    <div className={styles.whatsappItem}>
                        <FaWhatsapp className={styles.whatsappIcon} />
                        <div className={styles.whatsappLinks}>
                            <a href="https://wa.me/559870212132" target="_blank" rel="noreferrer">Manoel</a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>CNPJ: 52.400.404/0001-76</p>
                    <p>© 2024 Instituto Nova Luz</p>
                </div>
            </div>
        </footer>
    );
}
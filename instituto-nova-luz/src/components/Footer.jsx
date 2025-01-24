import React from 'react';
import styles from './Footer.module.css';
import { MdLocalPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.logo}>
                    <h1>Instituto <br />Nova <span>Luz</span></h1>
                </div>

                <div className={styles.content}>

                    <div className={styles.contact}>
                        <span><MdLocalPhone /></span>
                        <h4>Contato</h4>
                        <p>Telefone: 9288272-28272</p>
                    </div>


                    <div className={styles.email}>
                        <span><MdOutlineEmail /></span>
                        <h4>Email</h4>

                        <p>Email:  institutonovaluz22@outlook.com</p>
                    </div>
                    <div className={styles.whatsappLinks}>
                        <span><FaWhatsapp /></span>
                        <h4>WhatsApp</h4>

                        <ul>
                            <li><a href="https://wa.me/559870212132" target="_blank" rel="noopener noreferrer">Manoel -  9288272-28272</a></li>
                            <li><a href="https://wa.me/559870212132" target="_blank" rel="noopener noreferrer">Dora -  9288272-28272</a></li>
                            <li><a href="https://wa.me/559870212132" target="_blank" rel="noopener noreferrer">Da paz -  9288272-28272</a></li>
                            <li><a href="https://wa.me/559870212132" target="_blank" rel="noopener noreferrer">Neuma -  9288272-28272</a></li>
                        </ul>
                    </div>
                    <div className={styles.additionalOptions}>
                        <h4>Mais opções</h4>
                        <ul>
                            <li><a href="#sobre">Sobre Nós</a></li>
                            <li><a href="#trabalhos">Nossos Trabalhos</a></li>
                            <li><a href="#acolhimento">Acolhimento</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>© 2025 Instituto Nova Luz. Todos os direitos reservados.</p>
                    <p>CNPJ: 52.400.404/0001-76</p>
                </div>
            </div>
        </footer>
    );
}

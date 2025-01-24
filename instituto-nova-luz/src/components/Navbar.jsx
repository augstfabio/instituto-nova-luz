import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { BiSolidEdit } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from '../hooks/useAuth';
import { useMessage } from '../context/MessageContext';
import Modal from './Modal';
import { MdExitToApp } from "react-icons/md";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { showMessage } = useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [dropDownControl, setDropDownControl] = useState(false);

    const handleGoHome = () => {
        navigate('/');
        setDropDownControl(false);
    };

    const handleDirect = (where) => {
        navigate(`${where}`);
        setDropDownControl(!dropDownControl);
    };

    const handleProfile = () => {
        if (user) {
            setDropDownControl(!dropDownControl);
        } else {
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        await logout();
        setModalOpen(false);
        showMessage("Seção encerrada", "warning", 5000);
    };

    return (
        <header className={styles.navbar}>
            {modalOpen && (
                <Modal 
                    okBtn={handleLogout} 
                    cancelBtn={() => setModalOpen(false)} 
                    strongTitle="Encerrar seção" 
                    text="Deseja encerrar seção?" 
                    icon={<MdExitToApp />} 
                />
            )}
            <div className={styles.logo}>
                <h1 onClick={handleGoHome}>Instituto <br />Nova <span>Luz</span></h1>
            </div>
            <div className={styles.options}>
                <div onClick={handleProfile} className={styles.profile}>
                    <span><CgProfile /></span>
                    {dropDownControl && (
                        <ul className={styles.dropDown}>
                            <div className={styles.profileInfo}>
                                <span><CgProfile /></span>
                                <div className={styles.profileData}>
                                    <p>{user?.displayName || "Usuário"}</p>
                                    <p><span>{user?.email || "Email não disponível"}</span></p>
                                </div>
                            </div>
                            <li onClick={() => handleDirect('/dashboard')}>Painel de controle <span><RxDashboard /></span></li>
                            <li onClick={() => handleDirect('/perfil')}>Perfil <span><BiSolidEdit /></span></li>
                            <li className={styles.exitBtn} onClick={() => setModalOpen(true)}>Sair <span><IoExitOutline /></span></li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

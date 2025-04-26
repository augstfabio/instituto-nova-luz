import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { CgHeart, CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { BiBookHeart, BiHeart, BiHeartCircle, BiSolidEdit } from "react-icons/bi";
import { IoExitOutline, IoHeartCircleSharp } from "react-icons/io5";
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
            <div className={styles.navContainer}>
                <div className={styles.logo} onClick={handleGoHome}>
                    <div className={styles.logoText}>
                        <div className={styles.logoMain}>
                            <span>Instituto</span><br />
                            <span className={styles.highlight}>Nova Luz</span>
                        </div>
                    </div>
                </div>

                <div className={styles.navItems}>
                    <div className={styles.profileWrapper} onClick={handleProfile}>
                        {!user? <span className={styles.fazerLogin}>Login</span> :<CgProfile className={styles.profileIcon} />}
                        {dropDownControl && (
                            <div className={styles.dropDown}>
                                <div className={styles.userInfo}>
                                    <CgProfile className={styles.userIcon} />
                                    <div className={styles.userDetails}>
                                        <h4>{user?.displayName || "Usuário"}</h4>
                                        <p>{user?.email || "Email não disponível"}</p>
                                    </div>
                                </div>
                                <div className={styles.menuItems}>
                                    {user?.uid === import.meta.env.VITE_ADMIN_USER_ID &&
                                        <div className={styles.menuItem} onClick={() => handleDirect('/dashboard')}>
                                            <RxDashboard />
                                            <span>Painel Admin</span>
                                        </div>
                                    }
                                    <div className={styles.menuItem} onClick={() => handleDirect('/acompanhamento')}>
                                        <BiBookHeart />
                                        <span>Acompanhar progresso</span>
                                    </div>
                                    <div className={styles.menuItem} onClick={() => handleDirect('/perfil')}>
                                        <BiSolidEdit />
                                        <span>Editar Perfil</span>
                                    </div>
                                    <div className={`${styles.menuItem} ${styles.exitBtn}`} onClick={() => setModalOpen(true)}>
                                        <IoExitOutline />
                                        <span>Sair</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
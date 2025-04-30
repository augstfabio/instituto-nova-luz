import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { BiBookHeart, BiSolidEdit } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from '../hooks/useAuth';
import { useMessage } from '../context/MessageContext';
import Modal from './Modal';
import { MdExitToApp, MdMenu, MdClose } from "react-icons/md";

export default function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { showMessage } = useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleGoHome = () => {
        navigate('/');
        setMobileMenuOpen(false);
    };
    useEffect(()=>{
        if (modalOpen){
            setMobileMenuOpen(false);
        }
    },[modalOpen])
    const handleDirect = (where) => {
        navigate(`${where}`);
        setMobileMenuOpen(false);
    };

    const handleProfile = () => {
        if (!user) {
            navigate('/login');
            setMobileMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setModalOpen(false);
        showMessage("Seção encerrada", "warning", 5000);
    };

    const firstName = user?.displayName?.split(' ')[0] || "Login";

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

         
                <div className={styles.desktopMenu}>
                  
                    <button className={styles.menuItem} onClick={() => handleDirect('/acompanhamento')}>
                        <BiBookHeart />
                        <span>Acompanhar progresso</span>
                    </button>

                    {user ? (
                        <>
                            {user?.uid === import.meta.env.VITE_ADMIN_USER_ID && (
                                <button className={styles.menuItem} onClick={() => handleDirect('/dashboard')}>
                                    <RxDashboard />
                                    <span>Painel Admin</span>
                                </button>
                            )}
                            <button className={styles.menuItem} onClick={() => handleDirect('/perfil')}>
                                <BiSolidEdit />
                                <span>Editar Perfil</span>
                            </button>
                            <button className={`${styles.menuItem} ${styles.exitBtn}`} onClick={() => setModalOpen(true)}>
                                <IoExitOutline />
                                <span>Sair</span>
                            </button>
                            <div className={styles.userName} onClick={handleProfile}>
                                {firstName}
                            </div>
                        </>
                    ) : (
                        <button className={styles.loginButton} onClick={handleProfile}>
                            Login
                        </button>
                    )}
                </div>

                <div
                    className={styles.mobileMenuButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <MdClose className={styles.menuIcon} />
                    ) : (
                        <MdMenu className={styles.menuIcon} />
                    )}
                </div>

                <div
                    className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.mobileOverlayOpen : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                    {user ? (
                        <>
                            <div className={styles.mobileUserInfo}>
                                <div className={styles.mobileUserName}>{user?.displayName || "Usuário"}</div>
                                <div className={styles.mobileUserEmail}>{user?.email || "Email não disponível"}</div>
                            </div>

                           
                            <button className={styles.mobileMenuItem} onClick={() => handleDirect('/acompanhamento')}>
                                <BiBookHeart />
                                <span>Acompanhar progresso</span>
                            </button>

                            {user?.uid === import.meta.env.VITE_ADMIN_USER_ID && (
                                <button className={styles.mobileMenuItem} onClick={() => handleDirect('/dashboard')}>
                                    <RxDashboard />
                                    <span>Painel Admin</span>
                                </button>
                            )}
                            <button className={styles.mobileMenuItem} onClick={() => handleDirect('/perfil')}>
                                <BiSolidEdit />
                                <span>Editar Perfil</span>
                            </button>
                            <button className={`${styles.mobileMenuItem} ${styles.mobileExitBtn}`} onClick={() => setModalOpen(true)}>
                                <IoExitOutline />
                                <span>Sair</span>
                            </button>
                        </>
                    ) : (
                        <>
                       
                            <button className={styles.mobileMenuItem} onClick={() => handleDirect('/acompanhamento')}>
                                <BiBookHeart />
                                <span>Acompanhar progresso</span>
                            </button>
                            <button className={styles.mobileLoginButton} onClick={handleProfile}>
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { FaAddressBook } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMessage } from '../context/MessageContext';
export default function Profile() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { user, updateUser, updateUserPassword, error, logout } = useAuth()
    const { showMessage } = useMessage()
    useEffect(() => {
        if (user) {
            setName(user.displayName)
        }
    }, [user])

    const handleUpdateUser = async () => {
        if (name.length < 5) {
            showMessage("O nome precisa ter mais de 5 caracteres", "warning")
            return
        }
        setLoading(true)
        try {
            updateUser({ displayName: name })
            showMessage("Nome atualizado com sucesso", "success")
        } catch (error) {
            showMessage("Erro ao atualizar o nome", "error")
        }
    }
    const handleUpdatePassword = async () => {
        setLoading(true);
        try {
            await updateUserPassword(password, newPassword);
            showMessage("Senha alterada com sucesso! Faça login novamente");
            logout();
        } catch (err) {
            showMessage(err.message || "Ocorreu um erro ao alterar a senha", "error");
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profilePic}>
                <FaAddressBook />
                <h1>{user && user.email}</h1>
            </div>
            <div className={styles.editInfo}>
                <div className={styles.inputContainer}>
                    <div className={styles.input}>
                        <span>Nome</span>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Digite o seu nome' />
                    </div>
                    <button onClick={handleUpdateUser} className={styles.saveBtn}>Salvar</button>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.input}>
                        <span>Senha antiga</span>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Senha antiga' />
                        <span>Nova Senha</span>
                        <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder='Nova senha' />
                    </div>
                    <button onClick={handleUpdatePassword} className={styles.saveBtn}>Salvar</button>
                </div>

            </div>
        </div>
    )
}

import React, { useState } from 'react';
import styles from './Register.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMessage } from '../context/MessageContext';
import TermsModal from '../components/TermsModal';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const {showMessage } = useMessage();
    const [loading, setLoading] = useState(false)
    const {register} = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showMessage("As senhas não coincidem!", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("A senha deve ter no mínimo 6 caracteres!", "error");
            return;
        }

        if (!agree) {
            showMessage("Você precisa concordar com os termos!","error");
            return;
        }
        setLoading(true)
        try {

            await register(email, password, name)
        } catch (error) {
            showMessage("Erro ao critar conta, tente outras credenciais")
        } finally{
            setLoading(false)
        }
    };
    
    return (
        <div className={styles.registerContainer}>
            <TermsModal showModal={showModal} closeModal={()=>setShowModal(false)}/>
            <h2>Criar Conta</h2>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        required
                    />
                    <label htmlFor="agree">Concordo com os <a onClick={()=>setShowModal(true)} href="#">termos e condições</a></label>
                </div>

                <button disabled={loading? true: false} type="submit" className={styles.submitButton}>{loading ? "carregando...":"Criar conta"}</button>
            </form>
            <div className={styles.login}>
               <p>Ou</p>
               <Link to="/login">Fazer Login</Link>
            </div>
        </div>
    );
}

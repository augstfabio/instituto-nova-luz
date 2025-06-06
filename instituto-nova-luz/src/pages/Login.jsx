import React, { useState } from 'react';
import styles from './Login.module.css';
import { useAuth } from '../hooks/useAuth';
import { useMessage } from '../context/MessageContext';
import {Link} from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, user, error} = useAuth()
    const [loading, setLoading] = useState()
    const {showMessage} = useMessage()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await login(email, password)
            showMessage(`Bem vindo de volta`, "success", 5000)
        } catch (error) {
            showMessage(`Suas credenciais podem estar incorretas`, "error", 5000)
        }
        finally{
            setLoading(false)
        }
    };
    
    
    return (
        <div className={styles.loginContainer}>
            <h2>Entrar</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
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

                <button disabled={loading? true: false} type="submit" className={styles.submitButton}>{loading ? "Entrando...":"Entrar"}</button>

                <div className={styles.forgotPassword}>
                    <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                </div>
            </form>

            <div className={styles.signupPrompt}>
                <span>Não tem uma conta? </span>
                <Link to="/register">Crie uma agora</Link>
            </div>
        </div>
    );
}

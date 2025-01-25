
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMessage } from "../context/MessageContext";
import styles from './ForgotPassword.module.css'
const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const [done, setDone] = useState(false)
    const [email, setEmail] = useState("");
    const {showMessage} = useMessage()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            showMessage("Um link de recuperação será encaminhado para seu email","success")
            navigate('/login')
        } catch {
            showMessage(`Erro ao enviar email`,"error")
        }
    };
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Esqueci minha senha</h2>
                <label className={styles.label}>
                    <span>Digite seu email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Redefinir Senha</button>
                <Link to={'/login'}>Ou faça login</Link>
            </form>
        </div>

    );
};

export default ForgotPassword;
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, EmailAuthProvider, reauthenticateWithCredential, updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';


export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
      });
      setError(null);
    } catch {
      setError("erro ao criar conta, tente outras credenciais");
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (updates) => {
    setLoading(true);
    try {
      await updateProfile(user, updates);
      setUser({ ...user, ...updates });
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const updateUserPassword = async (password, newPassword) => {
    if (!auth.currentUser) {
        throw new Error("Usuário não está autenticado.");
    }

    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);

    try {
        await reauthenticateWithCredential(auth.currentUser, credential);
    } catch {
        throw new Error("Senha antiga incorreta.");
    }

    try {
        await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
        const errorCode = error.code;

        if (errorCode === "auth/weak-password") {
            throw new Error("A nova senha deve conter pelo menos 6 caracteres.");
        } else {
            throw new Error("Erro ao atualizar senha. Tente novamente.");
        }
    }
};

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    updateUserPassword,
    resetPassword
  };
}

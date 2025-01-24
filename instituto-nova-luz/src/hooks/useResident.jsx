import { collection, addDoc, updateDoc, where, getDocs, getDoc, doc, deleteDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";

const useResident = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [residents, setResidents] = useState([])
    const [resident, setResident] = useState(null)
    const createResident = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = await addDoc(collection(db, "residentes"), {
                ...data,
                id: null
            });


            await updateDoc(docRef, {
                id: docRef.id
            });
        } catch (error) {
            setError(error);
            console.error("Error adding document: ", error);
        } finally {
            setLoading(false);
        }
    };
    const updateResident = async (id, data, exitPlug = false) => {
        const docRef = doc(db, "residentes", id);

        if (exitPlug) {
            await updateDoc(docRef, {
                exitPlug: data
            });
        } else {
            await updateDoc(docRef, {
                ...data
            });
        }
    };
    const searchResident = async (searchTerm) => {
        setLoading(true);
        setError(null);
        try {
            const residentsRef = collection(db, "residentes");
            const querySnapshot = await getDocs(residentsRef);
            const results = querySnapshot.docs
                .map(doc => doc.data())
                .filter(resident =>
                    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    resident.cpf.toLowerCase().includes(searchTerm.toLowerCase())
                );
            setResidents(results);
        } catch (error) {
            setError(error);
            console.error("Error searching for residents: ", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchResidentById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, "residentes", id);
            const docSnapshot = await getDoc(docRef);
            return docSnapshot.data();

        } catch (error) {
            setError(error);
            console.error("Error fetching document: ", error);
        } finally {
            setLoading(false);
        }
    };
    const getResidentById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, "residentes", id);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                setResident(docSnapshot.data());
            } else {
                setResident(null);
            }
        } catch (error) {
            setError(error);
            console.error("Error fetching document: ", error);
        } finally {
            setLoading(false);
        }
    };
    const deleteResident = async (id) => {
        try {
            const docRef = doc(db, "residentes", id)
            await deleteDoc(docRef)
        } catch (err) {
            throw new Error(err)
            setError("erro ao excuir residente" + err)
        }
    }
    const reactivateResident = async (id) => {
        const docRef = doc(db, "residentes", id);
        try {
            await updateDoc(docRef, {
                exitPlug: deleteField()
            });
            await updateDoc(docRef, {
                otherHospitalizations: "Sim"
            });
        } catch (error) {
            console.error("Erro ao excluir o campo 'exitPlug':", error);
        }
    };
    return { reactivateResident, fetchResidentById, createResident, loading, error, residents, searchResident, getResidentById, resident, updateResident, deleteResident };
};

export default useResident;

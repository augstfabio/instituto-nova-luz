import { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function useImageManager() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const uploadAndSaveImages = async (files) => {
        if (files.length > 6) {
            throw new Error('Máximo de 6 imagens permitidas');
        }

        setLoading(true);
        setError(null);
        setProgress(0);

        try {
            const uploadedImages = await uploadToImgBB(files);
            setProgress(50);
            const savedImages = await saveToFirestore(uploadedImages);
            setProgress(100);
            return savedImages;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const uploadToImgBB = async (files) => {
        try {
            const uploadPromises = files.map(file => {
                const formData = new FormData();
                formData.append('image', file);

                return fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData
                });
            });

            const responses = await Promise.all(uploadPromises);
            const results = await Promise.all(responses.map(r => r.json()));

            return results.map(data => ({
                url: data.data.url,
                deleteUrl: data.data.delete_url
            }));
        } catch (err) {
            throw new Error(`Falha no upload: ${err.message}`);
        }
    };

    const saveToFirestore = async (images) => {
        try {
            const galleryRef = collection(db, 'galeria');
            const savedImages = [];

            for (const image of images) {
                const docRef = await addDoc(galleryRef, {
                    imageUrl: image.url,
                    createdAt: new Date()
                });

                await updateDoc(docRef, {
                    id: docRef.id
                });

                savedImages.push({
                    id: docRef.id,
                    imageUrl: image.url
                });
            }

            return savedImages;
        } catch (err) {
            throw new Error(`Falha ao salvar no Firestore: ${err.message}`);
        }
    };

    const getGalleryImages = async () => {
        setLoading(true);
        setError(null);

        try {
            const galleryRef = collection(db, 'galeria');
            const snapshot = await getDocs(galleryRef);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                imageUrl: doc.data().imageUrl
            }));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteImage = async (imageId) => {
        setLoading(true);
        setError(null);

        try {
            await deleteDoc(doc(db, 'galeria', imageId));
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        uploadAndSaveImages,
        getGalleryImages,
        deleteImage,
        loading,
        error,
        progress
    };
}
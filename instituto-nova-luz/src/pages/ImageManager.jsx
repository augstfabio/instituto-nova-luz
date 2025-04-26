import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImageManager.module.css';
import { FiPlus, FiSave, FiTrash2, FiUpload, FiCheck, FiX, FiArrowLeft } from 'react-icons/fi';
import useImageManager from '../hooks/useImageManager';
import Loading from '../components/Loading';

export default function ImageManager() {
    const navigate = useNavigate();
    const {
        uploadAndSaveImages,
        getGalleryImages,
        deleteImage,
        loading: apiLoading,
        error: apiError,
        progress
    } = useImageManager();

    const [imagesLocal, setImagesLocal] = useState([]);
    const [savedImages, setSavedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const images = await getGalleryImages();
                setSavedImages(images.map(img => ({
                    id: img.id,
                    url: img.imageUrl,
                    uploaded: true
                })));
            } catch (err) {
                console.error('Erro ao carregar imagens:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadImages();
    }, []);

    const allImages = [...savedImages, ...imagesLocal];
    const imagesCount = allImages.length;
    const hasChanges = imagesLocal.length > 0 || allImages.length < savedImages.length;

    const handleFileSelect = (e) => {
        if (imagesCount >= 6) return;
        
        const files = Array.from(e.target.files);
        if (files.length + imagesCount > 6) {
            alert(`Você só pode adicionar mais ${6 - imagesCount} imagens`);
            return;
        }

        const newImages = files.map(file => ({
            id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: URL.createObjectURL(file),
            file,
            uploaded: false
        }));

        setImagesLocal(prev => [...prev, ...newImages]);
        e.target.value = '';
    };

    const handleDelete = async (id) => {
   
        if (id.startsWith('local-')) {
            setImagesLocal(prev => prev.filter(img => img.id !== id));
            return;
        }

        try {
            await deleteImage(id);
            setSavedImages(prev => prev.filter(img => img.id !== id));
        } catch (err) {
            console.error('Erro ao deletar imagem:', err);
        }
    };

    const handleSave = async () => {
        try {
           
            const filesToUpload = imagesLocal
                .filter(img => img.file)
                .map(img => img.file);

            if (filesToUpload.length > 0) {
                const savedImagesData = await uploadAndSaveImages(filesToUpload);
                const newSavedImages = savedImagesData.map(img => ({
                    id: img.id,
                    url: img.imageUrl,
                    uploaded: true
                }));
                
                setSavedImages(prev => [...prev, ...newSavedImages]);
            }
            setImagesLocal([]);
        } catch (err) {
            console.error('Erro ao salvar imagens:', err);
        }
    };

    const handleCancel = () => {
        if (hasChanges && !window.confirm('Deseja descartar todas as alterações não salvas?')) {
            return;
        }
        setImagesLocal([]);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <Loading/>
                    <p>Carregando galeria...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <FiArrowLeft className={styles.backIcon} />
                    Voltar
                </button>
                <h1 className={styles.title}>Galeria de Imagens</h1>
                <p className={styles.subtitle}>
                    Gerencie as imagens exibidas na aplicação (máximo de 6)
                </p>
            </div>

            <div className={styles.content}>
                <div className={styles.infoBox}>
                    <div className={styles.infoHeader}>
                        <span className={styles.infoTitle}>Status da Galeria</span>
                        <span className={styles.counter}>
                            {imagesCount}/6 imagens
                        </span>
                    </div>
                    <p className={styles.infoText}>
                        {imagesCount >= 6 ?
                            "Galeria completa. Remova imagens para adicionar novas." :
                            "Espaço disponível para adicionar mais imagens."}
                    </p>
                    {hasChanges && (
                        <p className={styles.changesInfo}>
                            <FiUpload /> Alterações não salvas {apiLoading && `(${progress}%)`}
                        </p>
                    )}
                    {apiError && (
                        <p className={styles.errorText}>
                            Erro: {apiError}
                        </p>
                    )}
                </div>

                {imagesCount === 0 ? (
                    <div className={styles.emptyState}>
                        <FiPlus className={styles.emptyIcon} />
                        <p>Nenhuma imagem cadastrada</p>
                        <small>Clique em "Adicionar Imagem" para começar</small>
                    </div>
                ) : (
                    <div className={styles.gallery}>
                        {allImages.map(image => (
                            <div key={image.id} className={styles.imageCard}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={image.url}
                                        alt="Preview"
                                        className={styles.image}
                                    />
                                    <button 
                                        onClick={() => handleDelete(image.id)}
                                        className={styles.deleteButton}
                                        disabled={apiLoading}
                                    >
                                        <FiTrash2 className={styles.deleteIcon} />
                                    </button>
                                    <div className={`${styles.statusBadge} ${image.uploaded ? styles.uploaded : styles.pending}`}>
                                        {image.uploaded ? (
                                            <>
                                                <FiCheck /> Enviada
                                            </>
                                        ) : (
                                            <>
                                                <FiUpload /> Pendente
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.actions}>
                    <div className={styles.addButtonWrapper}>
                        <label 
                            className={`${styles.addButton} ${imagesCount >= 6 ? styles.buttonDisabled : ""} ${apiLoading ? styles.buttonDisabled : ""}`}
                            htmlFor="file-input"
                        >
                            <FiPlus className={styles.buttonIcon} />
                            Adicionar imagem
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                                disabled={imagesCount >= 6 || apiLoading}
                            />
                        </label>
                    </div>
                    
                    <button 
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        disabled={!hasChanges || apiLoading}
                    >
                        <FiX className={styles.buttonIcon} />
                        Cancelar
                    </button>
                    
                    <button 
                        className={styles.saveButton}
                        onClick={handleSave}
                        disabled={!hasChanges || apiLoading}
                    >
                        {apiLoading ? (
                            `Salvando... ${progress}%`
                        ) : (
                            <>
                                <FiSave className={styles.buttonIcon} />
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
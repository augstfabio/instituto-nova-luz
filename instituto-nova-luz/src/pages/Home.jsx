import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { GiHand, GiHealthCapsule, GiHeartWings, GiPapers } from "react-icons/gi";
import { MdAccountBalance, MdArrowForward, MdContacts, MdContentCopy, MdEmail, MdHealthAndSafety, MdLandscape, MdLocationOn, MdPhone, MdPhotoCamera, MdPix, MdQrCode, MdSchedule } from "react-icons/md";
import { RiMentalHealthFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import useImageManager from '../hooks/useImageManager';
import Loading from '../components/Loading';

export default function Home() {
    const { getGalleryImages, loading } = useImageManager()
    const [images, setImages] = useState([])
    const [error, setError] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        const getImgs = async () => {
            try {
                const imgs = await getGalleryImages();
                setImages(imgs);
            } catch (err) {
                setError("Erro ao buscar imagens")
            }
        };

        getImgs();
    }, []);
    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.heroTitle}>
                            <span>Instituto</span><br />
                            <span className={styles.highlight}>Nova Luz</span>
                        </h1>
                        <p className={styles.heroSubtitle}>Comunidade terapêutica especializada em reabilitação e reintegração social de dependentes químicos em Turiaçu-MA</p>
                        <div className={styles.ctaContainer}>
                            <a href='https://wa.me/559870212132' target='blank'className={styles.primaryCta}>Quero Apoiar</a>
                            <a href='https://www.instagram.com/instituto_nova.luz/' target='blank' className={styles.secondaryCta}>Conhecer Projeto</a>
                        </div>
                    </div>
                    <div className={styles.heroImage}></div>
                </div>
            </section>
            <section className={styles.aboutSection}>
                <div className={styles.sectionWrapper}>
                    <h2 className={styles.sectionTitle}>Sobre Nós</h2>

                    <div className={styles.aboutCard}>
                        <GiHeartWings className={styles.aboutIcon} />
                        <p className={styles.aboutText}>
                            O Instituto Nova Luz é uma instituição dedicada ao acolhimento, reabilitação e reintegração de pessoas que enfrentam a dependência química. Fundado com o objetivo de oferecer um espaço seguro e acolhedor, nosso instituto busca proporcionar uma nova chance para indivíduos em busca de recuperação e uma vida plena e saudável.
                            <br /><br />
                            Com uma equipe qualificada de profissionais, trabalhamos de forma individualizada, respeitando o tempo e o processo de cada pessoa. Acreditamos que a recuperação é um caminho que deve ser trilhado com respeito, empatia e apoio contínuo, oferecendo ferramentas para reconstrução da autoestima e reinserção social.
                        </p>
                    </div>
                </div>
            </section>
            <section className={styles.impactSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <GiHand className={styles.statIcon} />
                        <h3>Transformando vidas</h3>
                        <p>Já ajudamos dezenas de pessoas a reconstruírem suas histórias através de nosso programa de recuperação integral</p>
                    </div>
                    <div className={styles.statCard}>
                        <MdHealthAndSafety className={styles.statIcon} />
                        <h3>85% de Eficácia</h3>
                        <p>Taxa comprovada de sucesso no tratamento a longo prazo, com acompanhamento pós-internação por 2 anos</p>
                    </div>
                    <div className={styles.statCard}>
                        <RiMentalHealthFill className={styles.statIcon} />
                        <h3>Apoio Contínuo</h3>
                        <p>Equipe multidisciplinar disponível 24h com conselheiros em dependência química</p>
                    </div>
                </div>
            </section>

            <section className={styles.processSection}>
                <h2 className={styles.sectionTitle}>Metodologia de Recuperação</h2>
                <div className={styles.processTimeline}>
                    <div className={styles.processStep}>
                        <div className={styles.stepNumber}>1</div>
                        <GiHealthCapsule className={styles.processIcon} />
                        <h3>Acolhimento Integral</h3>
                        <p>Processo inicial com avaliação completa e plano de desintoxicação supervisionado por profissionais especializados</p>
                    </div>
                    <div className={styles.processStep}>
                        <div className={styles.stepNumber}>2</div>
                        <GiPapers className={styles.processIcon} />
                        <h3>Tratamento Personalizado</h3>
                        <p>Desenvolvimento de plano individual com terapia cognitivo-comportamental, atividades ocupacionais e workshops de desenvolvimento pessoal</p>
                    </div>
                    <div className={styles.processStep}>
                        <div className={styles.stepNumber}>3</div>
                        <MdHealthAndSafety className={styles.processIcon} />
                        <h3>Reintegração Social</h3>
                        <p>Acompanhamento pós-tratamento com inclusão em programas de geração de renda, apoio familiar e acompanhamento psicológico mensal</p>
                    </div>
                </div>
            </section>
            <section className={styles.gallerySection}>
                {loading ? <Loading/>:<div className={styles.sectionWrapper}>
                    <h2 className={styles.sectionTitle}>Nossos Registros</h2>

                    {images.length === 0 ? (
                        <div className={styles.emptyGallery}>
                            <p>Nenhuma imagem cadastrada ainda</p>
                            <MdPhotoCamera className={styles.emptyIcon} />
                        </div>
                    ) : (
                        <div className={styles.galleryGrid}>
                            {images.map((image) => (
                                <div key={image.id} className={styles.photoCard}>
                                    <div
                                        className={styles.photoContainer}
                                        style={{ backgroundImage: `url('${image.imageUrl}')` }}
                                    >
                                        <MdPhotoCamera className={styles.photoIcon} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>}
            </section>
            <section className={styles.requirementsSection}>
                <div className={styles.requirementsContent}>
                    <h2 className={styles.sectionTitle}>Processo de Admissão</h2>
                    <p className={styles.sectionText}>Nosso programa segue rigorosos protocolos de segurança e ética. Para admissão voluntária, são necessários:</p>
                    <div className={styles.documentsGrid}>
                        <div className={styles.docCard}>
                            <div className={styles.docHeader}>
                                <span className={styles.docNumber}>01</span>
                                <h3>Documentação Obrigatória</h3>
                            </div>
                            <ul className={styles.docList}>
                                <li>Documentos originais (RG, CPF, Cartão SUS)</li>
                                <li>Exames médicos atualizados (HIV, Hepatite B/C)</li>
                                <li>Relatório psicológico ou psiquiátrico</li>
                                <li>Declaração de antecedentes criminais</li>
                                <li>Carteira de vacinação em dia</li>
                            </ul>
                        </div>
                        <div className={styles.docCard}>
                            <div className={styles.docHeader}>
                                <span className={styles.docNumber}>02</span>
                                <h3>Itens Necessários</h3>
                            </div>
                            <ul className={styles.docList}>
                                <li>Kit higiene pessoal completo</li>
                                <li>Roupas de cama (lençol, fronha, cobertor)</li>
                                <li>Calçados fechados e roupas adequadas</li>
                                <li>Medicações de uso contínuo (se aplicável)</li>
                                <li>Relatório médico atualizado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.progressSection}>
                <div className={`${styles.sectionWrapper} ${styles.sectionProgressWrapper}`}>
                    <div className={styles.progressCard}>
                        <div className={styles.progressContent}>
                            <h2 className={styles.sectionTitle}>Acompanhe a jornada</h2>
                            <p className={styles.progressText}>
                                Nossa plataforma permite que familiares ou responsáveis acompanhem
                                o progresso terapêutico em tempo real, com atualizações seguras e
                                transparentes sobre as fases do processo de recuperação.
                            </p>
                            <button onClick={() => navigate('/acompanhamento')} className={styles.progressButton}>
                                Acessar Plataforma
                                <MdArrowForward className={styles.buttonIcon} />
                            </button>
                        </div>
                        <div className={styles.progressImage}></div>
                    </div>
                </div>
            </section>
            <section className={styles.locationSection}>
                <div className={styles.locationWrapper}>
                    <h2 className={styles.sectionTitle}>Onde Estamos</h2>

                    <div className={styles.locationGrid}>
                        <div className={styles.mapContainer}>
                            <iframe
                                title="Localização Instituto Nova Luz"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2409.009197923734!2d-45.38735904915723!3d-1.6667495865968809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92ad652b268a5f4b%3A0x591032c9c2382c6f!2zSWdyZWphIGRlIFPDo28gSm9zw6k!5e0!3m2!1spt-BR!2sbr!4v1737431621931!5m2!1spt-BR!2sbr"
                                loading="lazy"
                            />
                        </div>

                        <div className={styles.locationInfo}>
                            <div className={styles.infoCard}>
                                <MdLocationOn className={styles.infoIcon} />
                                <div>
                                    <h3 className={styles.infoTitle}>Endereço</h3>
                                    <p className={styles.infoText}>
                                        Av. Santos Drumont, s/n<br />
                                        Bairro Canário<br />
                                        Turiaçu - MA<br />
                                        CEP: 65278-000
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <MdLandscape className={styles.infoIcon} />
                                <div>
                                    <h3 className={styles.infoTitle}>Ponto de Referência</h3>
                                    <p className={styles.infoText}>
                                        Ao lado da Igreja São José<br />
                                        Próximo à avenida<br />
                                        Zona Urbana
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <MdContacts className={styles.infoIcon} />
                                <div>
                                    <h3 className={styles.infoTitle}>Contato</h3>
                                    <p className={styles.infoText}>
                                        98 7021-2132<br />
                                        institutonovaluz22@outlook.com<br />
                                        Visitação: Seg-Sex 8h-18h
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Home.module.css';
import Carrousel from '../components/Carrousel';
import ItemsCard from '../components/ItemsCard';
import { FaUser } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { MdBloodtype } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { FaPumpSoap } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { GiChelseaBoot } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import ReactPlayer from 'react-player';
import video from '../assets/mainVideo.mp4';

export default function Home() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    
        const animations = [
            { class: styles.mainText, trigger: '.' + styles.mainText },
            { class: styles.videoContainer, trigger: '.' + styles.videoContainer },
            { class: styles.aboutUs, trigger: '.' + styles.aboutUs },
            { class: styles.items, trigger: '.' + styles.items },
            { class: styles.imgs, trigger: '.' + styles.imgs },
            { class: styles.location, trigger: '.' + styles.location },
            { class: styles.quemSomos, trigger: '.' + styles.quemSomos },
            { class: styles.trabalhos, trigger: '.' + styles.trabalhos },
            { class: styles.acolhimentoTop, trigger: '.' + styles.acolhimentoTop },
        ];
    
        animations.forEach(({ class: className, trigger }) => {
            gsap.fromTo(
                '.' + className,
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, y: 0, 
                    scrollTrigger: {
                        trigger: trigger,
                        start: 'top 60%',
                    }
                }
            );
        });
        const touchStartHandler = () => {};
        const touchMoveHandler = () => {};
    
        document.addEventListener('touchstart', touchStartHandler, { passive: true });
        document.addEventListener('touchmove', touchMoveHandler, { passive: true });
    
        return () => {
            document.removeEventListener('touchstart', touchStartHandler);
            document.removeEventListener('touchmove', touchMoveHandler);
        };
    }, []);
    return (
        <main className={styles.home}>
            <section className={styles.section}>
                <div className={styles.info}>
                    <div className={styles.mainText}>
                        <p>Comunidade terapêutica</p>
                        <h2>Instituto <br />Nova <span>Luz</span></h2>
                        <p>Associação de apoio a dependentes quimicos de Turiaçu-ma</p>
                        <button className={styles.contactBtn}>Quero apoiar</button>
                    </div>
                    <div className={styles.videoContainer}>
                        <ReactPlayer
                            url={video}
                            controls
                            width="100%"
                            height="auto"
                        />
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.imgs}>
                    <h3>Imagens</h3>
                    <Carrousel />
                </div>
            </section>

            <section id='sobre' className={styles.section}>
                <div className={styles.aboutUs}>
                    <h3>Sobre nós</h3>
                    <article className={styles.quemSomos}>
                        <h4>Quem somos?</h4>
                        <p>O Instituto Nova Luz é uma instituição dedicada ao acolhimento,
                            reabilitação e reintegração de pessoas que enfrentam a dependência química.
                            Fundado com o objetivo de oferecer um espaço seguro e acolhedor, nosso
                            instituto busca proporcionar uma nova chance para indivíduos em busca
                            de recuperação e uma vida plena e saudável.
                            Com uma boa equipe qualificada de profissionais, trabalhamos de forma individualizada, respeitando o tempo e o processo de cada pessoa. Acreditamos
                            que a recuperação é um caminho que deve ser trilhado com respeito, empatia e apoio contínuo.</p>
                    </article>
                    <article id='trabalhos' className={styles.trabalhos}>
                        <h4>Nossas atividades</h4>
                        <p>No Instituto Nova Luz, nos dedicamos a oferecer tratamentos personalizados
                            para pessoas em recuperação da dependência química. Nosso trabalho é baseado
                            em abordagens terapêuticas comprovadas, combinadas com atividades de reintegração social
                            Através de um acompanhamento contínuo, buscamos proporcionar a cada paciente o suporte
                            necessário para superar o vício, promovendo sua reabilitação física, emocional e social.
                            Nosso objetivo é devolver dignidade e esperança a todos que atendemos, ajudando-os
                            a construir um futuro livre da dependência.</p>
                        <ul className={styles.ul}>
                            <li>Agricultura</li>
                            <li>Esportes</li>
                            <li>Igreja</li>
                            <li>Rodas de conversa</li>
                            <li>Muito mais</li>
                        </ul>
                    </article>
                    <article id='acolhimento' className={styles.acolhimento}>
                        <div className={styles.acolhimentoTop}>
                            <h4>Acolhimento</h4>
                            <p>O acolhimento é feito de maneira voluntaria na sede
                                do <span className={styles.yellowText}>instituto Nova Luz</span>. O candidato deve comparecer
                                acompanhado de um familiar ou responsavel que assinará
                                sua ficha de  residencia mediante leitura do <span className={styles.redText}>regimento
                                    interno</span> da instituição.</p>
                        </div>

                        <div className={styles.items}>
                            <h5>Documentos</h5>
                            <div className={styles.cardsItems}>
                                <ItemsCard icon={<FaUser />} item="Rg - Cpf - Sus - CT. Vacinação" />
                                <ItemsCard icon={<IoIosDocument />} item="Ex. Hepatite, HIV, avaliação odontológica" />
                                <ItemsCard icon={<MdBloodtype />} item="Hemograma completo " />
                                <ItemsCard icon={<GoLaw />} item="Antecedentes criminais. " />
                            </div>
                        </div>
                        <div className={styles.items}>
                            <h5>Itens</h5>
                            <div className={styles.cardsItems}>
                                <ItemsCard icon={<FaPumpSoap />} item="Mat. Higiene pessoal" />
                                <ItemsCard icon={<FaBed />} item="Roupas de cama " />
                                <ItemsCard icon={<GiChelseaBoot />} item="Botas de borracha " />
                                <ItemsCard icon={<PiPantsFill />} item="Calças (para celebrações) " />
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.location}>
                    <h3>Localização</h3>
                    <p>A sede do instituto Nova Luz fica na av Santos Drumont, sem numero/ Canário em Turiaçu-ma. Ao lado da Igreja São José.</p>

                    <div className={styles.map}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2409.009197923734!2d-45.38735904915723!3d-1.6667495865968809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92ad652b268a5f4b%3A0x591032c9c2382c6f!2zSWdyZWphIGRlIFPDo28gSm9zw6k!5e0!3m2!1spt-BR!2sbr!4v1737431621931!5m2!1spt-BR!2sbr"  loading="lazy"></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}

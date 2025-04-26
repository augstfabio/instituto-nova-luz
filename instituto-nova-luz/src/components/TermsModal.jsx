import React, { useState } from 'react';
import styles from './TermsModal.module.css';

export default function TermsModal({showModal, closeModal}) {
   
    return (
        <>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2 className={styles.title}>Termos e Condições de Uso</h2>
                        <div className={styles.termsText}>
                            <p><strong>1. Aceitação dos Termos</strong></p>
                            <p>Ao acessar ou criar conta no site do Instituto Nova Luz, você concorda com os termos e condições descritos neste documento. Caso não concorde com qualquer parte deste termo, você deve interromper o uso do site imediatamente.</p>

                            <p><strong>2. Uso do Site</strong></p>
                            <p>Você concorda em utilizar o site para fins legais e de acordo com as leis aplicáveis, respeitando os direitos dos outros usuários e a propriedade intelectual do conteúdo disponível. É proibido qualquer uso que possa danificar a integridade do site, prejudicar o funcionamento do sistema ou violar as leis locais e internacionais.</p>
                            <p>Não será permitido o uso do site para disseminação de conteúdos que possam ser considerados abusivos, discriminatórios, invasivos ou prejudiciais a terceiros.</p>

                            <p><strong>3. Responsabilidade</strong></p>
                            <p>O Instituto Nova Luz não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou da incapacidade de usar o site, incluindo, mas não se limitando a, perda de dados, falhas técnicas, ou o uso indevido do conteúdo por terceiros.</p>
                            <p>Os usuários são os únicos responsáveis pela veracidade e integridade dos dados fornecidos e pelo uso do site de forma ética e legal.</p>

                            <p><strong>4. Alterações nos Termos</strong></p>
                            <p>O Instituto Nova Luz pode modificar estes Termos de Uso a qualquer momento, sendo as alterações publicadas no site. As mudanças entrarão em vigor assim que forem publicadas e será de responsabilidade do usuário verificar periodicamente os termos atualizados.</p>

                            <p><strong>5. Dados de Usuário</strong></p>
                            <p>Ao se registrar no site, você concorda em fornecer informações verdadeiras, completas e atualizadas. O Instituto Nova Luz pode solicitar documentos adicionais para verificar a identidade e os dados fornecidos, caso necessário, para a participação em programas ou serviços.</p>
                            <p>É de sua responsabilidade manter as informações de contato atualizadas para garantir a continuidade de sua participação nos serviços.</p>

                            <p><strong>6. Uso de Firebase</strong></p>
                            <p>Este site utiliza o Firebase para o gerenciamento e armazenamento de dados dos usuários, bem como para a autenticação e personalização da experiência do usuário. O Firebase é uma plataforma segura que respeita a privacidade e a segurança dos dados coletados.</p>
                            <p>Ao utilizar o site, você consente que seus dados sejam processados de acordo com as políticas de privacidade do Firebase, disponíveis em <a href="https://firebase.google.com/support/privacy">Firebase Privacy</a>.</p>

                            <p><strong>7. Uso do Conteúdo</strong></p>
                            <p>Todo o conteúdo disponível no site, incluindo textos, imagens, vídeos, logotipos, marcas, e programas de treinamento, são propriedade do Instituto Nova Luz ou de seus parceiros e estão protegidos por direitos autorais e outras leis de propriedade intelectual.</p>
                            <p>É proibido copiar, reproduzir, distribuir ou modificar o conteúdo do site sem a devida autorização do Instituto Nova Luz.</p>

                            <p><strong>8. Limitação de Responsabilidade</strong></p>
                            <p>Embora nos esforcemos para garantir que as informações no site estejam corretas e atualizadas, não garantimos que o conteúdo será sempre exato, completo ou livre de erros. O Instituto Nova Luz não se responsabiliza por qualquer falha técnica, interrupção ou erro no serviço oferecido pelo site.</p>
                            <p>A utilização do site é por sua conta e risco, e o Instituto Nova Luz não se responsabiliza por danos decorrentes de seu uso.</p>

                            <p><strong>9. Termos para Inscrição</strong></p>
                            <p>Ao realizar a inscrição para os programas de apoio terapêutico ou eventos organizados pelo Instituto Nova Luz, você concorda em fornecer informações verdadeiras e precisas. O Instituto se reserva o direito de verificar as informações e não aceitar inscrições com dados incorretos ou incompletos.</p>
                            <p>Além disso, a inscrição está sujeita à disponibilidade de vagas, e o Instituto Nova Luz pode, a seu critério, limitar a participação de acordo com a capacidade do programa ou evento.</p>

                            <p><strong>10. Desistência e Cancelamento</strong></p>
                            <p>Se você decidir desistir de participar de um programa ou evento, o Instituto Nova Luz solicita que a desistência seja informada com antecedência mínima de 48 horas. Para os casos de desistência com menos de 48 horas de antecedência, será analisada a possibilidade de reembolso conforme a política interna.</p>

                            <p><strong>11. Propriedade Intelectual</strong></p>
                            <p>Os materiais e recursos utilizados nos programas de apoio, bem como conteúdos publicados no site, são de propriedade do Instituto Nova Luz e são protegidos por direitos autorais. O uso não autorizado destes materiais será tratado de acordo com as leis de propriedade intelectual.</p>

                            <p><strong>12. Força Maior</strong></p>
                            <p>O Instituto Nova Luz não será responsável por falhas ou atrasos nos serviços devido a circunstâncias fora de seu controle, incluindo, mas não se limitando a, desastres naturais, falhas na infraestrutura, greves ou outros eventos de força maior.</p>

                            <p><strong>13. Disposições Gerais</strong></p>
                            <p>Se qualquer parte destes Termos de Uso for considerada inválida ou inaplicável, as demais disposições permanecerão em vigor. Estes Termos de Uso são regidos pelas leis brasileiras e qualquer disputa será resolvida nos tribunais competentes da cidade do Rio de Janeiro.</p>

                            <button onClick={closeModal} className={styles.closeButton}>Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

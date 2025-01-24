import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './Carrousel.module.css';

// Importando as imagens da pasta assets no formato PNG
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';
import img7 from '../assets/img7.png';

export default function Carrousel() {
  return (
    <Swiper
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Navigation, Pagination]}
      className={styles.mySwiper}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      breakpoints={{
        1024: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      }}
    >
      <SwiperSlide>
        <img src={img1} alt="Imagem 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="Imagem 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="Imagem 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img4} alt="Imagem 4" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img5} alt="Imagem 5" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img6} alt="Imagem 6" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img7} alt="Imagem 7" />
      </SwiperSlide>
      <div className="swiper-button-prev" style={{ color: '#f7b000', fontSize: '30px' }}></div>
      <div className="swiper-button-next" style={{ color: '#f7b000', fontSize: '30px' }}></div>
    </Swiper>
  );
}

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Autoplay } from 'swiper/modules';

import AlexMorgan from "../assets/avatars/alex-morgan.jpg";
import LauraChen from "../assets/avatars/laura-chen.jpg";
import DanielKovacs from "../assets/avatars/daniel-kovacs.jpg";

import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  return (
    <section className="Testimonials">
      <h1 className="SectionTitle">Testimonials</h1>
     <div className="Container">
       <Swiper
         modules={[Keyboard, Pagination, Autoplay]}
         slidesPerView={'auto'}
         spaceBetween={30}
         pagination={{ clickable: true, dynamicBullets: true, }}
         autoplay={{ delay: 5000, disableOnInteraction: false }}
         breakpoints={{
           640:  { slidesPerView: 1 },
           768:  { slidesPerView: 2 },
           1024: { slidesPerView: 3 }
         }}
         keyboard={{
          enabled: true,
         }}
         className="Swiper"
       >
          <SwiperSlide>
            <TestimonialCard
              author="Alex Morgan"
              role="Founder, SaaS Startup"
              quote="Hestia delivered a clean, scalable product that was easy to iterate on. Communication was clear and technical decisions were solid."
              rating={5}
              avatar={AlexMorgan}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              author="Laura Chen"
              role="Marketing Lead"
              quote="The design work was sharp and consistent, and the development matched it perfectly. Everything felt intentional and well executed."
              rating={5}
              avatar={LauraChen}
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              author="Daniel Kovacs"
              role="Product Manager"
              quote="From early concepts to final delivery, Hestia handled both design and engineering with professionalism and attention to detail."
              rating={4}
              avatar={DanielKovacs}
            />
          </SwiperSlide>
       </Swiper>
     </div>
    </section>
  )
}

function TestimonialCard({ quote, author, role, avatar, rating=5 }) {
  return (
    <div className="TestimonialCard">
      <div className="Content lg:py-8 lg:px-7">
        <div className="flex-1">
          <div className="StarsContainer">
            {[...Array(rating)].map((_, i) => (
              <svg key={i} className="Star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote className="Quote">
            <p className="Quote">"{quote}"</p>
          </blockquote>
        </div>

        <div className="AuthorContainer">
          {avatar && (
            <img
              className="Avatar"
              src={avatar}
              alt={author}
            />
          )}
          <div className={avatar ? "ml-4" : ""}>
            <p className="Author">{author}</p>
            <p className="Role">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
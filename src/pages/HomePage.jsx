import { useRef } from 'react'

import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";


function HomePage() {
    const { projects, isLoading, error } = useProjects();

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    return (
        <section className="section home">
            <div className="welcome">
                <img className="header-image" src="../../graduation3.jpeg" alt="" />
                <div className="overlay-home"></div>
            </div>
            <div className="swiper-projects">
                <Swiper
                    modules = {[EffectCoverflow, Autoplay, Pagination, Navigation]}
                    coverflowEffect={
                        {
                            depth:500,
                            rotate: 50,
                            stretch: 0,
                            modifier: 1,
                            slideShadows: true,
                        }
                    }
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={
                        {
                            clickable: true,
                            dynamicBullets: true,
                        }
                    }
                    centeredSlides={true}
                    effect='coverflow'
                    grabCursor={true}
                    // navigation={true}
                    slidesPerView={3}
                    className="mySwiper"
                    spaceBetween={20}
                    onAutoplayTimeLeft={onAutoplayTimeLeft}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    
                    {
                        projects.map((project, key) => {
                            return (
                                <SwiperSlide key={key}>
                                    <ProjectCard key={key} projectData={project} />
                                </SwiperSlide>
                            )
                    })}
                    
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div>
                </Swiper>
            </div>
        </section>
    );
}

export default HomePage;
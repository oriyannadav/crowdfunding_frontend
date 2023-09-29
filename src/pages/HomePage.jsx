import { useRef} from 'react'
import { Link } from "react-router-dom";

import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./HomePage.css";


import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";


function HomePage() {
    const { projects, isLoading, error } = useProjects();

    const progressCircle = useRef(null);
    // const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        // progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
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
                    effect={ 'coverflow' }
                    grabCursor={ true }
                    centeredSlides={ true }
                    loop={ true }
                    slidesPerView={ 'auto' }
                    // navigation={true}
                    coverflowEffect={
                        {
                            depth: 100,
                            loop: true,
                            rotate: 0,
                            stretch: 0 ,
                            modifier: 2.5,
                            slideShadows: true,
                        }
                    }
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        reverseDirection: false,
                    }}
                    pagination={
                        {
                            clickable: true,
                            dynamicBullets: true,
                        }
                    }
                    // initialSlide= {3}
                    className={ "mySwiper" }
                    // spaceBetween={25}
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
                        {/* <span ref={progressContent}></span> */}
                    </div>
                </Swiper>
            </div>
            <div className='bottom-section'>
                <div className="bottom-section-writing">
                    <div className="bottom-section-writing-inside">
                        <h3>Ready to get started?</h3>
                        <Link to="/signup">
                            <button>
                                Sign Up Now
                            </button>
                        </Link>
                    </div>
                    <div className="bottom-section-writing-inside">
                        <h3>Already a memeber?</h3>
                        <Link to="/login">
                            <button>
                                Log In Now
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="bottom-section-image">
                    <img src="/heart3.png" alt="" />
                </div>
            </div>
            <div className="footer-text">
                <p>&copy; 2023 Schoolr</p>
            </div>
        </section>
    );
}

export default HomePage;
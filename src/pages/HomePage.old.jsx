
import { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import 'swiper/css';

import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();
    const swiperRef = useRef(null);

    useEffect(() => {
        // Register Swiper web component
        register();

        // Add event listener
        if (swiperRef.current && document.querySelector('.tranding-slider')) {
            const trandingSlider = new Swiper('.tranding-slider', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                loop: true,
                slidesPerView: 'auto',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });

            // Add event listener
            trandingSlider.on('slideChange', () => {
                console.log('Slide changed');
            });

            // Cleanup Swiper when the component unmounts
            return () => {
                trandingSlider.destroy(true, true);
            };
        }
    }, []);

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
                {/* <img className="schoolr-image" src="../../schoolr.png" alt="" /> */}
            </div>
            <swiper-container init="false" ref={swiperRef}>
                {/* <div id="project-list"> */}
                    {
                        projects.map((project, key) => {
                            return <ProjectCard key={key} projectData={project} />;
                    })}
                {/* </div> */}
            </swiper-container>
        </section>
    );
}

export default HomePage;
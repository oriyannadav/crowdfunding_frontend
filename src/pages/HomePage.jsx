import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }
    
    return (
        <section className="section home">
            <div className="welcome">
                <img className="header-image" src="../../public/graduation3.jpeg" alt="" />
                <div className="overlay"></div>
                {/* <h2>Sch<img src="../../public/logo1.png" />olr</h2> */}
                <img className="schoolr-image" src="../../public/schoolr.png" alt="" />
            </div>
            <div id="project-list">
                {
                    projects.map((project, key) => {
                        return <ProjectCard key={key} projectData={project} />;
                })}
            </div>
        </section>
    );
}

export default HomePage;
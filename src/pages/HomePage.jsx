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
        <div id="project-list">
            {
                projects.map((project, key) => {
                    return <ProjectCard key={key} projectData={project} />;
            })}
        </div>
    );
}

export default HomePage;
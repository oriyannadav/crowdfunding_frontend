import { Link } from "react-router-dom";

import "./ProjectCard.css";

function ProjectCard(props) {
    const { projectData } = props;
    const projectLink = `/project/${projectData.id}`;
    
    return (
        <div className="project-card">
            <Link to={projectLink}>
                <img src={projectData.image} />
                <div className="description">
                    <h3>{projectData.title}</h3>
                    <p>Target is ${projectData.goal}</p>
                    <p>{projectData.description}...</p>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard;
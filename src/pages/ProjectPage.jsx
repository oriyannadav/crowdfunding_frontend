import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import CreatePledge from "./CreatePledge.jsx";
// import ProjectComments from "../components/Comments";
import "./ProjectPage.css";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    const totalPledgeAmount = project.pledges.reduce((total, pledgeData) => {
        return total + pledgeData.amount;
    }, 0);

    const numberOfPledges = project.pledges.length;

    // Calculate the percentage of funding progress
    const fundingProgress = (project.total_amount / project.goal) * 100;

    return (
        <section className="project-section" >
            <h1>{project.title}</h1>
            <img src={project.image} alt="" />
            <div className="project-container">
                <h2>${totalPledgeAmount} raised of ${project.goal} target</h2>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${fundingProgress}%` }}></div>
                    </div>
                </div>
                <div className="data-container">
                    <h3>{numberOfPledges} pledges</h3>
                    <h3>Created at: {project.date_created}</h3>
                    <h3>{`Status: ${project.is_open}`}</h3>
                </div>
                <div className="pledge-section">
                    <h3>Pledge now:</h3>
                    <ul>
                        {project.pledges.map((pledgeData, index) => {
                            return (
                                <li key={index}>
                                    {pledgeData.amount} from {pledgeData.supporter}
                                </li>
                            );
                        })}
                    </ul>
                    {/* Render the CreatePledge component */}
                    <CreatePledge projectId={id} />
                </div>
            </div>
            <p className="project-description">{project.description}</p>
            {/* <ProjectComments comments={project.comments} /> */}
        </section>
    );
}

export default ProjectPage
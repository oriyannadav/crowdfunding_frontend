import { Link, useParams, useNavigate } from "react-router-dom";

import useProject from "../hooks/use-project";
import useAuth from "../hooks/use-auth";

import deleteProject from "../api/delete-project";

import CreatePledge from "./CreatePledge.jsx";
import "./ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();
    const { auth } = useAuth();

    const { project, isLoading, error } = useProject(id);
    const projectLink = `/project/${id}/update`;

    const navigate = useNavigate();

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error("Error deleting project:", error)
            });
        }
    };

    const formattedDate = new Date(project.date_created).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const totalPledgeAmount = project.pledges.reduce((total, pledgeData) => {
        return total + pledgeData.amount;
    }, 0);
    const numberOfPledges = project.pledges.length;
    const goal = typeof project.goal === 'number' ? project.goal : 0;
    const fundingProgress = goal !== 0 ? (totalPledgeAmount / goal) * 100 : 0;

    const pledgeAmountCounts = {};
    project.pledges.forEach((pledgeData) => {
        const amount = pledgeData.amount;
        if (pledgeAmountCounts[amount]) {
            pledgeAmountCounts[amount]++;
        } else {
            pledgeAmountCounts[amount] = 1;
        }
    });

    return (
        <section className="project-section" >
            <h1>{project.title}</h1>
            <h3>{formattedDate}</h3>
            <div className="project-section-container">
                <img src={project.image} alt="" />
                <div className="project-container">
                    <div className="project-progress-bar">
                        <h2>${totalPledgeAmount} raised of ${project.goal} target</h2>
                        <div className="progress-container">
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${fundingProgress}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="pledge-section">
                        <h3>Pledge now:</h3>
                        {/* Render the CreatePledge component */}
                        <CreatePledge projectId={id} />
                        <div className="button">
                            {auth.id === project.owner && (
                                <>
                                    <div>
                                        <Link to={projectLink}>
                                            <button>Update Project</button>
                                        </Link>
                                        <button onClick={handleDelete} className="delete-button">
                                            Delete Project
                                        </button>
                                    </div>
                                    <div className="data-container">
                                        <h3>{numberOfPledges} Pledges</h3>
                                        <div className="data-container-pledges">
                                            {Object.entries(pledgeAmountCounts).map(([amount, count]) => (
                                                <p key={amount}>{`$${amount} from ${count}`}</p>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="project-bottom-section">
                <div className="project-description-container">
                    <p className="project-description">{project.description}</p>
                </div>
                <div className="pledge-comments">
                    {project.pledges.length === 0 ? (
                        <p>No pledges were made.</p>
                    ) : (
                        <>
                            <h3>Recent Pledges:</h3>
                            {project.pledges.map((pledge, index) => (
                                <div key={index} className="pledge-comment">
                                    <h4>Pledge {index + 1}</h4>
                                    <p>Amount: ${pledge.amount}</p>
                                    <p>Comment: {pledge.comment}</p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProjectPage
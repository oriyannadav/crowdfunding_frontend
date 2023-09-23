import { Link } from 'react-router-dom';

import useUser from "../hooks/use-user";
import useAuth from "../hooks/use-auth";
import useProjects from '../hooks/use-projects';

import ProjectCard from "../components/ProjectCard";

import "./ProfilePage.css";

function ProfilePage() {
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useAuth();
    const id = auth.id;

    const { user, isLoading, error } = useUser(id);
    const { projects } = useProjects();

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    let userProjects = [];
    userProjects = projects.filter((projects) => user.id == projects.owner);

    return (
        <section className="profile-page">
            <div className="profile-section">
                <div className="profile-heading">
                    <h1>Your Profile</h1>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 profile-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                </div>
                <div className="profile-container">
                    <div className="profile-data">
                        <h3>First Name</h3>
                        <p>{user.first_name}</p>
                        <h3>Last Name</h3>
                        <p>{user.last_name}</p>
                    </div>
                    <div className="profile-data profile-data-second">
                        <h3>Username</h3>
                        <p>{user.username}</p>
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-heading">
                    <h1>Your Projects</h1>
                    <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 profile-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                    </svg>
                    </div>
                </div>
                <div className="profile-container projects-container">
                {
                        userProjects.map((project, key) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div className="project-card-profile">
                                    <ProjectCard key={key} projectData={project} />
                                </div>
                            )
                    })
                    }
                </div>
            </div>
            <Link to="/create-project">
                <button>Create Project</button>
            </Link>
        </section>
    )
}

export default ProfilePage;
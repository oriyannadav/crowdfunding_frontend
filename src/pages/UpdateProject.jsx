import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import putProject from "../api/put-project"

import useProject from "../hooks/use-project";

import "./CreateProject.css"

function UpdateProject() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { project, error } = useProject(id);

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: null,
    })

    useEffect(() => {
        if (project) {
            setProjectData({
                ...projectData,
                ...project,
            })
        }
    }, [project]);

    const handleChange = (event) => {
        setProjectData({
            ...projectData, 
            [event.target.id]: event.target.value
        })
    }

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const imageUrl = e.target.result;
    
                setProjectData({
                ...projectData,
                image: imageUrl,
                });
            };
    
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        putProject(projectData, id)
        .then(() => {
            navigate('/')
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    if (isLoading) {
        return (<p>loading...</p>)
    }
    
    if (error) {
        return (<p>Error is: {error.message}</p>)
    }

    return (
        <div className="create-project-page">
            <div className="create-project-container">
                <div className="create-project-form">
                    <h1>Update a Project</h1>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="create-project-input-container">
                                <label htmlFor="title">Give your project a title</label>
                                <input 
                                type="text" 
                                id="title" 
                                placeholder='Title'
                                onChange={handleChange}
                                value={projectData.title}
                                />
                            </div>
                            <div className="inline-container">
                                <div className="create-project-input-container">
                                    <label htmlFor='goal'>What is the amount needed to reach your goal?</label>
                                    <input
                                    type='number'
                                    id='goal'
                                    placeholder='Goal'
                                    onChange={handleChange}
                                    value={projectData.goal}
                                    />
                                </div>
                                <div className="create-project-input-container">
                                    <label htmlFor='image'>Upload an image</label>
                                    <input
                                    type='file'
                                    id='image'
                                    placeholder='image/*'
                                    onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="create-project-input-container">
                                <label htmlFor="description">Tell us your story</label>
                                {/* <input 
                                type="textarea" 
                                id="description" 
                                placeholder='Description'
                                onChange={handleChange} 
                                /> */}
                                <textarea 
                                id="description" 
                                placeholder='Description'
                                onChange={handleChange} 
                                value={projectData.description}
                                cols="60" 
                                rows="5"
                                />
                            </div>
                            <button type="submit" value="Project">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UpdateProject
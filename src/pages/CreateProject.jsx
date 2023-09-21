import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import postProject from "../api/post-project"

function CreateProject() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        goal: 0,
        image: null,
    })

    const handleChange = (event) => {
        setProjectData({
            ...projectData, 
            [event.target.id]: event.target.value
        })
    }

    const handleImageChange = (event) => {
        setProjectData({
            ...projectData,
            image: event.target.files[0],
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        postProject(projectData)
        .then(() => {
            navigate('/')
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="project-section">
            <h1>Create a Project</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div className="project-input-container">
                    <label htmlFor="title">Give your project a title</label>
                    <input 
                    type="text" 
                    id="title" 
                    placeholder='Title'
                    onChange={handleChange}
                    />
                </div>
                <div className="project-input-container">
                    <label htmlFor="description">Tell us your story</label>
                    <input 
                    type="text" 
                    id="description" 
                    placeholder='Description'
                    onChange={handleChange} 
                    />
                </div>
                <div className="project-input-container">
                    <label htmlFor='goal'>What is the amount needed to reach your goal?</label>
                    <input
                    type='number'
                    id='goal'
                    placeholder='Goal'
                    onChange={handleChange}
                    />
                </div>
                <div className="project-input-container">
                    <label htmlFor='image'>Upload an image</label>
                    <input
                    type='file'
                    id='image'
                    placeholder='image/*'
                    onChange={handleImageChange}
                    />
                </div>
                <button type="submit" value="Project">
                    Create Project
                </button>
            </form>
        </div>
    )
}

export default CreateProject
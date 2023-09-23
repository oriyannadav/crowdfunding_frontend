import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import postProject from "../api/post-project"

import "./CreateProject.css"

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

    // const handleImageChange = (event) => {
    //     const selectedFile = event.target.files[0];
    
    //     if (selectedFile) {
    //         const reader = new FileReader();
    
    //         reader.onload = (e) => {
    //             const imageUrl = e.target.result;
    
    //             setProjectData({
    //             ...projectData,
    //             image: imageUrl,
    //             });
    //         };
    
    //         reader.readAsDataURL(selectedFile);
    //     }
    // };

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        postProject(projectData)
        .then(() => {
            navigate('/profile')
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="create-project-page">
            <div className="create-project-container">
                <div className="create-project-form">
                    <h1>Create a Project</h1>
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="create-project-input-container">
                                <label htmlFor="title">Give your project a title</label>
                                <input 
                                type="text" 
                                id="title" 
                                placeholder='Title'
                                onChange={handleChange}
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
                                    />
                                </div>
                                <div className="create-project-input-container">
                                    <label htmlFor='image'>Upload an image</label>
                                    {/* <input
                                    type='file'
                                    id='image'
                                    placeholder='image/*'
                                    onChange={handleImageChange}
                                    /> */}
                                    <input
                                    type='text'
                                    id='image'
                                    placeholder='Image URL'
                                    onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="create-project-input-container">
                                <label htmlFor="description">Tell us your story</label>
                                <textarea 
                                id="description" 
                                placeholder='Description'
                                onChange={handleChange} 
                                cols="60" 
                                rows="5"
                                />
                            </div>
                            <button type="submit" value="Project">
                                Create Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CreateProject
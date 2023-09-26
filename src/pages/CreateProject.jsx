import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import postProject from "../api/post-project"

import "./CreateProject.css";

import axios from 'axios';

function CreateProject() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const cloudName = 'ds1w5th9i';
    const uploadPreset = 'schoolr_upload_present';

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

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

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
    
            try {
                const response = await axios.post(uploadUrl, formData);
                const imageUrl = response.data.secure_url;
    
                // Update the projectData with the uploaded image URL
                setProjectData({
                    ...projectData,
                    image: imageUrl,
                });
    
                // You can save the `imageUrl` or use it as needed.
                console.log('Image uploaded successfully:', imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };
    

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
                                required
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
                                    required
                                    />
                                </div>
                                <div className="create-project-input-container">
                                    <label htmlFor='image'>Upload an image</label>
                                    <input
                                    type='file'
                                    id='image'
                                    placeholder='image/*'
                                    onChange={handleImageChange}
                                    required
                                    />
                                    {/* <input
                                    type='text'
                                    id='image'
                                    placeholder='Image URL'
                                    onChange={handleChange}
                                    /> */}
                                    {projectData.image && (
                                        <img src={projectData.image} alt="Uploaded" width="150" />
                                    )}
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
                                required
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
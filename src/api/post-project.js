async function postProject(projectData) {

    const url =`${import.meta.env.VITE_API_URL}/projects/`;
    const response = await fetch(url, {
        method: "POST",
        // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            "title": projectData.title,
            "description": projectData.description,
            "goal": projectData.goal,
            "image": projectData.image,
            "is_open": true,
            "date_created": new Date(),
        }),
    });
    
    if (!response.ok) {
        
        const fallbackError =`Error trying to create the project`;
        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
            const errorMessage = data?.detail?? fallbackError;
            throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default postProject;
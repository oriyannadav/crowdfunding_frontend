async function putProject(projectData, projectId) {

    const url =`${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const response = await fetch(url, {
        method: "PUT",
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
        }),
    });
    
    if (!response.ok) {
        
        const fallbackError =`Error trying to update the project`;
        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
            const errorMessage = data?.detail?? fallbackError;
            throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default putProject;
async function deleteProject( projectId) {

    const url =`${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const response = await fetch(url, {
        method: "DELETE",
        // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
        headers: {
            "Content-Type":"application/json",
            "Authorization": `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(),
    });
    
    if (!response.ok) {
        
        const fallbackError =`Error trying to delete the project`;
        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
            const errorMessage = data?.detail?? fallbackError;
            throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default deleteProject;
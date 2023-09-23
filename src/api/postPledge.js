async function postPledge(pledgeData) {

    const url =`${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "authorization": `Token ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            "project": pledgeData.project,
            "amount": pledgeData.amount,
            "comment": pledgeData.comment,
            "anonymous": pledgeData.anonymous,
        }),
    });
    
    if (!response.ok) {
        const fallbackError =`Error trying to pledge`;
        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
            const errorMessage = data?.detail?? fallbackError;
            throw new Error(errorMessage);
    }
    
    return await response.json();
}

export default postPledge;
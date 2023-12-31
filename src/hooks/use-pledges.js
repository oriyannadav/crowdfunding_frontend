import { useState, useEffect } from "react";

import getPledges from "../api/get-pledges";

export default function usePledges() {
    // Here we use the useState hook to create a state variable called projects and a function to update it called setProjects. 
    // We initialize the state variable with an empty array.
    
    const [pledges, setPledges] = useState([]);
    // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    // We use the useEffect hook to fetch the projects from the API and update the state variables accordingly.
    // This useEffect will only run once, when the component this hook is used inis mounted.
    
    useEffect(() => {
        getPledges()
            .then((pledges) => {
                setPledges(pledges);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);
    // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the 
    // component using this hook will re-render.
    
    return { pledges, isLoading, error };
}

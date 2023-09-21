import { useState, useEffect } from "react";

import getUsers from "../api/get-users";

export default function useUsers() {
    const [users, setUsers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        // Here we pass the projectId to the getProject function.
        getUsers()
            .then((users) => {
                setUsers(users);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
        // This time we pass the projectId to the dependency array so that the hook will re-run if the 
        // projectId changes.
    }, []);
    
    return { users, isLoading, error };
}
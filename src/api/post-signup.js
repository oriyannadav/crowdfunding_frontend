async function postSignUp(first_name, last_name, email, username, password) {

    const url =`${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
        method: "POST",
        // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password,
        }),
    });
    
    if (!response.ok) {
        
        const fallbackError =`Error trying to SignUp`;
        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
            const errorMessage = data?.detail?? fallbackError;
            throw new Error(errorMessage);
    }

    // let signupResponse = await response.json()

    // postLogin(
    //     username,
    //     password
    // ).then((res) => {
    //     signupResponse.token = res.token
    // })
    
    return await response.json();
}

export default postSignUp;
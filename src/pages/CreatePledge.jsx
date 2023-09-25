import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import postPledge from '../api/postPledge';

import useAuth from "../hooks/use-auth";

function CreatePledge(props) {
    const navigate = useNavigate();

    const { auth } = useAuth();

    const [pledgeError, setPledgeError] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [pledgeData, setPledgeData] = useState({
        project: props.projectId,
        amount: 0,
        comment: '',
        anonymous: false
    });

    const handleChange = (event) => {
        setPledgeData({
        ...pledgeData, 
        [event.target.id]: event.target.value
        })
    }

    const handleChecked = (event) => {
        setPledgeData({
        ...pledgeData,
        [event.target.id]: event.target.checked
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)

        if (!auth.token) {
            setPledgeError("You must be logged in to make a pledge.");
            setIsLoading(false);
            return;
        }

        postPledge(pledgeData)
        .then(() => {
            navigate(0)
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <form onSubmit={handleSubmit} className='form'>
            <div className="pledge-input-container">
                <label htmlFor="amount">Amount</label>
                <input 
                type="text" 
                id="amount" 
                placeholder='Enter the amount'
                required
                onChange={handleChange}
                />
            </div>
            <div className="pledge-input-container">
                <label htmlFor="comment">Comment</label>
                <input 
                type="text" 
                id="comment" 
                placeholder='Enter a comment'
                required
                onChange={handleChange} 
                />
            </div>
            <div className="pledge-input-container pledge-input-container-anonymous">
                <label htmlFor='anonymous'>Anonymous Pledge</label>
                <input
                type='checkbox'
                id='anonymous'
                onChange={handleChecked}
                />
            </div>

            {pledgeError && <p className="error-message">{pledgeError}</p>}

            <button type="submit" value="Pledge">
                Pledge
            </button>
        </form>
    )
}

export default CreatePledge
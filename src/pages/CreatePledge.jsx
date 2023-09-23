import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import postPledge from '../api/postPledge';

function CreatePledge(props) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [pledgeData, setPledgeData] = useState({
        project: props.projectId,
        amount: 0,
        comment: '',
        anonymous: false
    })

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
            <button type="submit" value="Pledge">
                Pledge
            </button>
        </form>
    )
}

export default CreatePledge
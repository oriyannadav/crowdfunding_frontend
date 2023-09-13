import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import postPledge from '../../api/postPledge'

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
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="amount">Amount</label>
            <input 
            type="text" 
            id="amount" 
            placeholder='Enter the amount' 
            onChange={handleChange} 
            />
        </div>
        <div>
            <label htmlFor="comment">Comment</label>
            <input 
            type="text" 
            id="comment" 
            placeholder='Enter a comment' 
            onChange={handleChange} 
            />
        </div>
        <div>
            <label htmlFor='anonymous'>Anonymous Pledge</label>
            <input
            type='checkbox'
            id='anonymous'
            onChange={handleChecked}
            />
        </div>
        <input type="submit" value="Pledge" />
        </form>
    )
}

export default CreatePledge
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

export const SelectApp = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('suggest', {replace: true})
    }, [navigate])
    return <div>Why are we here?</div>
}

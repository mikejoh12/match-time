import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFacility, fetchFacility } from '../../features/facilities/facilitiesSlice'

export const FacilityLogin = () => {
    const { id } = useParams()
    const facility = useSelector(selectFacility)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchFacility(id))
    }, [id, dispatch])

    const handleUserLogin = () => history.push('/user-dashboard')
    const handleManagerLogin = () => history.push('/manager-dashboard')

    return (
        <div>
            <h1>{facility.name}</h1>
            <p>{facility.description}</p>
            <button onClick={handleUserLogin}>
                User Login
            </button>
            <button onClick={handleManagerLogin}>
                Manager Login
            </button>
        </div>
    )
}

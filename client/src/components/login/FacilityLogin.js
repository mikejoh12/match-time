import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFacility, fetchFacility } from '../../features/facilities/facilitiesSlice'

export const FacilityLogin = () => {
    const { id } = useParams()
    const facility = useSelector(selectFacility)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFacility(id))
    }, [id, dispatch])

    return (
        <div>
            <h1>{facility.name}</h1>
            <p>{facility.description}</p>
        </div>
    )
}

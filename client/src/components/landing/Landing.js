import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { selectAllFacilities, fetchAllFacilities } from '../../features/facilities/facilitiesSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Landing = () => {

    const dispatch = useDispatch()
    const [clubId, setClubId] = useState(1)
    const facilities = useSelector(selectAllFacilities)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchAllFacilities())
    }, [dispatch])

    const handleChange = event => setClubId(event.target.value)
    
    const handleSubmit = event => {
        history.push(`/${clubId}`)
        event.preventDefault()
    }

    return (
                <div>
                <form onSubmit={handleSubmit}>
                    <label>
                    Choose a club:
                    <select value={clubId} onChange={handleChange}>
                        {
                            facilities.map(facility =>
                                <option value={facility.id} key={facility.id}>{facility.name}</option>)
                        }
                    </select>
                    </label>
                <input type="submit" value="Submit" />
            </form>
                </div>
        )
}

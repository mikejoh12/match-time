import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFacility, fetchFacility } from '../../features/facilities/facilitiesSlice'
import Grid from "@material-ui/core/Grid";

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
            <Grid   container
                    justify="center"
                    direction="column"
                    alignItems="center">
                <Grid item>
                    <h1>{facility.name}</h1>
                </Grid>
                <Grid item>
                    <p>{facility.description}</p>
                </Grid>
                <Grid item>
                    <button onClick={handleUserLogin}>
                        User Login
                    </button>
                </Grid>
                <button onClick={handleManagerLogin}>
                    Manager Login
                </button>
            </Grid>
        </div>
    )
}

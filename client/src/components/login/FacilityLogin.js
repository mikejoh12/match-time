import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectFacility, fetchFacility } from '../../features/facilities/facilitiesSlice'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

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
                    alignItems="center"
                    spacing={2}>
                <Grid item>
                    <h1>{facility.name}</h1>
                </Grid>
                <Grid item>
                    <p>{facility.description}</p>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleUserLogin}>User Login</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleManagerLogin}>Manager Login</Button>
                </Grid>
            </Grid>
        </div>
    )
}

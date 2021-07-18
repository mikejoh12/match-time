import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetFacilityByIdQuery } from '../../services/api';
import { facilityUpdated } from '../../features/current-facility/currentFacilitySlice';

export const FacilityLogin = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const { data: facilityData, isError, isLoading } = useGetFacilityByIdQuery(id)

    useEffect(() => {
        dispatch(facilityUpdated(facilityData))
    }, [facilityData, dispatch])

    const handleUserLogin = () => history.push(`/user-dashboard`)
    const handleManagerLogin = () => history.push('/manager-dashboard')

    return (
        <div>
             {isError ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : facilityData ? (
                    <Grid   container
                            justifyContent="center"
                            direction="column"
                            alignItems="center"
                            spacing={2}>
                        <Grid item>
                            <Typography variant="h4" >
                                {facilityData.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {facilityData.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleUserLogin}>User Login</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleManagerLogin}>Manager Login</Button>
                        </Grid>
                    </Grid>
                ) : null}

        </div>
    )
}

import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetFacilityByIdQuery, useGetResourcesByFacilityIdQuery } from '../../services/api';
import { facilityUpdated, currentResourceUpdated } from '../../features/current-facility/currentFacilitySlice';
import { useAuth } from '../../hooks/useAuth'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { showSnackbar } from '../../features/ui/uiSlice';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
    tableRow: {
        cursor: 'pointer',
    }
});

const FacilityLogin = () => {
    const { id } = useParams()
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useAuth()

    const { data: facilityData, facilityIsError, facilityIsLoading } = useGetFacilityByIdQuery(id)
    const { data: resourcesData, resourcesIsError, resourcesIsLoading } = useGetResourcesByFacilityIdQuery(id)

    useEffect(() => {
        dispatch(facilityUpdated(facilityData))
    }, [facilityData, dispatch])

    const handleUserLogin = () => history.push(`/user-dashboard`)

    const handleRowClick = (event, resourceId) => {
        if (user) {
            dispatch(currentResourceUpdated(resourceId))
            history.push(`/user-dashboard`)
        } else {
            dispatch(showSnackbar({
                message: 'Please log in to access schedules',
                severity: 'error'
              }))
        }
    }

    return (
        <div>
             {facilityIsError || resourcesIsError ? (
                    <>Oh no, there was an error</>
                ) : facilityIsLoading || resourcesIsLoading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : facilityData && resourcesData? (
                    <Grid   container
                            justifyContent="center"
                            direction="column"
                            alignItems="center"
                            spacing={4}>
                        <Grid item>
                            <Typography variant="h4" >
                                {facilityData.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" align="center">
                                {facilityData.description}
                            </Typography>
                        </Grid>

                        <Grid item>
                        { resourcesData.length ?
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Resource</TableCell>
                                        <TableCell align="center">Description</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {resourcesData.map((resource) => (
                                        <TableRow className={classes.tableRow} key={resource.id} onClick={event => handleRowClick(event, resource.id)}>
                                            <TableCell align="center">{resource.name}</TableCell>
                                            <TableCell align="center">{resource.description}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        :
                            <Typography variant="body1" align="center">
                                This facility does not have any resources.
                            </Typography>
                        }
                        </Grid>
                        
                        <Grid item>
                            { user ?
                            <Button data-testid='go-to-scheduling' variant="contained" color="secondary" onClick={handleUserLogin}>Go To Scheduling</Button>
                            :
                            <Typography variant="h5" align="center">
                                Please log in to access club schedules.
                            </Typography>
                            }
                        </Grid>
                    </Grid>
                ) : null }
        </div>
    )
}

export default FacilityLogin

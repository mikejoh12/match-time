import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useEffect } from 'react'
import { selectAllFacilities } from '../../features/facilities/facilitiesSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const ManagerDashboard = () => {
    const dispatch = useDispatch()
    const facilities = useSelector(selectAllFacilities)
    const history = useHistory()

    
    const handleFacilityClick = () => history.push('/manager-facility-edit')

    useEffect(() => {
        console.log('Fetch facilities for user') // TODO
      }, [dispatch])

    const managerFacilities = facilities.map(facility => 
        <ListItem onClick={handleFacilityClick}>
            {facility.name}
        </ListItem>)

    return (
        <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center">
            <Grid item>
                <Typography variant="h2" >
                    Manager Dashboard
                </Typography>
            </Grid>
            <Grid item>
                    <List component="nav" aria-label="user bookings">
                        {managerFacilities}
                    </List>
            </Grid>
        </Grid>
      )
  }
  
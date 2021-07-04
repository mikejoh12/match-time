import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { selectAllFacilities } from '../../features/facilities/facilitiesSlice';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AddFacilityDialog } from './AddFacilityDialog'

export const ManagerDashboard = () => {
    const facilities = useSelector(selectAllFacilities)
    const history = useHistory()
    
    const handleFacilityClick = event => history.push(`/manager-facility-edit/${event.target.value}`)

    const managerFacilities = facilities.map(facility => 
        <ListItem key={facility.id} value={facility.id} onClick={handleFacilityClick}>
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
            <Grid item>
              <AddFacilityDialog />
            </Grid>
        </Grid>
      )
  }
  
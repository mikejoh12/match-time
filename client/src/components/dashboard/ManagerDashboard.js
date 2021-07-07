import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { selectAllFacilities } from '../../features/facilities/facilitiesSlice';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AddFacilityDialog } from './AddFacilityDialog'

export const ManagerDashboard = () => {
    const facilities = useSelector(selectAllFacilities)
    const history = useHistory()
    
    const handleFacilityClick = event => history.push(`/manager-facility-edit/${event.currentTarget.getAttribute('value')}`)

    const managerFacilities = facilities.map(facility => 
        <ListItem key={facility.id} button value={facility.id} onClick={handleFacilityClick} divider>
            <ListItemText primary={facility.name} />
        </ListItem>)

    return (
        <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center">
            <Grid item>
                <Typography variant="h2" >
                    Manager Dashboard
                </Typography>
            </Grid>
            <Grid item>
                    { managerFacilities.length ?
                    <List component="nav" aria-label="manager facilities">
                        {managerFacilities}
                    </List>
                    :
                    <Typography variant="h6" >
                    You are not managing any facilities.
                    </Typography>  
                    }
            </Grid>
            <Grid item>
              <AddFacilityDialog />
            </Grid>
        </Grid>
      )
  }
  
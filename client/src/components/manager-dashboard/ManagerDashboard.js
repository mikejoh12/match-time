import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom'
import { AddFacilityDialog } from './dialogs/AddFacilityDialog'
import { useGetFacilitiesByUserQuery } from '../../services/api'
import CircularProgress from '@material-ui/core/CircularProgress';

export const ManagerDashboard = () => {
    const { data: facilitiesData, isError, isLoading } = useGetFacilitiesByUserQuery()
    const history = useHistory()
    
    const handleFacilityClick = event => history.push(`/manager-facility-edit/${event.currentTarget.getAttribute('value')}`)

    const managerFacilities = facilitiesData?.filter(facility => facility.is_admin).map(facility => 
        <ListItem key={facility.id} button value={facility.id} onClick={handleFacilityClick} divider>
            <ListItemText primary={facility.name} />
        </ListItem>)

    return (
        <div>
            {isError ? (
            <>Oh no, there was an error</>
            ) : isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : facilitiesData ? (
                <Grid   container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                    <Grid item>
                        <Typography variant="h4" align="center">
                            Manager Dashboard
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" align="center">
                            You are managing the following facilities. Select a facility to edit or add a new facility.
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
            ) : null}
      </div>

      )
  }
  
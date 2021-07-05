import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { selectResources, fetchResources } from '../../features/resources/resourcesSlice'
import { fetchFacility, selectFacility } from '../../features/facilities/facilitiesSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AddResourceDialog } from './AddResourceDialog';

export const ManagerFacilityEdit = () => {
    const resources = useSelector(selectResources)
    const dispatch = useDispatch()
    const { id } = useParams()
    const facility = useSelector(selectFacility)

    useEffect(() => {
        dispatch(fetchResources(id))
        dispatch(fetchFacility(id))
      }, [id, dispatch])

    const facilityResources = resources.map(resource => 
        <ListItem key={resource.id} divider>
            <ListItemText primary={`Id: ${resource.id} Name: ${resource.name} Description: ${resource.description}`} />
        </ListItem>)

    return (
        <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center">
            <Grid item>
                <Typography variant="h5" >
                    Edit Facility
                </Typography>              
            </Grid>
            <Grid item>
                <Typography variant="h6" >
                    Name: {facility.name}
                </Typography>              
            </Grid>
            <Grid item>
                <Typography variant="h6" >
                    Description: {facility.description}
                </Typography>              
            </Grid>
            <Grid item>
                    <List component="nav" aria-label="user bookings">
                        {facilityResources}
                    </List>
            </Grid>
            <Grid item>
              <AddResourceDialog facilityId={id} />
            </Grid>
        </Grid>
      )
  }
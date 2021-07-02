import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { selectResources, fetchResources } from '../../features/resources/resourcesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const ManagerFacilityEdit = () => {
    const resources = useSelector(selectResources)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResources(1)) // TODO Remove hardcoded id
      }, [dispatch])

    const facilityResources = resources.map(resource => <ListItem>
        {resource.name}
        </ListItem>)

    return (
        <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center">
            <Grid item>
                <Typography variant="h2" >
                    Edit Facility
                </Typography>
            </Grid>
            <Grid item>
                    <List component="nav" aria-label="user bookings">
                        {facilityResources}
                    </List>
            </Grid>
        </Grid>
      )
  }
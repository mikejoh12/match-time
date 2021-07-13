import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { selectResources, fetchResources, deleteResource } from '../../features/resources/resourcesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AddResourceDialog } from './AddResourceDialog';
import { DeleteFacilityDialog } from './DeleteFacilityDialog';
import { useGetFacilityByIdQuery } from '../../services/api'

export const ManagerFacilityEdit = () => {
    const resources = useSelector(selectResources)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { data, isError, isLoading } = useGetFacilityByIdQuery(id)
    const facility = data

    useEffect(() => {
        dispatch(fetchResources(id))
        //dispatch(fetchFacility(id))
      }, [id, dispatch])

    const handleDeleteClick = event => dispatch(deleteResource(event.currentTarget.value))

    const facilityResources = resources.map(resource => 
        <ListItem key={resource.id} divider>
            <ListItemText primary={`Name: ${resource.name} - Description: ${resource.description}`} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" value={resource.id} onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>)

    return (
        <div>
            {isError ? (
            <>Oh no, there was an error</>
            ) : isLoading ? (
            <>Loading...</>
            ) : data ? (
                <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center">
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
                    <Grid item>
                    <DeleteFacilityDialog facilityId={id} />
                    </Grid>
                </Grid>
            ) : null}
      </div>

      )
  }
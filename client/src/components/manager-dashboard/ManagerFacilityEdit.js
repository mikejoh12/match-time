import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom'
import { AddResourceDialog } from './AddResourceDialog';
import { InviteMembersDialog } from './InviteMembersDialog';
import { DeleteFacilityDialog } from './DeleteFacilityDialog';
import { useGetFacilityByIdQuery } from '../../services/api'
import { useGetResourcesByFacilityIdQuery, useDeleteResourceMutation } from '../../services/api'
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../features/ui/uiSlice';

export const ManagerFacilityEdit = () => {
    const { id } = useParams()
    const { data: facilityData, isError: facilityIsError, isLoading: facilityIsLoading } = useGetFacilityByIdQuery(id)
    const { data: resourcesData, isError: resourcesIsError, isLoading: resourcesIsLoading } = useGetResourcesByFacilityIdQuery(id)
    const [ deleteResource ] = useDeleteResourceMutation()
    const dispatch = useDispatch()

    const handleDeleteClick = async event => {
        try {
            await deleteResource({
                id,
                resource_id: event.currentTarget.value
            })
            dispatch(showSnackbar({
                message: `Resource deleted`,
                severity: 'success'
            }))
        } catch (err) {
            dispatch(showSnackbar({
                message: err.data.error,
                severity: 'error'
              }))
        }
    }

    return (
        <div>
            {facilityIsError || resourcesIsError? (
            <>Oh no, there was an error</>
            ) : facilityIsLoading || resourcesIsLoading? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : facilityData && resourcesData? (
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
                            Name: {facilityData.name}
                        </Typography>              
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" >
                            Description: {facilityData.description}
                        </Typography>              
                    </Grid>
                    <Grid item>
                            <List component="nav" aria-label="user bookings">
                                {resourcesData.map(resource => 
                                    <ListItem key={resource.id} divider>
                                        <ListItemText primary={`Name: ${resource.name} - Description: ${resource.description}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" value={resource.id} onClick={handleDeleteClick}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)}
                            </List>
                    </Grid>
                    <Grid item>
                        <AddResourceDialog facilityId={id} />
                    </Grid>
                    <Grid item>
                        <InviteMembersDialog />
                    </Grid>
                    <Grid item>
                        <DeleteFacilityDialog facilityId={id} />
                    </Grid>
                </Grid>
            ) : null}
      </div>
      )
  }
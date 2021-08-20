import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams, useHistory } from 'react-router-dom'
import { AddResourceDialog } from './AddResourceDialog';
import { InviteMembersDialog } from './InviteMembersDialog';
import { DeleteFacilityDialog } from './DeleteFacilityDialog';
import { useGetFacilityByIdQuery, useGetResourcesByFacilityIdQuery } from '../../services/api'
import { useDispatch } from 'react-redux';
import { openDeleteResourceDialog } from '../../features/ui/uiSlice';
import { DeleteResourceDialog } from './DeleteResourceDialog';

export const ManagerFacilityEdit = () => {
    const { id } = useParams()
    const { data: facilityData, isError: facilityIsError, isLoading: facilityIsLoading } = useGetFacilityByIdQuery(id)
    const { data: resourcesData, isError: resourcesIsError, isLoading: resourcesIsLoading } = useGetResourcesByFacilityIdQuery(id)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDeleteClick = async event => dispatch(openDeleteResourceDialog(event.currentTarget.value))
    const handleMembersClick = () => history.push(`/manager-facility-edit/${id}/members`)

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
                        <Typography variant="h6" >
                            Club Login URL: http://localhost:3000/{facilityData.id}
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

                    <Button variant="outlined" color="primary" onClick={handleMembersClick}>
                        Members / Invitations
                    </Button>

                    <Grid item>
                        <InviteMembersDialog facilityId={id} />
                    </Grid>

                    <Grid item>
                        <AddResourceDialog facilityId={id} />
                    </Grid>

                    <Grid item>
                        <DeleteFacilityDialog facilityId={id} />
                    </Grid>
                    <Grid item>
                        <DeleteResourceDialog facilityId={id} />
                    </Grid>
                </Grid>
            ) : null}
      </div>
      )
  }
import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { selectBookingsByUser, fetchBookingsByUser, deleteBooking } from '../../features/bookings/bookingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { selectAllFacilities } from '../../features/facilities/facilitiesSlice';

export const Bookings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(selectBookingsByUser);
    const facilities = useSelector(selectAllFacilities)

    React.useEffect(() => {
        dispatch(fetchBookingsByUser(1))
      }, [dispatch])

    const handleDeleteClick = (event) => dispatch(deleteBooking(event.currentTarget.value))

    const userBookings = bookings.map(booking => {
                            const date = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'MM/dd/yyyy')
                            const startTime = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'p')
                            const endTime = format(utcToZonedTime(new Date(booking.end_time), 'UTC'), 'p')
                            const facilityName = facilities.find(facility => facility.id === booking.facilities_id).name
                            return  <ListItem key={booking.bookings_id}>
                                        <ListItemText primary={`Facility: ${facilityName} - Booking Id: ${booking.bookings_id} - Name: ${booking.resources_name} - Date: ${date} - Start: ${startTime} - End: ${endTime}` }/>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" value={booking.bookings_id} onClick={handleDeleteClick}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>}
                            )

    return (
        <div>
            <Grid   container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                <Grid item>
                    { userBookings.length ?
                    <List component="nav" aria-label="user bookings">
                        {userBookings}
                    </List>
                    :
                    <Typography variant="h5" >
                        No bookings found.
                    </Typography>     
                    }
                </Grid>
            </Grid>
        </div>
    );
}
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { selectBookingsByUser, fetchBookingsByUser, deleteBooking } from '../../features/bookings/bookingsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Grid from "@material-ui/core/Grid";


export const Settings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector(selectBookingsByUser);

    React.useEffect(() => {
        dispatch(fetchBookingsByUser(1))
      }, [dispatch])

    const handleDeleteClick = (event) => {
        console.log(event.currentTarget.value)
        dispatch(deleteBooking(event.currentTarget.value))
    }

    const userBookings = bookings.map(booking =>
                            <ListItem key={booking.bookings_id}>
                                <ListItemText primary={`Id: ${booking.bookings_id} Court: ${booking.resources_id} Start time: ${booking.start_time}` }/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" value={booking.bookings_id} onClick={handleDeleteClick}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>)

    return (
        <div>
            <Grid   container
                    justify="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                <Grid item>
                    <List component="nav" aria-label="user bookings">
                        {userBookings}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}
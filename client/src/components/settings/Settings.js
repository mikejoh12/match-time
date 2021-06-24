import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { selectBookings } from '../../features/bookings/bookingsSlice';
import { useSelector } from 'react-redux';
import Grid from "@material-ui/core/Grid";

export const Settings = () => {
    const bookings = useSelector(selectBookings);

    const userBookings = bookings[1].concat(bookings[2]).concat(bookings[3]).concat(bookings[4])
                        .filter(booking => booking.organizer_id === 1)
                        .map(booking =>
                            <ListItem key={booking.bookings_id}>
                                <ListItemText primary={`Court: ${booking.resources_id} Start time: ${booking.start_time}` }/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => console.log('Delete')}>
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
                    <List component="nav" aria-label="main mailbox folders">
                        {userBookings}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}
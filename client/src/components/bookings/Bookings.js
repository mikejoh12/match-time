import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useGetFacilitiesByUserQuery, useGetBookingsByUserQuery, useDeleteBookingMutation } from '../../services/api'

export const Bookings = () => {
    const { data: facilitiesData, isError: facilitiesIsError, isLoading: facilitiesIsLoading } = useGetFacilitiesByUserQuery()
    const { data: bookingsData, isError: bookingsIsError, isLoading: bookingsIsLoading } = useGetBookingsByUserQuery()

    const [ deleteBooking ] = useDeleteBookingMutation()

    const handleDeleteClick = (event) => deleteBooking(event.currentTarget.value)

    return (
        <div className="App">
            {facilitiesIsError || bookingsIsError? (
            <>Oh no, there was an error</>
            ) : facilitiesIsLoading || bookingsIsLoading? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : facilitiesData && bookingsData? (
                <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                spacing={2}>
                    <Grid item>
                        { bookingsData.length ?
                        <List component="nav" aria-label="user bookings">
                            {
                            bookingsData.map(booking => {
                                const date = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'MM/dd/yyyy')
                                const startTime = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'p')
                                const endTime = format(utcToZonedTime(new Date(booking.end_time), 'UTC'), 'p')
                                const facilityName = facilitiesData.find(facility => facility.id === booking.facilities_id)?.name
                                return  <ListItem key={booking.bookings_id}>
                                            <ListItemText primary={`Facility: ${facilityName} - Booking Id: ${booking.bookings_id} - Name: ${booking.resources_name} - Date: ${date} - Start: ${startTime} - End: ${endTime}` }/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" value={booking.bookings_id} onClick={handleDeleteClick}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>}
                            )}
                        </List>
                        :
                        <Typography variant="h5" >
                            No bookings found.
                        </Typography>     
                        }
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}
import React from 'react';
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { openDeleteBookingDialog } from '../../features/ui/uiSlice';
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useGetFacilitiesByUserQuery, useGetBookingsByUserQuery } from '../../services/api'
import { DeleteBookingDialog } from './DeleteBookingDialog';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 20,
    },
    cardContent: {
        padding: 5
    },
    actions: {
        padding: 5,
        justifyContent: 'center'
    },
});

export const Bookings = () => {
    const { data: facilitiesData, isError: facilitiesIsError, isLoading: facilitiesIsLoading } = useGetFacilitiesByUserQuery()
    const { data: bookingsData, isError: bookingsIsError, isLoading: bookingsIsLoading } = useGetBookingsByUserQuery()

    const classes = useStyles()
    const dispatch = useDispatch();

    const handleDeleteClick = async event => dispatch(openDeleteBookingDialog(event.currentTarget.value))

    return (
        <div>
            {facilitiesIsError || bookingsIsError? (
            <>Oh no, there was an error</>
            ) : facilitiesIsLoading || bookingsIsLoading? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : facilitiesData && bookingsData? (
                <Grid
                container
                item
                direction="column"
                alignItems="center">
                    <Grid>
                        <Typography variant="h4" >
                            Bookings
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" >
                            List of bookings for your account.
                        </Typography>
                    </Grid>
                    <Grid>
                        { bookingsData.length ?

                                bookingsData.map(booking => {
                                    const date = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'MM/dd/yyyy')
                                    const startTime = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'p')
                                    const endTime = format(utcToZonedTime(new Date(booking.end_time), 'UTC'), 'p')
                                    const facilityName = facilitiesData.find(facility => facility.id === booking.facilities_id)?.name

                                    return (
                                        <Card className={classes.root} key={booking.bookings_id}>
                                            <CardContent className={classes.cardContent}>
                                                <Typography variant="h6" className={classes.title} color="textSecondary" align="center">
                                                    Facility: {facilityName}
                                                </Typography>
                                                <Typography variant="body1" align="center">
                                                    Resource: {booking.resources_name}
                                                </Typography>
                                                <Typography variant="body1" align="center">
                                                    {date}
                                                </Typography>
                                                <Typography variant="body1" align="center">
                                                    {startTime}-{endTime}
                                                </Typography>
                                            </CardContent>
                                            <CardActions className={classes.actions}>
                                                <IconButton className={classes.icons} size="small" aria-label="delete" value={booking.bookings_id} onClick={handleDeleteClick}>
                                                    <DeleteIcon />
                                                </IconButton> 
                                            </CardActions>
                                        </Card>
                                    )}
                                )
                        :
                        <Typography variant="h5" >
                            No bookings found.
                        </Typography>     
                        }
                    </Grid>
                    <Grid item>
                        <DeleteBookingDialog />
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}
import React from 'react';
import { useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { openDeleteBookingDialog } from '../../features/ui/uiSlice';
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useGetFacilitiesByUserQuery, useGetBookingsByUserQuery } from '../../services/api'
import { DeleteBookingDialog } from './DeleteBookingDialog';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    }
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
                justifyContent="center"
                direction="column"
                alignItems="center"
                spacing={2}>
                    <Grid item>
                        { bookingsData.length ?
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Facility</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Date</TableCell>                                    
                                        <TableCell align="center">Start</TableCell>
                                        <TableCell align="center">End</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                bookingsData.map(booking => {
                                    const date = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'MM/dd/yyyy')
                                    const startTime = format(utcToZonedTime(new Date(booking.start_time), 'UTC'), 'p')
                                    const endTime = format(utcToZonedTime(new Date(booking.end_time), 'UTC'), 'p')
                                    const facilityName = facilitiesData.find(facility => facility.id === booking.facilities_id)?.name
                                    return  (
                                            <TableRow key={booking.bookings_id}>
                                                <TableCell component="th" scope="row">
                                                    {booking.bookings_id}
                                                </TableCell>
                                                <TableCell align="right">{facilityName}</TableCell>
                                                <TableCell align="right">{booking.resources_name}</TableCell>
                                                <TableCell align="right">{date}</TableCell>
                                                <TableCell align="right">{startTime}</TableCell>
                                                <TableCell align="right">{endTime}</TableCell>
                                                <TableCell align="right">
                                                        <IconButton edge="end" aria-label="delete" value={booking.bookings_id} onClick={handleDeleteClick}>
                                                            <DeleteIcon />
                                                        </IconButton> 
                                                </TableCell>
                                            </TableRow>
                                )}
                                )}
                                </TableBody>
                            </Table>
                         </TableContainer>
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
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { showSnackbar } from '../../features/ui/uiSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import { KeyboardTimePicker } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import addMinutes from 'date-fns/addMinutes'
import { useCreateBookingMutation, useGetResourcesByFacilityIdQuery } from '../../services/api';
import { closeBookDialog, selectBookDialogOpen } from '../../features/ui/uiSlice';
import {  selectBookingDuration, bookingDurationUpdated,
          selectBookingDate, bookingDateUpdated,
          selectBookingSelectedResource, bookingSelectedResourceUpdated,
          selectFacility } from '../../features/current-facility/currentFacilitySlice';
import { useAuth } from '../../hooks/useAuth'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const BookDialog = ({ handleClickOpen, handleClose }) => {
  const dispatch = useDispatch();
  const facility = useSelector(selectFacility)
  const bookDialogOpen = useSelector(selectBookDialogOpen)
  const bookingDuration = useSelector(selectBookingDuration)
  const bookingDate = utcToZonedTime(new Date(useSelector(selectBookingDate)), 'UTC')
  const bookingSelectedResource = useSelector(selectBookingSelectedResource)
  const classes = useStyles()
  const { user } = useAuth()

  const [ createBooking ] = useCreateBookingMutation()
  const { data: resourcesData } = useGetResourcesByFacilityIdQuery(facility.id)


  const handleBookingResourceChange = event => dispatch(bookingSelectedResourceUpdated(event.target.value))
  const handleBookingDateChange = date => dispatch(bookingDateUpdated(zonedTimeToUtc(date, 'UTC').toISOString()))
  const handleBookingDurationChange = event => dispatch(bookingDurationUpdated(event.target.value))

  const handleCloseBook = async () => {
    const endTime = addMinutes(bookingDate, bookingDuration)
    const utcStartTime = zonedTimeToUtc(bookingDate, 'UTC').toISOString()
    const utcEndTime = zonedTimeToUtc(endTime, 'UTC').toISOString()
    try {
      await createBooking({
        resourceId: bookingSelectedResource,
        organizerId: user.id,
        startTime: utcStartTime,
        endTime: utcEndTime
      }).unwrap()
      dispatch(showSnackbar({
        message: `Booking created successfully`,
        severity: 'success'
      }))
    } catch (err) {
      dispatch(showSnackbar({
        message: err.data.error,
        severity: 'error'
      }))
    } finally {
      dispatch(closeBookDialog())
    }
  }

  return (
    <div>
      <Button data-testid='open-book-dialog' variant="contained" color="secondary" onClick={handleClickOpen}>
        Book a Court
      </Button>
      <Dialog open={bookDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" align="center">Book a Court</DialogTitle>
        <DialogContent>
            <Grid     container
                      direction="column"
                      alignItems="center">
              <FormControl className={classes.formControl}>
              <InputLabel id="court-label">Select Court:</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bookingSelectedResource}
                  onChange={handleBookingResourceChange}
                  >
                      {
                          resourcesData.map(resource =>
                              <MenuItem value={resource.id} key={resource.id}>{resource.name}</MenuItem>)
                      }
                  </Select>
              </FormControl>
                  <InputLabel id="date-label">Select Date:</InputLabel>
                  <DatePicker
                      disableToolbar
                      variant="inline"
                      value={bookingDate}
                      onChange={handleBookingDateChange}/>
                  <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time"
                      minutesStep={30}
                      value={bookingDate}
                      onChange={handleBookingDateChange}
                      KeyboardButtonProps={{
                          'aria-label': 'change time',
                      }}
                  />
              <InputLabel id="court-label">Duration:</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bookingDuration}
                  onChange={handleBookingDurationChange}
                  >

                              <MenuItem value={30} key={30}>30 min</MenuItem>
                              <MenuItem value={60} key={60}>1 hr</MenuItem>
                              <MenuItem value={90} key={90}>1 hr 30 min</MenuItem>
                              <MenuItem value={120} key={120}>2 hrs</MenuItem>
                </Select>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button data-testid='book-court-submit' onClick={handleCloseBook} color="primary">
            Book Court
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

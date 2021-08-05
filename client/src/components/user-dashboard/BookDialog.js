import React from 'react';
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../features/ui/uiSlice';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/date-fns";
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import { 
    MuiPickersUtilsProvider,
    KeyboardTimePicker } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import addMinutes from 'date-fns/addMinutes'
import { useCreateBookingMutation } from '../../services/api';
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

export const BookDialog = ({ resources, calViewDate, resourceInView }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(utcToZonedTime(new Date(calViewDate), 'UTC'))
  const [selectedResource, setSelectedResource] = React.useState(resourceInView)
  const [duration, setDuration] = React.useState(60)
  const classes = useStyles()
  const { user } = useAuth()

  const [ createBooking ] = useCreateBookingMutation()

  const handleClickOpen = () => {
    setSelectedResource(resourceInView)
    setSelectedDate(utcToZonedTime(new Date(calViewDate)))
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseBook = () => {
    const endTime = addMinutes(selectedDate, duration)
    const utcStartTime = zonedTimeToUtc(selectedDate, 'UTC').toISOString()
    const utcEndTime = zonedTimeToUtc(endTime, 'UTC').toISOString()
    try {
      createBooking({
        resources_id: selectedResource,
        organizer_id: user.id,
        start_time: utcStartTime,
        end_time: utcEndTime
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
      setOpen(false)
    }
  }

  const handleResourceChange = event => setSelectedResource(event.target.value)
  const handleDateChange = date => setSelectedDate(date)
  const handleDurationChange = event => setDuration(event.target.value)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Book a Court
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                  value={selectedResource}
                  onChange={handleResourceChange}
                  >
                      {
                          resources.map(resource =>
                              <MenuItem value={resource.id} key={resource.id}>{resource.name}</MenuItem>)
                      }
                  </Select>
              </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <InputLabel id="date-label">Select Date:</InputLabel>
                  <DatePicker
                      disableToolbar
                      variant="inline"
                      value={selectedDate}
                      onChange={handleDateChange}/>
                  <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                          'aria-label': 'change time',
                      }}
                  />
              </MuiPickersUtilsProvider>
              <InputLabel id="court-label">Duration:</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={duration}
                  onChange={handleDurationChange}
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
          <Button onClick={handleCloseBook} color="primary">
            Book Court
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

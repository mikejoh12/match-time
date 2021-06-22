import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from "@date-io/date-fns";
import { zonedTimeToUtc } from 'date-fns-tz'
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
import { useSelector, useDispatch } from "react-redux";
import { selectResources } from '../../features/resources/resourcesSlice';
import { createBooking } from '../../features/bookings/bookingsSlice';
import addMinutes from 'date-fns/addMinutes'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const BookDialog = props => {
  const dispatch = useDispatch()
  const resources = useSelector(selectResources)
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(props.calViewDate)
  const [selectedResource, setSelectedResource] = React.useState(props.resourceInView)
  const [duration, setDuration] = React.useState(60)
  const classes = useStyles()

  const handleClickOpen = () => {
    setSelectedResource(props.resourceInView)
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseBook = () => {
    const endTime = addMinutes(new Date(selectedDate), duration)
    const utcStartTime = zonedTimeToUtc(selectedDate, 'UTC').toISOString()
    const utcEndTime = zonedTimeToUtc(endTime, 'UTC').toISOString()
    dispatch(createBooking({
        resources_id: selectedResource,
        organizer_id: 1, // TODO: Connect to logged in User
        start_time: utcStartTime,
        end_time: utcEndTime
    }))
    setOpen(false)
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
                      minutesStep={30}
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
                              <MenuItem value={60} key={30}>1 hr</MenuItem>
                              <MenuItem value={90} key={30}>1 hr 30 min</MenuItem>
                              <MenuItem value={120} key={30}>2 hrs</MenuItem>
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

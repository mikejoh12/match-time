import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { calViewDateUpdated, selectCalViewDate } from '../../features/bookings/bookingsSlice';
import { useSelector, useDispatch } from 'react-redux';

export const CalDatePicker = () => {

  const dispatch = useDispatch()

  const handleDateChange = (date) => {
    dispatch(calViewDateUpdated(date.toISOString()))
    console.log(`Selected date: ${date.toISOString()}`)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select date:"
          value={new Date(useSelector(selectCalViewDate))}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
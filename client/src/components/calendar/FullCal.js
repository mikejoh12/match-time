import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings, selectFetchBookingsStatus, selectCalViewDate, calViewDateUpdated, selectCourt, courtUpdated } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources, selectFetchResourcesStatus } from '../../features/resources/resourcesSlice'
import 'date-fns';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { roundToNearestMinutes, setHours } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BookDialog } from './BookDialog'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const FullCal = () => {
    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const resources = useSelector(selectResources)
    const bookings = useSelector(selectBookings)
    const fetchBookingsStatus = useSelector(selectFetchBookingsStatus)
    const calViewDate = useSelector(selectCalViewDate)
    const classes = useStyles()
    const court = useSelector(selectCourt)
    const fetchResourcesStatus = useSelector(selectFetchResourcesStatus)

    // Create a React ref to be able to access Full Calendar API to set dates from external code
    const calendarsRefs = useRef({})

    const handleDateChange = (date) => {

          dispatch(calViewDateUpdated(zonedTimeToUtc(roundToNearestMinutes(setHours(date, 10), { nearestTo: 30}),'UTC').toISOString()))
          // Use Full Calendar API to set date from external date picker for all rendered calendars
          Object.keys(calendarsRefs.current).forEach(key => {
            let calendarApi = calendarsRefs.current[key].getApi()
            calendarApi.gotoDate(date)
          })
    }

    useEffect(() => {
      dispatch(fetchBookings(facility.id))
      dispatch(fetchResources(facility.id))
    }, [facility, dispatch])

    // Set default calendar resource to view once resources are loaded
    useEffect(() => {
      if (resources.length) {
      dispatch(courtUpdated(resources[0].id))
      }
    }, [resources, dispatch])

    const handleChange = event => dispatch(courtUpdated(event.target.value))

    const calendars = resources.filter(resource => resource.id === court).map((resource, idx) => 
      <Grid container item
      xs={8}
      md={4}
      xl={2}
      direction="column"
      alignItems="center"
      key={resource.id}>
        <Grid item>
          <Typography variant="h5" >
          {resource.name}
          </Typography>
        </Grid>
        <Grid item>
          <FullCalendar
            ref={element => (calendarsRefs.current[idx] = element)}
            plugins={[ timeGridPlugin ]}
            headerToolbar={{
              left: '',
              center: 'title',
              right: ''
            }}
            allDaySlot={false}
            timeZone="UTC"
            initialView="timeGridDay"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            height="auto"
            initialDate={calViewDate}
            events={ 
              bookings[resource.id]?.map(booking => ({
              id: booking.bookings_id,
              title: `Booked by user: ${booking.organizer_id}`,
              start: booking.start_time,
              end: booking.end_time
            }))} />
          </Grid>
        </Grid>
        )
 
    return (
      <div>
        {(fetchBookingsStatus === 'succeeded' && fetchResourcesStatus === 'succeeded' && court) &&  
            <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Select date:"
                  value={utcToZonedTime(calViewDate,'UTC')}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                      <form>
                      <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">Choose a court:</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={court}
                          onChange={handleChange}
                          >
                              {
                                  resources.map(resource =>
                                      <MenuItem value={resource.id} key={resource.id}>{resource.name}</MenuItem>)
                              }
                          </Select>
                      </FormControl>
                      </form>
            </Grid>
            <Grid item>
              <BookDialog resourceInView={court} calViewDate={calViewDate} />
            </Grid>
            <Grid container
                  justifyContent="center">
                  {calendars}
            </Grid>
          </Grid>
          }
          {
          (fetchBookingsStatus !== 'succeeded' || fetchResourcesStatus !== 'succeeded') &&
            <Grid container
                  justifyContent="center">
                <CircularProgress />
            </Grid>
          }
          {
            (fetchBookingsStatus === 'succeeded' && fetchResourcesStatus === 'succeeded' && !court) &&
            <Grid container
                  justifyContent="center">
                    <Typography variant="h6" >
                      This facility does not have any resources associated with it.
                    </Typography>  
            </Grid>
          }
      </div>
    )
}
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings, selectFetchBookingsStatus, selectCalViewDate, calViewDateUpdated } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'
import 'date-fns';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export const FullCal = () => {
    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const resources = useSelector(selectResources)
    const bookings = useSelector(selectBookings)
    const fetchBookingsStatus = useSelector(selectFetchBookingsStatus)
    const calViewDate = useSelector(selectCalViewDate)

    // Create a React ref to be able to access Full Calendar API to set dates from external code
    const calendarsRefs = useRef({})

    const handleDateChange = (date) => {
      dispatch(calViewDateUpdated(date.toISOString()))
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

    const calendars = resources.map((resource, idx) => 
      <FullCalendar
        ref={element => (calendarsRefs.current[idx] = element)}
        key={resource.id}
        plugins={[ timeGridPlugin ]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: ''
        }}
        allDaySlot={false}
        initialView="timeGridDay"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        height="auto"
        initialDate={calViewDate.split('T', 1)[0]}
        events={ 
          bookings[resource.id]?.map(booking => ({
          id: booking.bookings_id,
          title: `Booked by user: ${booking.organizer_id}`,
          start: new Date(booking.start_time),
          end: new Date(booking.end_time)
        }))} />
        )
 
    return (
      <div style={{width: "300px", margin: "auto"}}>
        
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

        {fetchBookingsStatus === 'succeeded' ?
          calendars
          :
          <h1>Loading</h1>}
      </div>
    )
}
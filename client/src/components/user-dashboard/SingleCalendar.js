import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { bookingSelectedResourceUpdated, bookingDateUpdated, selectCalViewDate, selectCurrentResource } from '../../features/current-facility/currentFacilitySlice';
import { openBookDialog } from '../../features/ui/uiSlice';
import { utcToZonedTime } from 'date-fns-tz'

export const SingleCalendar = ({calendarsRefs, bookings, resource, idx}) => {
  const dispatch = useDispatch()
  const calViewDate = useSelector(selectCalViewDate)
  const currentResource = useSelector(selectCurrentResource)

  const handleDateClick = arg => {
    dispatch(bookingSelectedResourceUpdated(currentResource))
    dispatch(bookingDateUpdated(utcToZonedTime(new Date(arg.dateStr)).toISOString()))
    dispatch(openBookDialog())
  }

    return (
    <FullCalendar
    plugins={[ timeGridPlugin, interactionPlugin ]}
    ref={element => (calendarsRefs.current[idx] = element)}
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
    dateClick={handleDateClick}
    events={ 
      bookings[resource.id]?.map(booking => ({
      id: booking.bookings_id,
      title: `Booked by user: ${booking.first_name} ${booking.last_name}`,
      start: booking.start_time,
      end: booking.end_time
    }))} />
    )
}
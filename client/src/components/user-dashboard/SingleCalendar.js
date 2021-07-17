import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'

export const SingleCalendar = props => {
    return (
    <FullCalendar
    ref={element => (props.calendarsRefs.current[props.idx] = element)}
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
    initialDate={props.calViewDate}
    events={ 
      props.bookings[props.resource.id]?.map(booking => ({
      id: booking.bookings_id,
      title: `Booked by user: ${booking.organizer_id}`,
      start: booking.start_time,
      end: booking.end_time
    }))} />
    )
}
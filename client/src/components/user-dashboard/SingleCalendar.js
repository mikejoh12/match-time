import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

export const SingleCalendar = props => {

    return (
    <FullCalendar
    plugins={[ timeGridPlugin, interactionPlugin ]}
    ref={element => (props.calendarsRefs.current[props.idx] = element)}
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
    dateClick={props.handleDateClick}
    events={ 
      props.bookings[props.resource.id]?.map(booking => ({
      id: booking.bookings_id,
      title: `Booked by user: ${booking.first_name} ${booking.last_name}`,
      start: booking.start_time,
      end: booking.end_time
    }))} />
    )
}
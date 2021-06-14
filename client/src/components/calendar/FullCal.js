import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'

const renderEventContent = eventInfo => (
    <>
      <b>Reserved</b>
      <i>By user: {eventInfo.organizer_id}</i>
    </>)

export const FullCal = ({resources, bookings}) => {
  
    const resourceMap = resources.map(resource => ({
        resourceId: resource.id,
        resourceTitle: resource.name
    }))

    const events = bookings.map(booking => ({
        id: booking.id,
        title: `User id: ${booking.organizer_id}`,
        start: new Date(booking.start_time),
        end: new Date(booking.end_time),
    }))

    const calendars = resourceMap.map(resource => 
      <FullCalendar
        key={resource.resourceId}
        plugins={[dayGridPlugin, timeGridPlugin ]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: ''
        }}
        initialView="timeGridDay"
        height="auto"
        initialDate="2011-10-05"
        events={events} />
        )

    return (
      <div style={{width: "300px", margin: "auto"}}>
        {calendars}
      </div>
    )
}
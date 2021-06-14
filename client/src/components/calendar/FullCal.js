import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

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
        resourceId: booking.resources_id
    }))

    return ( 
    <div>
        <Calendar
        localizer={localizer}
        events={events}
        defaultView="day"
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1400 }}
        defaultDate={new Date(2011, 9, 5)}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        />
    </div>
    )
}
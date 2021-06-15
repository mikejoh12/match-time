import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'

export const FullCal = ({resources, bookings}) => {
  
    const resourceMap = resources.map(resource => ({
        resourceId: resource.id,
        resourceTitle: resource.name
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
        initialDate="2011-10-05" />
        )

    return (
      <div style={{width: "300px", margin: "auto"}}>
        {calendars}
      </div>
    )
}
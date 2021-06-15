import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'

export const FullCal = () => {
    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const resources = useSelector(selectResources)
    const bookings = useSelector(selectBookings)

    useEffect(() => {
      dispatch(fetchBookings(facility.id))
      dispatch(fetchResources(facility.id))
    }, [facility, dispatch])

    const calendars = resources.map(resource => 
      <FullCalendar
        key={resource.id}
        plugins={[ timeGridPlugin ]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: ''
        }}
        initialView="timeGridDay"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        height="auto"
        initialDate="2011-10-05"
        events={bookings[resource.id].map(booking => ({
          id: booking.bookings_id,
          title: `Booked by user: ${booking.organizer_id}`,
          start: new Date(booking.start_time),
          end: new Date(booking.end_time)
        })

        )} />
        )

    return (
      <div style={{width: "300px", margin: "auto"}}>
        {calendars}
      </div>
    )
}
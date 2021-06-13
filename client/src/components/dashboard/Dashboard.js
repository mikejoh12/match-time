import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'

export const Dashboard = () => {

    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const bookings = useSelector(selectBookings)
    const resources = useSelector(selectResources)

    useEffect(() => {
        dispatch(fetchBookings(facility.id))
        dispatch(fetchResources(facility.id))
    }, [facility, dispatch])

    return (
              <div>
                    <h1>Dashboard</h1>

                    <h2>Courts</h2>
                        {resources.map(resource => {
                            return <p key={resource.id}>
                                    {resource.name} / {resource.description}
                                    </p>
                        })}
                    <h2>Bookings</h2>
                        {bookings.map(booking => {
                            return <p key={booking.bookings_id}>
                                    {booking.start_time} / {booking.end_time} / {booking.resources_name} / Club id: {booking.facilities_id}
                                    </p>
                        })}
              </div>
      )
  }
  
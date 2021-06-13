import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'

export const UserDashboard = () => {

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
                    <h2>Dashboard</h2>

                    <h3>Courts</h3>
                        {resources.map(resource => {
                            return <p key={resource.id}>
                                    {resource.name} / {resource.description}
                                    </p>
                        })}
                    <h3>Bookings</h3>
                        {bookings.map(booking => {
                            return <p key={booking.bookings_id}>
                                    Start: {booking.start_time} / End: {booking.end_time} / Court: {booking.resources_name} / Organizer Id: {booking.organizer_id}
                                    </p>
                        })}
              </div>
      )
  }
  
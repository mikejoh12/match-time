import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"

export const Dashboard = () => {

    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const bookings = useSelector(selectBookings)

    useEffect(() => {
        dispatch(fetchBookings(facility.id))
    }, [facility, dispatch])

    return (
              <div>
                  <h1>Dashboard Page</h1>
                    {bookings.map(booking => {
                        return <p key={booking.bookings_id}>
                                {booking.start_time} / {booking.end_time} / {booking.resources_name} / Club id: {booking.facilities_id}
                                </p>
                    })
                        }
              </div>
      )
  }
  
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'
import { FullCal } from '../calendar/FullCal'

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
            <FullCal resources={resources} bookings={bookings}/>
      )
  }
  
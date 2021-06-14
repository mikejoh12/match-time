import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { fetchBookings, selectBookings } from "../../features/bookings/bookingsSlice"
import { selectFacility } from "../../features/facilities/facilitiesSlice"
import { fetchResources, selectResources } from '../../features/resources/resourcesSlice'
import { BigCal } from '../calendar/BigCal'
import { FullCal } from '../calendar/FullCal'

export const UserDashboard = () => {
    const { cal } = useParams()

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
                    { cal === 'big' ?
                    <BigCal resources={resources} bookings={bookings}/>
                    :
                    <FullCal resources={resources} bookings={bookings}/>
                    }
              </div>
      )
  }
  
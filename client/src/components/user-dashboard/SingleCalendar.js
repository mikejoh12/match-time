import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { bookingSelectedResourceUpdated, bookingDateUpdated, selectCalViewDate, selectCurrentResource, selectFacility } from '../../features/current-facility/currentFacilitySlice';
import { openBookDialog } from '../../features/ui/uiSlice';
import { utcToZonedTime } from 'date-fns-tz'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetBookingsByFacilityIdQuery, useGetResourcesByFacilityIdQuery } from '../../services/api';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

export const SingleCalendar = ({calendarsRefs, selectedResourceIdx}) => {
  const dispatch = useDispatch()
  const calViewDate = useSelector(selectCalViewDate)
  const currentResource = useSelector(selectCurrentResource)
  const facility = useSelector(selectFacility)

  const { data: bookingsData, isError: bookingsIsError, isLoading: bookingsIsLoading } = useGetBookingsByFacilityIdQuery(facility.id)
  const { data: resourcesData, isError: resourcesIsError, isLoading: resourcesIsLoading } = useGetResourcesByFacilityIdQuery(facility.id)


  const resource = resourcesData[selectedResourceIdx]

  const handleDateClick = arg => {
    dispatch(bookingSelectedResourceUpdated(currentResource))
    dispatch(bookingDateUpdated(utcToZonedTime(new Date(arg.dateStr)).toISOString()))
    dispatch(openBookDialog())
  }

    return (
      <Grid item
            container
            direction="column"
            alignItems="center">
        {(bookingsIsError || resourcesIsError) ? (
            <>Oh no, there was an error</>
        ) : (bookingsIsLoading || resourcesIsLoading) ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
        ) : (bookingsData && resourcesData.length && currentResource) ? (
          <Grid container item
          xs={8}
          md={4}
          xl={2}
          direction="column"
          alignItems="center"
          key={resource?.id}>
            <Grid item>
              <Typography variant="h5" >
              {resource?.name}
              </Typography>
            </Grid>
            <Typography variant="subtitle1" >
              {resource?.description}
              </Typography>
              <Grid item>
                  <FullCalendar
                      plugins={[ timeGridPlugin, interactionPlugin ]}
                      ref={element => (calendarsRefs.current[selectedResourceIdx] = element)}
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
                      initialDate={calViewDate}
                      dateClick={handleDateClick}
                      eventColor="rgba(20, 160, 140, 1)"
                      events={ 
                        bookingsData[resource.id]?.map(booking => ({
                        id: booking.bookings_id,
                        title: `Booked by user: ${booking.first_name} ${booking.last_name}`,
                        start: booking.start_time,
                        end: booking.end_time
                        }))} />
              </Grid>
          </Grid>
        ) : null}
    </Grid>
  )
}
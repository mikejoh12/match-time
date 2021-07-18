import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectCalViewDate, calViewDateUpdated, selectCourt, courtUpdated, selectFacility } from "../../features/current-facility/currentFacilitySlice"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { roundToNearestMinutes, setHours } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BookDialog } from './BookDialog'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Calendars } from './Calendars'
import { useGetBookingsByFacilityIdQuery, useGetResourcesByFacilityIdQuery } from '../../services/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const UserDashboard = () => {
    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const calViewDate = useSelector(selectCalViewDate)
    const court = useSelector(selectCourt)

    const classes = useStyles()
    const theme = useTheme();
    const nrOfCalendars = [true, useMediaQuery(theme.breakpoints.up('md')), useMediaQuery(theme.breakpoints.up('lg')), useMediaQuery(theme.breakpoints.up('xl'))];

    // Create a React ref to be able to access Full Calendar API to set dates from external code
    const calendarsRefs = useRef({})

    const { data: bookingsData, isError: bookingsIsError, isLoading: bookingsIsLoading } = useGetBookingsByFacilityIdQuery(facility.id)
    const { data: resourcesData, isError: resourcesIsError, isLoading: resourcesIsLoading } = useGetResourcesByFacilityIdQuery(facility.id)

    const handleDateChange = date => {
          dispatch(calViewDateUpdated(zonedTimeToUtc(roundToNearestMinutes(setHours(date, 10), { nearestTo: 30}),'UTC').toISOString()))
          // Use Full Calendar API to set date from external date picker for all rendered calendars
          Object.keys(calendarsRefs.current).forEach(key => {
            let calendarApi = calendarsRefs.current[key].getApi()
            calendarApi.gotoDate(date)
          })
    }

    // Set default calendar resource to view once resources are loaded
    useEffect(() => {
      if (resourcesData?.length) {
      dispatch(courtUpdated(resourcesData[0].id))
      }
    }, [resourcesData, dispatch])

    const handleChange = event => dispatch(courtUpdated(event.target.value))

    const selectedCourtIdx = resourcesData?.findIndex(resource => resource.id === court)
 
    return (
          <div>
                {(bookingsIsError || resourcesIsError) ? (
                    <>Oh no, there was an error</>
                ) : (bookingsIsLoading || resourcesIsLoading) ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (bookingsData && resourcesData && court) ? (
                  <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Select date:"
                        value={utcToZonedTime(calViewDate,'UTC')}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item>
                      <form>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Choose a court:</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={court}
                            onChange={handleChange}
                            >
                                {
                                    resourcesData.map(resource =>
                                        <MenuItem value={resource.id} key={resource.id}>{resource.name} - {resource.description}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                      </form>
                  </Grid>
                  <Grid item>
                        <BookDialog resourceInView={court}
                                    calViewDate={calViewDate}
                                    resources={resourcesData} />
                  </Grid>
                  <Grid container
                        justifyContent="center">
                        <Calendars  resources={resourcesData}
                                    selectedCourtIdx={selectedCourtIdx}
                                    nrOfCalendars={nrOfCalendars}
                                    bookings={bookingsData}
                                    calendarsRefs={calendarsRefs}
                                    calViewDate={calViewDate} />
                  </Grid>
                </Grid>
                ) : null}
        </div>
    )
}
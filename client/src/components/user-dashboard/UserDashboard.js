import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {  selectCalViewDate,
          calViewDateUpdated,
          selectCurrentResource,
          currentResourceUpdated,
          selectFacility,
          bookingDateUpdated,
          bookingSelectedResourceUpdated } from "../../features/current-facility/currentFacilitySlice"
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import { roundToNearestMinutes, setHours } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BookDialog } from './BookDialog'
import CircularProgress from '@material-ui/core/CircularProgress';
import { SingleCalendar } from './SingleCalendar'
import { useGetBookingsByFacilityIdQuery, useGetResourcesByFacilityIdQuery } from '../../services/api'
import { openBookDialog, closeBookDialog } from '../../features/ui/uiSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }  
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const UserDashboard = () => {
    const dispatch = useDispatch()
    const facility = useSelector(selectFacility)
    const calViewDate = useSelector(selectCalViewDate)
    const currentResource = useSelector(selectCurrentResource)

    const handleClickOpen = () => {
      dispatch(bookingSelectedResourceUpdated(currentResource))
      dispatch(bookingDateUpdated(utcToZonedTime(new Date(calViewDate)).toISOString()))
      dispatch(openBookDialog())
    }
    
    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        dispatch(closeBookDialog())
      }
    }

    const classes = useStyles()

    const { data: bookingsData, isError: bookingsIsError, isLoading: bookingsIsLoading } = useGetBookingsByFacilityIdQuery(facility.id)
    const { data: resourcesData, isError: resourcesIsError, isLoading: resourcesIsLoading } = useGetResourcesByFacilityIdQuery(facility.id)

    // Create a React ref to be able to access Full Calendar API to set dates from external code
    const calendarsRefs = useRef({})

    const handleDateChange = date => {
          dispatch(calViewDateUpdated(zonedTimeToUtc(roundToNearestMinutes(setHours(date, 10), { nearestTo: 30}),'UTC').toISOString()))
              // Use Full Calendar API to set date from external date picker for all rendered calendars (if rendering more than one)
              Object.keys(calendarsRefs.current).forEach(key => {
                let calendarApi = calendarsRefs.current[key].getApi()
                calendarApi.gotoDate(date)
              })
      }

    // Set default calendar resource to view once resources are loaded and no resource selected
    useEffect(() => {
      if (resourcesData?.length && !currentResource) {
      dispatch(currentResourceUpdated(resourcesData[0].id))
      }
    }, [resourcesData, currentResource, dispatch])

    const handleChange = event => dispatch(currentResourceUpdated(event.target.value))

    const selectedResourceIdx = resourcesData?.findIndex(resource => resource.id === currentResource)
 
    return (
          <div className={classes.root}>
                {(bookingsIsError || resourcesIsError) ? (
                    <>Oh no, there was an error</>
                ) : (bookingsIsLoading || resourcesIsLoading) ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (bookingsData && resourcesData.length && currentResource) ? (
                  <Grid container
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                    <Grid item>
                        <Typography variant="h5" align="center">
                            Scheduling - {facility.name}
                        </Typography>
                    </Grid>
                    <Grid item>

                    </Grid>
                  <Grid item>
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
                  </Grid>
                  <Grid item>
                      <form>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Selection:</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentResource}
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
                        <BookDialog 
                                    resources={resourcesData}
                                    handleClickOpen={handleClickOpen}
                                    handleClose={handleClose} />
                  </Grid>
                  <Grid container
                        justifyContent="center">
                        <SingleCalendar
                                    selectedResourceIdx={selectedResourceIdx}
                                    calendarsRefs={calendarsRefs} />
                  </Grid>
                </Grid>
                ) : (!resourcesData.length) ? (
                  <Grid   container
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center">
                  <Grid item>
                    <Typography variant="h5" >
                        This facility does not have any resources.
                    </Typography>
                  </Grid>
                </Grid>
                ) : null}
        </div>
    )
  }

export default UserDashboard
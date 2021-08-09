import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { SingleCalendar } from './SingleCalendar'

export const Calendars = props => {
        const resource = props.resources[props.selectedCourtIdx]
    return (
        <Grid container item
        xs={8}
        md={4}
        xl={2}
        direction="column"
        alignItems="center"
        key={resource.id}>
          <Grid item>
            <Typography variant="h5" >
            {resource.name}
            </Typography>
          </Grid>
          <Typography variant="subtitle1" >
            {resource.description}
            </Typography>
            <Grid item>
              <SingleCalendar bookings={props.bookings}
                              calendarsRefs={props.calendarsRefs}
                              calViewDate={props.calViewDate}
                              resource={resource} />
            </Grid>
          </Grid>
    )
}
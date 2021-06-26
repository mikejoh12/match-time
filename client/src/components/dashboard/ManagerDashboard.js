import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const ManagerDashboard = () => {

    return (
        <Grid   container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center">
            <Grid item>
                <Typography variant="h2" >
                    Manager Dashboard
                </Typography>
            </Grid>
        </Grid>
      )
  }
  
import { LandingLoggedIn } from "./LandingLoggedIn";
import { LandingNotLoggedIn } from './LandingNotLoggedIn'
import { useAuth } from '../../hooks/useAuth'
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    hero: {
        padding: '30px',
        margin: '40px'
    }
  });

export const Landing = () => {
    const { user } = useAuth()
    const classes = useStyles()

    return (
            <div>
                <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                        <Grid item>
                            <Paper className={classes.hero}>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                    >
                                    <Typography variant="h4" >
                                        Calendar Booking
                                    </Typography>
                                    <Typography variant="h6" align="center">
                                        A sports scheduling platform for both facility administrators and players
                                    </Typography>
                                    <Typography variant="body1" align="center">
                                        Instructions
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                {user ?
                    <LandingLoggedIn />
                    :
                    <LandingNotLoggedIn />
                }
                </Grid>
            </div>
    )
}

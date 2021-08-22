import { LandingLoggedIn } from "./LandingLoggedIn";
import { LandingNotLoggedIn } from './LandingNotLoggedIn'
import { useAuth } from '../../hooks/useAuth'
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    hero: {
        padding: '30px',
        margin: '10px'
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
                                    spacing={2}
                                    >
                                    <Typography variant="h4" >
                                        Calendar Booking
                                    </Typography>
                                    <Grid item>
                                        <Typography variant="h6" align="center">
                                            A scheduling platform for sports facility managers and players
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" align="center">
                                            - Manage sports facilities and add resources such as tennis courts or soccer fields.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" align="center">
                                            - Invite users to your facility and have them access the facilities landing page.
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1" align="center">
                                            - Users of the facility can book resources within the facilities where they are members.
                                        </Typography>
                                    </Grid>
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

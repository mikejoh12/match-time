import { LandingLoggedIn } from "./LandingLoggedIn";
import { LandingNotLoggedIn } from './LandingNotLoggedIn'
import { useAuth } from '../../hooks/useAuth'
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import { ImageCard } from "./ImageCard";
import tennisImage from '../../images/tennis-courts.jpg'

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
                                    
                                    <ImageCard tennisImage={tennisImage} />

                                    <List aria-label="site features">
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Manage sports facilities and add resources such as tennis courts or soccer fields." />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Invite users to your facility and have them access the facilities landing page." />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Users of the facility can book resources within the facilities where they are members" />
                                        </ListItem>
                                    </List>
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

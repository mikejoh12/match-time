import { useAuth } from '../../hooks/useAuth'
import { Paper, Grid, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import Container from '@material-ui/core/Container';
import { ImageCard } from "./ImageCard";
import tennisImage from '../../images/deva-darshan-b2ET6ZIDFBo-unsplash.jpg'
import courtsImage from '../../images/leslie-wong-yoIt3Wxe0sI-unsplash.jpg'
import { SelectFacility } from "../select-facility/SelectFacility";

const useStyles = makeStyles({
    hero: {
        padding: '30px',
        margin: '10px',
    }
  });

const Landing = () => {
    const { user } = useAuth()
    const classes = useStyles()

    const theme = useTheme();
    const showSecondImg = useMediaQuery(theme.breakpoints.up('md'))

    return (
            <>
                <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}>
                        <Grid item>
                            <Container maxWidth="md">
                            <Paper className={classes.hero} elevation={5}>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                    spacing={2}
                                    >
                                    <Grid item>
                                        <Typography variant="h6" align="center">
                                            A demo scheduling platform for sports facility managers and players
                                        </Typography>
                                    </Grid>
                                    
                                    <Grid
                                        item
                                        container
                                        justifyContent="center"
                                        direction="row"
                                        spacing={2} >
                                            <Grid item>
                                                <ImageCard image={tennisImage} />
                                            </Grid>
                                            { showSecondImg &&
                                            <Grid item>
                                                <ImageCard image={courtsImage} />
                                            </Grid>
                                            }
                                    </Grid>

                                    <Grid   item
                                            container
                                            direction="column">
                                        <Grid item>
                                            <Typography variant="h6" align="center">
                                                Managers:
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <List aria-label="manager features">
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
                                                    <ListItemText primary="Get a unique Internet URL address for your facility and link to it." />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Invite users by email to join your facility." />
                                                </ListItem>
                                            </List>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="h6" align="center">
                                                Club Members:
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <List aria-label="member features">
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Users who are members of the facility can book online and cancel bookings." />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="You can be a member of facilities while at the same time being a managing of facilities where you have management access." />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </Container>
                        </Grid>
                {user && <SelectFacility /> }
                </Grid>
            </>
    )
}

export default Landing
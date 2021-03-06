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
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    hero: {
        [theme.breakpoints.down('md')]: {
            padding: '5px',
            margin: '0px',
            },
        [theme.breakpoints.up('md')]: {
        padding: '40px',
        margin: '10px',
        },
    },
    icons: {
        [theme.breakpoints.down('md')]: {
            width: 20,
            height: 20
          },
          [theme.breakpoints.up('md')]: {
            width: 25,
            height: 25
          },
          [theme.breakpoints.up('lg')]: {
            width: 30,
            height: 30
          },
    },
  }));

const Landing = () => {
    const { user } = useAuth()
    const classes = useStyles()

    const theme = useTheme();
    const showSecondImg = useMediaQuery(theme.breakpoints.up('md'))

    const demoLinkPath = process.env.NODE_ENV === 'production' ? '/facilities/1' : '/facilities/2'

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
                                    spacing={4}
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
                                                Facility Members:
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <List aria-label="member features">
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Users who are members of a facility can book online and cancel bookings." />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <Grid>
                                                        <ListItemText primary="All platform accounts have user access to the demo facility. Access the landing page: "/>
                                                        <Link component={RouterLink} to={demoLinkPath}>
                                                          Smash Racquet Club
                                                        </Link>
                                                    </Grid>
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="You can be a member of multiple facilities while at the same time being a manager of facilities where you have management access." />
                                                </ListItem>
                                            </List>
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="h6" align="center">
                                                Managers:
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <List aria-label="manager features">
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Manage sports facilities and add resources such as tennis courts or soccer fields." />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Get a unique Internet URL address for your facility and link to it." />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemIcon>
                                                        <CheckIcon className={classes.icons} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Invite users by email to join your facility." />
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
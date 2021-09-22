import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 50,
        padding: 10,
        backgroundColor: theme.palette.primary.main
    },
    gitLink: {
        color: theme.palette.common.white,
        cursor: 'pointer',
        '&:hover': {
        color: theme.palette.secondary.dark,
        }
    },
    gitLinkContainer: {
        margin: 5
    },
    footerText: {
        color: theme.palette.common.white,
        textAlign: 'center'
    }
}));

export const Footer = () => {
    const classes = useStyles()

    return (
            <Grid
                item
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                className={classes.footer}>
                <Grid item>
                    <Typography className={classes.footerText} variant="subtitle1">
                        Sports Booker - by Mike Johansson
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.footerText} variant="subtitle1">
                        Demo site developed using Postgres, Express, React, and Node.js.
                    </Typography>  
                </Grid>
                <Grid item className={classes.gitLinkContainer}>
                    <GitHubIcon className={classes.gitLink} onClick={event => window.open('https://www.github.com/mikejoh12', '_blank')}/>
                </Grid>         
            </Grid>
    )
}

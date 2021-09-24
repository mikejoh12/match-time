import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 50,
        padding: 10,
        backgroundColor: theme.palette.primary.main
    },
    icons: {
        color: theme.palette.common.white,
        cursor: 'pointer',
        '&:hover': {
        color: theme.palette.secondary.dark,
        }
    },
    linkContainers: {
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
                        MATCHTIME - by Mike Johansson
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.footerText} variant="subtitle1">
                        Demo site developed using Postgres, Express, React, and Node.js.
                    </Typography>  
                </Grid>
                <Grid item container justifyContent="center">
                    <Grid item className={classes.linkContainers}>
                        <GitHubIcon className={classes.icons} onClick={event => window.open('https://www.github.com/mikejoh12', '_blank')}/>
                    </Grid>
                    <Grid item className={classes.linkContainers}>
                    <a target="_top"
                        rel="noopener noreferrer"
                        href="mailto:mikejoh12@gmail.com">
                        <EmailIcon className={classes.icons}/>
                    </a>
                    </Grid>
                </Grid>
            </Grid>
    )
}

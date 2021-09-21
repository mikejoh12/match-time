import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    footer: {
        height: 70,
        marginTop: 50,
        backgroundColor: theme.palette.primary.main
    },
    copyright: {
        position: "relative",
        top: "4px"
    },
    gitLink: {
        color: 'black',
        cursor: 'pointer',
        '&:hover': {
        color: theme.palette.secondary.dark,
        }
    }}
));

export const Footer = () => {
    const classes = useStyles()

    return (
            <Grid
                item
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                spacing={2}
                className={classes.footer}>
                <Typography variant="subtitle1">
                    Sports Booker - Developed by Mike Johansson
                </Typography>
                <GitHubIcon className={classes.gitLink} onClick={event => window.open('https://www.github.com/mikejoh12', '_blank')}/>
            </Grid>
    )
}

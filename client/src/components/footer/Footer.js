import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        height: 70,
        marginTop: 50,
        backgroundColor: theme.palette.primary.light
    },
    copyright: {
        position: "relative",
        top: "4px"
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

            </Grid>
    )
}

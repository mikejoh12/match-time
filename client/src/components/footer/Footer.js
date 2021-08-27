import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles({
    footer: {
        height: 100,
        marginTop: 50,
        backgroundColor: "rgba(20, 160, 140, 1)"
    },
    copyright: {
        position: "relative",
        top: "4px"
    }
  });

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
                <Typography variant="h6">
                    <CopyrightIcon className={classes.copyright}/> 2021 Calendar Booking
                </Typography>

            </Grid>
    )
}

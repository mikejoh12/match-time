import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

export const LandingNotLoggedIn = () => {

    return (
        <div>
            <Grid   container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}>

                        <Grid item>
                            <Typography variant="h4" >
                                Welcome to Calendar Booking
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                Please create an account or log in to enable functionality of app.
                            </Typography>
                        </Grid>

            </Grid>
      </div>
    )
}
import React from 'react';
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

export const LandingNotLoggedIn = () => {

    return (
                        <Grid item>
                            <Typography variant="h5" align="center">
                                Please create an account or log in to enable functionality of app.
                            </Typography>
                        </Grid>
    )
}
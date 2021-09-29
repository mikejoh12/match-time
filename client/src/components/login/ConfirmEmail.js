import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { useConfirmEmailMutation } from '../../services/api';

const ConfirmEmail = () => {
  const [ confirmEmail, { data, isLoading, isSuccess, isError } ] = useConfirmEmailMutation();
  const { email, token } = useParams();

  useEffect(() => {
    confirmEmail({email: decodeURIComponent(email), token: decodeURIComponent(token)})
  }, [confirmEmail, email, token])

  return (
        <Grid   container item xs={6}
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center">
            <Grid item>
                <Typography variant="h4" >
                    Email Confirmation
                </Typography>
            </Grid>
            { isLoading &&
            <Grid item>
                Loading...
            </Grid>
            }
            { isSuccess &&
            <Grid item>
                <Typography variant="body1" align="center">
                    {data?.message}
                </Typography>
            </Grid>
            }
            { isError &&
            <Grid item>
                <Typography variant="body1" align="center">
                    There was an error.
                </Typography>
            </Grid>

            }
        </Grid>
  );
}

export default ConfirmEmail
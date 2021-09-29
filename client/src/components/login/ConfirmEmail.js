import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useConfirmEmailMutation } from '../../services/api';
import { useHistory } from 'react-router-dom';

const ConfirmEmail = () => {
  const [ confirmEmail, { data, isLoading, isSuccess, error } ] = useConfirmEmailMutation();
  const { email, token } = useParams();
  const history = useHistory();
  
  const handleResendEmailClick = () => history.push('/resend-confirm-email');

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
                <Typography variant="h4" align="center">
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
            { error &&
            <Grid   item container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2} >
                    <Grid item>
                        <Typography variant="body1" align="center">
                            { error?.data?.error?.data.message }
                        </Typography>
                    </Grid>

                    { error?.data?.error?.data?.reason === 'no-token' &&
                    <Grid item>
                        <Button onClick={handleResendEmailClick} color="primary" variant="contained">
                            Resend Confirmation Email
                        </Button>
                    </Grid>
                    }
            </Grid>
            }
        </Grid>
  );
}

export default ConfirmEmail
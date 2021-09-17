import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { usePasswordForgotMutation } from '../../services/api';
import { showSnackbar } from '../../features/ui/uiSlice';
import { useHistory } from 'react-router-dom';

export const PasswordForgot = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm(); 
  const [ passwordForgot ] = usePasswordForgotMutation();
  const history = useHistory()

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await passwordForgot({email}).unwrap()
      dispatch(showSnackbar({
        message: `Reset email for ${email} has been sent if that account exists.`,
        severity: 'success'
        }
      ))
    } catch (err) {
      dispatch(showSnackbar({
        message: err.data?.error?.data || 'There was a server error',
        severity: 'error'
      }))
    } finally {
      history.push('/')
    }
  }

  return (
        <Grid   container item xs={6}
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center">
            <Grid item>
                <Typography variant="h4" >
                    Forgot Password
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" align="center">
                    Enter email address below to reset password. If your email address is on file, an email with reset instructions will be sent to the email.
                </Typography>
            </Grid>
            <Grid item>
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid   
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">
                      <Grid item>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                              label="Email"
                              variant="filled"
                              value={value}
                              onChange={onChange}
                              error={!!error}
                              helperText={error ? error.message : null}
                              type="email"
                              inputProps={{"data-testid":"forgot-password-email"}}
                            />
                          )}
                          rules={{ required: 'Email required' }}
                        />
                      </Grid>
                      <Grid item>
                        <Button data-testid='forgot-password-submit' type="submit" color="primary" variant="contained" autoFocus>
                          Reset Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
            </Grid>
        </Grid>
  );
}
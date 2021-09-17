import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { showSnackbar } from '../../features/ui/uiSlice';
import { usePasswordResetMutation } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, watch } = useForm(); 
  const password = useRef({})
  password.current = watch("password", "")
  const history = useHistory()

  const { email, token } = useParams();
  const decodedToken = decodeURIComponent(token);
  const [ passwordReset ] = usePasswordResetMutation();

  // Submit new password with the reset token obtained from path params
  const onSubmit = async (data) => {
    const { password } = data;
    try {
      const response = await passwordReset({password, email, token: decodedToken}).unwrap()
      dispatch(showSnackbar({
        message: response.message,
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
                    Reset Password
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" align="center">
                    Enter a new password in the fields below.
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
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Password"
                                variant="filled"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="password"
                                inputProps={{"data-testid":"reset-password-enterPassword"}}
                            />
                            )}
                            rules={{  required: 'Password required',
                                    minLength: { value: 6, message: "Password needs to be minimum 6 characters." }
                                    }}
                        />
                    </Grid>
                    <Grid item>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Confirm Password"
                                variant="filled"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="password"
                                inputProps={{"data-testid":"reset-password-confirmPassword"}}
                            />
                            )}
                            rules={{  required: 'Password required',
                                    minLength: { value: 6, message: "Password needs to be minimum 6 characters." },
                                    validate: value =>
                                        value === password.current || 'The passwords do not match'
                                    }}
                        />
                    </Grid>
                    <Grid item>
                    <Button data-testid='reset-password-submit' type="submit" color="primary" variant="contained" autoFocus>
                        Reset Password
                    </Button>
                    </Grid>
                </Grid>
                </form>
            </Grid>

        </Grid>


  );
}
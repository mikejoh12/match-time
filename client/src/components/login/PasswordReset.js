import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

export const PasswordReset = () => {
  const { control, handleSubmit } = useForm(); 

  const onSubmit = async (data) => {
    const { email } = data;
    console.log(email);
  }

  return (
        <Grid   container xs={6}
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center">
            <Grid item>
                <Typography variant="h4" >
                    Password Reset
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
                            />
                          )}
                          rules={{ required: 'Email required' }}
                        />
                      </Grid>
                      <Grid item>
                        <Button type="submit" color="primary" variant="contained" autoFocus>
                          Reset Password
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
            </Grid>

        </Grid>


  );
}
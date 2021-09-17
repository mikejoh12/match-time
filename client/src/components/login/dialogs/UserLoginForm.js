import React from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLoginMutation } from '../../../services/api';
import { setCredentials } from '../../../features/auth/authSlice';
import { setToken } from '../../../features/auth/persistedAuthSlice';
import { useForm, Controller } from "react-hook-form";
import { showSnackbar } from '../../../features/ui/uiSlice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

export const UserLoginForm = ({ handleClose }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { control, handleSubmit } = useForm() 

  const [login] = useLoginMutation()

  const onSubmit = async data => {
      const { email, password } = data
      try {
        const user = await login({email, password}).unwrap()
        dispatch(setCredentials(user))
        dispatch(setToken(user))
        //sessionStorage.setItem('at-lim', user.token)
        dispatch(showSnackbar({
          message: `Login Successful for ${user.user.email}`,
          severity: 'success'
          }
        ))
      } catch (err) {
        dispatch(showSnackbar({
          message: err.data?.error?.message || 'There was a server error',
          severity: 'error'
        }))
      } finally {
        handleClose()
      }
  }

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
              inputProps={{"data-testid":"login-email"}}
            />
          )}
          rules={{ required: 'Email required' }}
        />
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
              inputProps={{"data-testid":"login-password"}}
            />
          )}
          rules={{ required: 'Password required' }}
        />
        <div>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button data-testid='login-user-submit' type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
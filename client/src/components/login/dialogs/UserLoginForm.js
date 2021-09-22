import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLoginMutation } from '../../../services/api';
import { setCredentials } from '../../../features/auth/authUserSlice';
import { setRefreshToken } from '../../../features/auth/authRefreshSlice'
import { useForm, Controller } from "react-hook-form";
import { showSnackbar } from '../../../features/ui/uiSlice';
import { closeLoginDialog } from '../../../features/ui/uiSlice';

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

export const UserLoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const { control, handleSubmit } = useForm() 

  const [login] = useLoginMutation()

  const onSubmit = async data => {
      const { email, password } = data
      try {
        const user = await login({email, password}).unwrap()
        dispatch(setCredentials(user))
        dispatch(setRefreshToken(user))
        dispatch(showSnackbar({
          message: `Login Successful for ${user.user.email}`,
          severity: 'success'
          }
        ))
        if (history.location.pathname === '/') {
          history.push('/select-facility')
        }
      } catch (err) {
        dispatch(showSnackbar({
          message: err.data?.error?.data || 'There was a server error',
          severity: 'error'
        }))
      } finally {
        dispatch(closeLoginDialog())
      }
  }

  const handleCancelClick = () => dispatch(closeLoginDialog())

  return (
    <>
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
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button data-testid='login-user-submit' type="submit" variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};
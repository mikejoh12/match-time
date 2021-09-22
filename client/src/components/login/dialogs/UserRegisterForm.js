import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useCreateUserMutation, useLoginMutation } from '../../../services/api';
import { useForm, Controller } from "react-hook-form";
import { showSnackbar, closeRegisterDialog } from '../../../features/ui/uiSlice';
import { setCredentials } from '../../../features/auth/authUserSlice';

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

export const UserRegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation()
  const [login] = useLoginMutation()

  const { control, handleSubmit, watch } = useForm()  
  const password = useRef({})
  password.current = watch("password", "")

  const handleCancelClick = () => dispatch(closeRegisterDialog())

  const onSubmit = async data => {
    const { firstName, lastName, email, password } = data;
    try {
      await createUser({
        email,
        firstName,
        lastName,
        password
      }).unwrap()
      const user = await login({email, password}).unwrap()
      dispatch(setCredentials(user))
      dispatch(showSnackbar({
          message: `User created: ${user.user.email}`,
          severity: 'success'
        }
      ))
    } catch (err) {
      dispatch(showSnackbar({
        message: err.data?.error?.data,
        severity: 'error'
      }))
    } finally {
      dispatch(closeRegisterDialog())
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="First Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'First name required' }}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label="Last Name"
            variant="filled"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Last name required' }}
      />
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
          />
        )}
        rules={{  required: 'Password required',
                  minLength: { value: 6, message: "Password needs to be minimum 6 characters." }
                }}
      />
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
          />
        )}
        rules={{  required: 'Password required',
                  minLength: { value: 6, message: "Password needs to be minimum 6 characters." },
                  validate: value =>
                    value === password.current || 'The passwords do not match'
                }}
      />
      <div>
        <Button variant="contained" color="secondary" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          Signup
        </Button>
      </div>
    </form>
  );
};
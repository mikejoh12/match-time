import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import { clearSnackbar, selectSuccessSnackBarOpen, selectSuccessSnackbarMessage } from "../features/ui/uiSlice"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MsgSnackbar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const successSnackbarMessage = useSelector(selectSuccessSnackbarMessage)
  const successSnackbarOpen = useSelector(selectSuccessSnackBarOpen)

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <div className={classes.root}>
      <Snackbar open={successSnackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" elevation={6}>
          {successSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
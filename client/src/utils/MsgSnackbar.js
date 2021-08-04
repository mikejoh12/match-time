import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import { clearSnackbar, selectSnackBarOpen, selectSnackbarMessage } from "../features/ui/uiSlice"
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

  const snackbarMessage = useSelector(selectSnackbarMessage)
  const snackbarOpen = useSelector(selectSnackBarOpen)

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <div className={classes.root}>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarMessage.severity} variant="filled" elevation={6}>
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
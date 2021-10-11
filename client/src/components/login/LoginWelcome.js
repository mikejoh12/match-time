import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../../hooks/useAuth'
import { SelectFacility } from '../select-facility/SelectFacility';
import { useGetFacilitiesByUserQuery } from '../../services/api'

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 300,
    },
    tableContainer: {
        margin: theme.spacing(2)
    },
    tableRow: {
        cursor: 'pointer',
    }
}));

const LoginWelcome = () => {
    const { user } = useAuth()
    const { data: facilitiesData, isError, isLoading } = useGetFacilitiesByUserQuery()
    const classes = useStyles()
    const history = useHistory()

    const handleRowClick = (event, facilityId) => history.push(`/facilities/${facilityId}`)

    return (
        <>
        {isError ? (
            <>Oh no, there was an error</>
        ) : isLoading ? (
            <Grid item container justifyContent="center">
                <CircularProgress />
            </Grid>
        ) : facilitiesData ? (
            <Grid 
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Grid item>
                <Typography variant="h4" >
                    Welcome {user.first_name} {user.last_name}
                </Typography>
            </Grid>

            <Grid item>
                <Typography variant="h6" >
                    You are a member of the following facilities:
                </Typography>
            </Grid>

            <Grid item className={classes.tableContainer}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Facility</TableCell>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {facilitiesData.map((facility) => (
                            <TableRow className={classes.tableRow} key={facility.id} onClick={event => handleRowClick(event, facility.id)}>
                                <TableCell align="left">{facility.name}</TableCell>
                                <TableCell align="left">{facility.description}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item>
                <SelectFacility />
            </Grid>
            </Grid>
        ) : null}
      </>
      )
  }

  export default LoginWelcome
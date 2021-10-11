import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom'
import { AddFacilityDialog } from './dialogs/AddFacilityDialog'
import { useGetFacilitiesByUserQuery } from '../../services/api'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const ManagerDashboard = () => {
    const { data: facilitiesData, isError, isLoading } = useGetFacilitiesByUserQuery()
    const history = useHistory()
    const classes = useStyles()

    const handleRowClick = (event, facilityId) => history.push(`/manager-facility-edit/${facilityId}`)

    const managerFacilities = facilitiesData?.filter(facility => facility.is_admin)

    return (
        <div>
            {isError ? (
            <>Oh no, there was an error</>
            ) : isLoading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : facilitiesData ? (
                <Grid   container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                    <Grid item>
                        <Typography variant="h4" align="center">
                            Manager Dashboard
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" align="center">
                            You are managing the following facilities. Select a facility to edit or add a new facility.
                        </Typography>
                    </Grid>
                    { managerFacilities.length ?
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
                                    {managerFacilities.map((facility) => (
                                        <TableRow className={classes.tableRow} key={facility.id} onClick={event => handleRowClick(event, facility.id)}>
                                            <TableCell align="left">{facility.name}</TableCell>
                                            <TableCell align="left">{facility.description}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                            :
                        <Grid>
                            <Typography variant="h6" >
                                You are not managing any facilities.
                            </Typography>
                        </Grid>
                        }
                    <Grid item>
                        <AddFacilityDialog />
                    </Grid>
                </Grid>
            ) : null}
      </div>

      )
  }

  export default ManagerDashboard
  
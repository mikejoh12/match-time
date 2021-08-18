import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom'
import { useGetUsersByFacilityIdQuery } from '../../services/api';

const useStyles = makeStyles({
    root: {
        marginTop: 50
    },
    table: {
        minWidth: 300,
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    }
});

export const FacilityMemberList = () => {
    const { id } = useParams()
    const classes = useStyles()

    const { data: usersData, isError, isLoading } = useGetUsersByFacilityIdQuery(id)
    return (
        <div>
            {isError? (
            <>Oh no, there was an error</>
            ) : isLoading? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : usersData? (
                <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center">
                    <Grid item xs={12} md={6} className={classes.root}>
                        { usersData.length ?
                            <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {usersData.map((user) => (
                                    <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.first_name} {user.last_name}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant="h5" >
                            No users found.
                        </Typography>     
                        }
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}

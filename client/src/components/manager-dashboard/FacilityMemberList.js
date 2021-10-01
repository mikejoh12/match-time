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
import { useGetInvitationsByFacilityIdQuery, useGetUsersByFacilityIdQuery } from '../../services/api';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    }
});

const FacilityMemberList = () => {
    const { id } = useParams()
    const classes = useStyles()

    const { data: usersData, isError: usersIsError, isLoading: usersIsLoading } = useGetUsersByFacilityIdQuery(id)
    const { data: invitesData, isError: invitesIsError, isLoading: invitesIsLoading } = useGetInvitationsByFacilityIdQuery(id)

    return (
        <div>
            {usersIsError || invitesIsError? (
            <>Oh no, there was an error</>
            ) : usersIsLoading || invitesIsLoading? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : usersData && invitesData? (
                <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
                spacing={2}>
                    <Grid item>
                        <Typography variant="h5" >
                            Facility Members
                        </Typography>              
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.root}>
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
                        <Typography variant="h6" >
                            No users found.
                        </Typography>     
                        }
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" align="center">
                            Invited Emails
                        </Typography>
                        <Typography variant="body1" align="center">
                            These emails have gotten an invite but have not established an account with MatchTime.
                        </Typography> 
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.root}>
                        { invitesData.length ?
                            <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">Email</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {invitesData.map((invite) => (
                                    <TableRow key={`${invite.email}-${invite.facilities_id}`}>
                                    <TableCell align="center">{invite.email}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant="body1" >
                            No users found.
                        </Typography>     
                        }
                    </Grid>
                </Grid>
            ) : null}
        </div>
    );
}

export default FacilityMemberList

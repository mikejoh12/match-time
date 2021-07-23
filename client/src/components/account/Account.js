import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../hooks/useAuth'

export const Account = () => {
    const { user } = useAuth()
    return (
        <div>

                <Grid   container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                    <Grid item>
                        <Typography variant="h4" >
                            Account info
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" >
                            Email: {user.email}
                        </Typography>  
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" >
                            First name: {user.first_name}
                        </Typography>  
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" >
                            Last name: {user.last_name}
                        </Typography>  
                    </Grid>
                </Grid>
      </div>

      )
  }
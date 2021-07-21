import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetFacilitiesByUserIdQuery } from '../../services/api'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const Landing = () => {
    const { data: facilitiesData, isError, isLoading } = useGetFacilitiesByUserIdQuery(6)
    const classes = useStyles()
    const [clubId, setClubId] = useState('')
    const history = useHistory() 

    // Set default facility to view once facilities are loaded
    useEffect(() => {
        if (facilitiesData) {
        setClubId(facilitiesData[0].id)
        }
      }, [facilitiesData])

    const handleChange = event => setClubId(event.target.value)
    
    const handleSubmit = event => {
        history.push(`/${clubId}`)
        event.preventDefault()
    }

    const handleRegisterClick = () => history.push('/manager-dashboard')

    return ( <div>
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
                        <Grid item container
                                direction="column"
                                alignItems="center"
                                justifyContent="center">
                            <form onSubmit={handleSubmit} align="center">
                                <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Choose a club:</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clubId}
                                    onChange={handleChange}
                                    >
                                        {
                                            facilitiesData.map(facility =>
                                                <MenuItem value={facility.id} key={facility.id}>{facility.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <Grid item>
                                    <Button variant="contained" color="primary" type="submit">Login</Button>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleRegisterClick}>Manage Facilities</Button>
                        </Grid>
                    </Grid>
                ) : null}
        </div>
    )
}

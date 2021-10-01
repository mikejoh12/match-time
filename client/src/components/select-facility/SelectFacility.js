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
import { useGetFacilitiesByUserQuery } from '../../services/api'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,

    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chooseLabel: {
      color: theme.palette.common.black,
      "&.Mui-focused": {
        color: theme.palette.common.black
      }}
    }));

export const SelectFacility = () => {
    const { data: facilitiesData, isError, isLoading } = useGetFacilitiesByUserQuery()
    const classes = useStyles()
    const [clubId, setClubId] = useState('')
    const history = useHistory() 

    // Set default facility to view once facilities are loaded
    useEffect(() => {
        if (facilitiesData?.length) {
        setClubId(facilitiesData[0].id)
        }
      }, [facilitiesData])

    const handleChange = event => setClubId(event.target.value)
    
    const handleSubmit = event => {
        history.push(`/facilities/${clubId}`)
        event.preventDefault()
    }

    const handleRegisterClick = () => history.push('/manager-dashboard')

    return ( <>
                {isError ? (
                    <>Oh no, there was an error</>
                ) : isLoading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : facilitiesData ? (
                    facilitiesData.length ?
                    <Grid   container
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center">     
                        <Grid item container
                                direction="column"
                                alignItems="center"
                                justifyContent="center">
                            <form onSubmit={handleSubmit}>
                                <FormControl className={classes.formControl}>
                                <InputLabel id="choose-label" className={classes.chooseLabel}>Choose a club:</InputLabel>
                                    <Select
                                    labelId="choose-label"
                                    id="choose-select"
                                    value={clubId}
                                    onChange={handleChange}
                                    >
                                        {
                                            facilitiesData.map(facility =>
                                                <MenuItem value={facility.id} key={facility.id}>{facility.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <Grid container direction="column" spacing={2} alignItems="center">
                                    <Grid item>
                                        <Button data-testid='login-as-member' variant="contained" color="secondary" type="submit">Login as a member</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary" onClick={handleRegisterClick}>Manage Facilities</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    :
                    <Grid   container
                            direction="column"
                            alignItems="center"
                            justifyContent="center">        
                        <Typography>
                            You are not a member of any facilities.
                        </Typography>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleRegisterClick}>Manage Facilities</Button>
                        </Grid>
                    </Grid>

                ) : null}
        </>
    )
}
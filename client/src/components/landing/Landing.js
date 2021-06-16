import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { selectAllFacilities, fetchAllFacilities } from '../../features/facilities/facilitiesSlice'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
    const classes = useStyles()
    const dispatch = useDispatch()
    const [clubId, setClubId] = useState(1)
    const facilities = useSelector(selectAllFacilities)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchAllFacilities())
    }, [dispatch])

    const handleChange = event => setClubId(event.target.value)
    
    const handleSubmit = event => {
        history.push(`/${clubId}`)
        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Choose a club:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={clubId}
                    onChange={handleChange}
                    >
                        {
                            facilities.map(facility =>
                                <MenuItem value={facility.id} key={facility.id}>{facility.name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
                </div>
        )
}

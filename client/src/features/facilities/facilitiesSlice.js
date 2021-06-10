import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchFacility = createAsyncThunk('facilities/fetchFacility',
    async id => {
        const response = await apiAxios.get(`/facilities/${id}`)
        return response.data
})

export const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState: {
        fetchFacilityStatus: 'idle',
        facility: {},
        allFacilities: []
    },
    extraReducers: {
        [fetchFacility.pending]: (state, action) => {
            state.fetchFacilityStatus = 'loading'
          },
          [fetchFacility.fulfilled]: (state, action) => {
            state.fetchFacilityStatus = 'succeeded'
            state.facility = action.payload
          },
          [fetchFacility.rejected]: (state, action) => {
            state.fetchFacilityStatus = 'failed'
          },
    }
})

export const selectFacility = state => state.facilities.facility
export const selectFacilities = state => state.facilities.allFacilities

export default facilitiesSlice.reducer
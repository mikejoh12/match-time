import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchFacility = createAsyncThunk('facilities/fetchFacility',
    async id => {
        const response = await apiAxios.get(`/facilities/${id}`)
        return response.data
})

export const fetchAllFacilities = createAsyncThunk('facilities/fetchAllFacilities',
    async () => {
        const response = await apiAxios.get(`/facilities`)
        return response.data
})

export const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState: {
        fetchFacilityStatus: 'idle',
        fetchAllFacilitiesStatus: 'idle',
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
        [fetchAllFacilities.pending]: (state, action) => {
            state.fetchAllFacilitiesStatus = 'loading'
          },
          [fetchAllFacilities.fulfilled]: (state, action) => {
            state.fetchAllFacilitiesStatus = 'succeeded'
            state.allFacilities = action.payload
          },
          [fetchAllFacilities.rejected]: (state, action) => {
            state.fetchAllFacilitiesStatus = 'failed'
          },
    }
})

export const selectFacility = state => state.facilities.facility
export const selectAllFacilities = state => state.facilities.allFacilities

export default facilitiesSlice.reducer
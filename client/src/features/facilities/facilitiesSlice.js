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

export const createFacility = createAsyncThunk('facilities/createFacility',
    async facility => {
        const response = await apiAxios.post(
          '/facilities', facility)
        return response.data
})

export const deleteFacility = createAsyncThunk('facilities/deleteFacility',
    async facilityId => {
        await apiAxios.delete(`/facilities/${facilityId}`)
        return facilityId
})

const initialState = {
  fetchFacilityStatus: 'idle',
  fetchAllFacilitiesStatus: 'idle',
  createFacilityStatus:'idle',
  deleteFacilityStatus: 'idle',
  facility: {},
  allFacilities: []
}

export const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState,
    reducers: {
      facilitiesReset: state => initialState
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
        [createFacility.pending]: (state, action) => {
            state.createFacilityStatus = 'loading'
          },
          [createFacility.fulfilled]: (state, action) => {
            state.createFacilityStatus = 'succeeded'
            state.allFacilities.push(action.payload)
          },
          [createFacility.rejected]: (state, action) => {
            state.createFacilityStatus = 'failed'
          },
        [deleteFacility.pending]: (state, action) => {
            state.deleteFacilityStatus = 'loading'
          },
          [deleteFacility.fulfilled]: (state, action) => {
            state.deleteFacilityStatus = 'succeeded'
            state.facility = {}
            state.allFacilities = state.allFacilities.filter(facility => facility.id !== parseInt(action.payload, 10))
          },
          [deleteFacility.rejected]: (state, action) => {
            state.deleteFacilityStatus = 'failed'
          },
    }
})

export const { facilitiesReset } = facilitiesSlice.actions
export const selectFacility = state => state.facilities.facility
export const selectAllFacilities = state => state.facilities.allFacilities
export const selectFetchAllFacilitiesStatus = state => state.facilities.fetchAllFacilitiesStatus

export default facilitiesSlice.reducer
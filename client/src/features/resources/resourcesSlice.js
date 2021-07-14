import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchResources = createAsyncThunk('resources/fetchResources',
    async id => {
        const response = await apiAxios.get(`/resources/by_facility/${id}`)
        return response.data
})

const initialState = {
    fetchResourcesStatus: 'idle',
    resources: []
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchResources.pending]: (state, action) => {
            state.fetchResourcesStatus = 'loading'
          },
          [fetchResources.fulfilled]: (state, action) => {
            state.fetchResourcesStatus = 'succeeded'
            state.resources = action.payload
          },
          [fetchResources.rejected]: (state, action) => {
            state.fetchResourcesStatus = 'failed'
          },
    }
})

export const selectResources = state => state.resources.resources
export const selectFetchResourcesStatus = state => state.resources.fetchResourcesStatus

export default resourcesSlice.reducer
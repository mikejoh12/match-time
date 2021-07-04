import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apiAxios from '../../config/axiosConfig'

export const fetchResources = createAsyncThunk('resources/fetchResources',
    async id => {
        const response = await apiAxios.get(`/resources/by_facility/${id}`)
        return response.data
})

export const createResource = createAsyncThunk('resources/createResource',
    async resource => {
        const response = await apiAxios.post(
          '/resources', resource)
        return response.data
})

const initialState = {
    fetchResourcesStatus: 'idle',
    createResourceStatus: 'idle',
    resources: []
}

export const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
      resourcesReset: state => initialState
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
        [createResource.pending]: (state, action) => {
            state.createResourceStatus = 'loading'
          },
          [createResource.fulfilled]: (state, action) => {
            state.createResourceStatus = 'succeeded'
            state.resources.push(action.payload)
          },
          [createResource.rejected]: (state, action) => {
            state.createResourceStatus = 'failed'
          },
    }
})

export const { resourcesReset } = resourcesSlice.actions
export const selectResources = state => state.resources.resources
export const selectFetchResourcesStatus = state => state.resources.fetchResourcesStatus

export default resourcesSlice.reducer
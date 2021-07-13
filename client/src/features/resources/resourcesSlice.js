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

export const deleteResource = createAsyncThunk('resources/deleteResource',
    async resourceId => {
        await apiAxios.delete(`/resources/${resourceId}`)
        return resourceId
})

const initialState = {
    fetchResourcesStatus: 'idle',
    createResourceStatus: 'idle',
    deleteResourceStatus: 'idle',
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
        [deleteResource.pending]: (state, action) => {
            state.deleteResourceStatus = 'loading'
          },
          [deleteResource.fulfilled]: (state, action) => {
            state.deleteResourceStatus = 'succeeded'
            state.resources = state.resources.filter(resource => resource.id !== parseInt(action.payload, 10))
          },
          [deleteResource.rejected]: (state, action) => {
            state.deleteResourceStatus = 'failed'
          },
    }
})

export const selectResources = state => state.resources.resources
export const selectFetchResourcesStatus = state => state.resources.fetchResourcesStatus

export default resourcesSlice.reducer
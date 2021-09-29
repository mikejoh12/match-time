import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../features/auth/authUserSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/',
  prepareHeaders: (headers, { getState }) => {
    // If we have a token in the store, let's use it for authenticated requests
    const token = getState().authUser.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },  
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery({
      url: '/auth/refresh_token/',
      method: 'POST',
    }, api, extraOptions);

    if (refreshResult.data) {
      
      // store the new token
      api.dispatch(setCredentials(refreshResult.data))
      
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Facilities', 'currentFacility','Resources', 'Bookings', 'User', 'FacilityUsers'],
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: `auth/signup`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['User'],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    passwordForgot: build.mutation({
      query: (email) => ({
        url: 'auth/password_forgot',
        method: 'POST',
        body: email,
      }),
    }),
    passwordReset: build.mutation({
      query: (body) => ({
        url: 'auth/password_reset',
        method: 'POST',
        body,
      }),
    }),
    confirmEmail: build.mutation({
      query: (body) => ({
        url: 'auth/confirm_email',
        method: 'POST',
        body,
      }),
    }),
    getFacilitiesByUser: build.query({
      query: () => `facilities/by_user`,
      providesTags: ['Facilities']
    }),
    getFacilityById: build.query({
      query: (id) => `facilities/${id}`,
      providesTags: ['currentFacility']
    }),
    createFacility: build.mutation({
      query: (body) => ({
        url: `facilities/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Facilities'],
    }),
    deleteFacility: build.mutation({
      query: (id) => ({
        url: `facilities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Facilities'],
      }),

    getResourcesByFacilityId: build.query({
        query: (id) => `resources/by_facility/${id}`,
        providesTags: ['Resources']
      }),
    createResource: build.mutation({
      query: ( {facilities_id, resource_name, description} ) => ({
        url: `resources/by_facility/${facilities_id}`,
        method: 'POST',
        body: { name: resource_name,
                description },
      }),
      invalidatesTags: ['Resources'],
      }), 
    deleteResource: build.mutation({
      query: ({id, resource_id}) => ({
        url: `resources/by_facility/${id}/${resource_id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Resources'],
      }),

    getBookingsByFacilityId: build.query({
      query: (id) => `bookings/by_facility/${id}`,
      transformResponse: (response) => {
        const bookings = {}
        response.forEach(booking => {
          if (!bookings[booking.resources_id]) {
            bookings[booking.resources_id] = []
        }
          bookings[booking.resources_id].push(booking)
        });
        return bookings
      },
      providesTags: ['Bookings']
    }),
    getBookingsByUser: build.query({
      query: () => `bookings/by_user`,
      providesTags: ['Bookings']
    }),
    createBooking: build.mutation({
      query: (body) => ({
        url: `bookings/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookings'],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
    inviteUser: build.mutation({
      query: ({inviteEmail, facilityId}) => ({
        url: `auth/invite/${facilityId}`,
        method: 'POST',
        body : { inviteEmail },
      }),
      invalidatesTags: ['FacilityUsers'],
    }),
    getUsersByFacilityId: build.query({
      query: (facilityId) => `users/by_facility/${facilityId}`,
      providesTags: ['FacilityUsers']
    }),
    getInvitationsByFacilityId: build.query({
      query: (facilityId) => `auth/invite/${facilityId}`,
      providesTags: ['FacilityUsers']
    }),
  })
})

export const {  useLoginMutation,
                usePasswordForgotMutation,
                usePasswordResetMutation,
                useConfirmEmailMutation,
                useCreateUserMutation,
                useGetFacilitiesByUserQuery,
                useGetFacilityByIdQuery,
                useGetResourcesByFacilityIdQuery,
                useCreateResourceMutation,
                useDeleteResourceMutation,
                useGetBookingsByFacilityIdQuery,
                useGetBookingsByUserQuery,
                useCreateBookingMutation,
                useDeleteBookingMutation,
                useCreateFacilityMutation,
                useDeleteFacilityMutation,
                useInviteUserMutation,
                useGetUsersByFacilityIdQuery,
                useGetInvitationsByFacilityIdQuery } = api
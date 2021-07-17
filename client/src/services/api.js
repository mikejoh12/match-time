import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Facilities', 'Resources', 'Bookings'],

  endpoints: (build) => ({

    getFacilities: build.query({
      query: () => 'facilities',
      providesTags: ['Facilities']
    }),
    getFacilityById: build.query({
      query: (id) => `facilities/${id}`,
      providesTags: ['Facilities']
    }),
    createFacility: build.mutation({
      query: (body) => ({
        url: `facilities/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
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
      query: (body) => ({
        url: `resources/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['Resources'],
      }), 
    deleteResource: build.mutation({
      query: (id) => ({
        url: `resources/${id}`,
        method: 'DELETE',
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
    getBookingsByUserId: build.query({
      query: (id) => `bookings/by_user/${id}`,
      providesTags: ['Bookings']
    }),
    createBooking: build.mutation({
      query: (body) => ({
        url: `bookings/`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ['Bookings'],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
  })
})

export const {  useGetFacilitiesQuery,
                useGetFacilityByIdQuery,
                useGetResourcesByFacilityIdQuery,
                useCreateResourceMutation,
                useDeleteResourceMutation,
                useGetBookingsByFacilityIdQuery,
                useGetBookingsByUserIdQuery,
                useCreateBookingMutation,
                useDeleteBookingMutation,
                useCreateFacilityMutation,
                useDeleteFacilityMutation } = api
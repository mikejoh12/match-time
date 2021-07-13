import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (build) => ({
    getFacilities: build.query({
      query: () => 'facilities',
    }),
    getFacilityById: build.query({
      query: (id) => `facilities/${id}`,
    }),
    getResourcesByFacilityId: build.query({
      query: (id) => `resources/by_facility/${id}`,
    }),
    getBookingsByFacilityId: build.query({
      query: (id) => `bookings/by_facility/${id}`,
    }),
    getBookingsByUserId: build.query({
      query: (id) => `bookings/by_user/${id}`,
    }),
  }),
})

export const {  useGetFacilitiesQuery,
                useGetFacilityByIdQuery,
                useGetResourcesByFacilityIdQuery,
                useGetBookingsByFacilityIdQuery,
                useGetBookingsByUserIdQuery } = api
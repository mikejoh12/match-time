import React from 'react';
import { render, screen, loginUser } from '../test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Routes } from '../App';

export const handlers = [
    rest.post('/api/auth/login', (req, res, ctx) => {
      return res(ctx.json({
        token: 'testing-token',
        user: {
          date_joined: "2021-08-22T08:37:51.726Z",
          email: "testuser@gmail.com",
          first_name: "John",
          id: 99,
          last_name: "Smith",
          user_role: "customer",
        }
      }), ctx.delay(150))
    }),
    rest.get('/api/facilities/by_user', (req, res, ctx) => {
      return res(ctx.json([
        {
            "id": 1,
            "name": "Smash Tennis Club",
            "description": "Good Club",
            "users_id": 99,
            "facilities_id": 1,
            "is_admin": true
        }
      ]), ctx.delay(150))
    }),
    rest.get('/api/facilities/1', (req, res, ctx) => {
      return res(ctx.json({
        "id": 1,
        "name": "Smash Tennis Club",
        "description": "A really great club"
      }), ctx.delay(150))
    }),
    rest.get('/api/resources/by_facility/1', (req, res, ctx) => {
      return res(ctx.json([
        {
          "id": 1,
          "facilities_id": 1,
          "name": "Court 1",
          "description": "Outdoor"
        }
      ]), ctx.delay(150))
    }),
    rest.get('/api/bookings/by_facility/1', (req, res, ctx) => {
      return res(ctx.json(
        [
          {
              "bookings_id": 182,
              "resources_id": 1,
              "organizer_id": 99,
              "start_time": "2021-08-30T21:00:00.000Z",
              "end_time": "2021-08-30T22:00:00.000Z",
              "facilities_id": 1,
              "resources_name": "Court 1",
              "first_name": "John",
              "last_name": "Smith"
          },
      ]
      ))
    })
  ]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Bookings', () => {
  test('creates a new booking and displays it on bookings page', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
  
    await loginUser("testuser@gmail.com", "password")

    // Enter facility section
    expect(await screen.findByText(/Smash Tennis Club/i)).toBeInTheDocument()
    userEvent.click(screen.getByTestId('login-as-member'))
    expect(await screen.findByText(/Go to scheduling/i)).toBeInTheDocument()

    // Enter calendar section
    userEvent.click(screen.getByTestId('go-to-scheduling'))
    expect(await screen.findByText(/Book a court/i)).toBeInTheDocument()

    // Create a booking
    server.use(
      // Mock the api response of booking
      rest.post('/api/bookings', (req, res, ctx) => {
        return res(
          ctx.json({
              "bookings_id": 183,
              "resources_id": 1,
              "organizer_id": 99,
              "start_time": "2021-09-30T14:00:00.000Z",
              "end_time": "2021-09-30T15:00:00.000Z",
              "facilities_id": 1,
              "resources_name": "Court 1",
              "first_name": "John",
              "last_name": "Smith"
          }),
          ctx.status(201))
      }),
      // Mock the updated bookings array after we add a booking
      rest.get('/api/bookings/by_user', (req, res, ctx) => {
        return res(
          ctx.json([{
            "bookings_id": 183,
            "resources_id": 1,
            "organizer_id": 99,
            "start_time": "2021-09-30T14:00:00.000Z",
            "end_time": "2021-09-30T15:00:00.000Z",
            "facilities_id": 1,
            "resources_name": "Court 1",
            "first_name": "John",
            "last_name": "Smith"
          }, {
            "bookings_id": 182,
            "resources_id": 1,
            "organizer_id": 99,
            "start_time": "2021-08-30T21:00:00.000Z",
            "end_time": "2021-08-30T22:00:00.000Z",
            "facilities_id": 1,
            "resources_name": "Court 1",
            "first_name": "John",
            "last_name": "Smith"
          }]),
          ctx.status(200))
      }),
    )
    userEvent.click(screen.getByTestId('open-book-dialog'))
    expect(await screen.findByText(/Select Court/i)).toBeInTheDocument()    
    userEvent.click(screen.getByTestId('book-court-submit'))

    // Verify new booking message appears
    expect(await screen.findByText(/Booking created successfully/i)).toBeInTheDocument()

    // Verify new booking on bookings page
    userEvent.click(screen.getByTestId('bookings-nav-button'))
    expect(await screen.findByText(/183/)).toBeInTheDocument()

  });
});
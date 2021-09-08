
import React from 'react';
import { fireEvent, render, screen, waitFor } from '../test-utils/test-utils'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
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
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())


describe('Bookings', () => {
  test('Login and enter booking calendar', async() => {
    render(
        <MemoryRouter>
            <Routes/>
        </MemoryRouter>);

    // Login      
    fireEvent.click(screen.getByTestId('login'))
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()

    userEvent.type(screen.getByTestId('login-email'), 'testuser@gmail.com')
    userEvent.type(screen.getByTestId('login-password'), 'password')
    expect(screen.getByTestId('login-email')).toHaveValue('testuser@gmail.com')
    expect(screen.getByTestId('login-password')).toHaveValue('password')

    fireEvent.click(screen.getByTestId('login-user-submit'))
    expect(await screen.findByText('testuser@gmail.com - No facility selected')).toBeInTheDocument()

    // Enter facility section
    expect(await screen.findByText(/Smash Tennis Club/i)).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('login-as-member'))
    expect(await screen.findByText(/Go to scheduling/i)).toBeInTheDocument()

    // Enter calendar section
    fireEvent.click(screen.getByTestId('go-to-scheduling'))
    expect(await screen.findByText(/Book a court/i)).toBeInTheDocument()
  });
});
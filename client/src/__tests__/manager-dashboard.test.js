import React from 'react';
import { loginUser, render, screen, waitFor } from '../test-utils/test-utils'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
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
          "name": "Testing Tennis Club",
          "description": "Good Club",
          "users_id": 99,
          "facilities_id": 1,
          "is_admin": true
      }
    ]))
  })
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Manager Dashboard', () => {
  test('shows name of facility the user is managing on Manager Dashboard', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    await loginUser("testuser@gmail.com", "password")
    userEvent.click(screen.getByTestId('manage-nav-button'))
    expect(await screen.findByText(/Manager Dashboard/i)).toBeInTheDocument()
    expect(await screen.findByText(/Testing Tennis Club/i)).toBeInTheDocument()
  });

  test('adds a new facility and displays it on Manager Dashboard', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )

    server.use(
        rest.post('/api/facilities', (req, res, ctx) => {
        return res(
            ctx.json({
                "id": 2,
                "name": "New Tennis Club",
                "description": "Brand new facility",
            }),
            ctx.status(201))
        }),
    )

    // Navigate to manager dashboard
    await loginUser("testuser@gmail.com", "password")
    userEvent.click(screen.getByTestId('manage-nav-button'))
    expect(await screen.findByText(/Manager Dashboard/i)).toBeInTheDocument()

    // Submit form for new facility
    userEvent.click(screen.getByTestId('add-facility-button'))
    expect(screen.getByText(/Facility name/i)).toBeInTheDocument()
    expect(screen.getByText(/Facility description/i)).toBeInTheDocument()

    userEvent.type(screen.getByTestId('add-facility-name'), 'New Tennis Club')
    userEvent.type(screen.getByTestId('add-facility-description'), 'Brand new facility')
    expect(screen.getByTestId('add-facility-name')).toHaveValue('New Tennis Club')
    expect(screen.getByTestId('add-facility-description')).toHaveValue('Brand new facility')
    await waitFor(() => {
        userEvent.click(screen.getByTestId('add-facility-submit'))
    })

    server.use(
        // Mock the api response with one added facility
        rest.get('/api/facilities/by_user', (req, res, ctx) => {
            return res(ctx.json([
                {
                    "id": 1,
                    "name": "Testing Tennis Club",
                    "description": "Good Club",
                    "users_id": 99,
                    "facilities_id": 1,
                    "is_admin": true
                },
                {
                    "id": 2,
                    "name": "New Tennis Club",
                    "description": "Brand new facility",
                    "users_id": 99,
                    "facilities_id": 2,
                    "is_admin": true
                },               
            ]))
            })
    )

    // Verify new club name removed (after form submit) and then appear in the document
    expect(screen.queryByText(/New Tennis Club/i)).not.toBeInTheDocument()    
    expect(await screen.findByText(/New Tennis Club/i)).toBeInTheDocument()
  });

});
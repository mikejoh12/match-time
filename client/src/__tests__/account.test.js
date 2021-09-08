import React from 'react';
import { loginUser, render, screen } from '../test-utils/test-utils'
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

describe('Account', () => {
  test('shows account info on account page', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    await loginUser("testuser@gmail.com", "password")
    userEvent.click(screen.getByTestId('account-nav-button'))
    expect(await screen.findByText(/John/i)).toBeInTheDocument()
    expect(await screen.findByText(/Smith/i)).toBeInTheDocument()
  });
});
import React from 'react';
import { render, screen } from '../test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Routes } from '../App';

export const handlers = [
    rest.post('/api/auth/password_forgot', (req, res, ctx) => {
      return res(ctx.json({message: 'ok'}), ctx.delay(150))
    }),
    rest.post('/api/auth/password_reset', (req, res, ctx) => {
        return res(ctx.json({
            status: 'ok',
            message: 'Password reset. Please login with your new password.'
        }), ctx.delay(150))
      }),
    rest.post('/api/auth/refresh_token', (req, res, ctx) => {
      return res(ctx.json({
        token: 'refresh-testing-token',
        user: {
          email: "testuser@gmail.com",
          first_name: "John",
          id: 99,
          last_name: "Smith",
        }
      }))
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
    }),
  ]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Password Reset', () => {
  test('submits the password reset form and displays user message', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
  
    let testEmail = 'testuser@gmail.com'

    userEvent.click(screen.getByTestId('login'))
    userEvent.click(screen.getByTestId('forgot-password-button'))

    // Enter forgot password section and submit form
    expect(await screen.findByText(/Enter email address below to reset password/i)).toBeInTheDocument()
    userEvent.type(screen.getByTestId('forgot-password-email'), testEmail)
    expect(screen.getByTestId('forgot-password-email')).toHaveValue(testEmail)
    userEvent.click(screen.getByTestId('forgot-password-submit'))
    expect(await screen.findByText(`Reset email for ${testEmail} has been sent if that account exists.`)).toBeInTheDocument()
  });

  test('submits the change password form and displays a success message upon server success response', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    const testEmail = "testuser@gmail.com"
    const testToken = "test-token"
    history.push(`/password-reset/${testEmail}/:${testToken}`)
    userEvent.type(screen.getByTestId("reset-password-enterPassword"), 'test-password')
    userEvent.type(screen.getByTestId("reset-password-confirmPassword"), 'test-password')
    userEvent.click(screen.getByTestId('reset-password-submit'))
    expect(await screen.findByText('Password reset. Please login with your new password.')).toBeInTheDocument()
  })

  test('submits the change password form and displays a failure message upon server 401 response', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    server.use(
        // Mock the api response for an invalid token
        rest.post('/api/auth/password_reset', (req, res, ctx) => {
            return res(ctx.json({
                    error: { status: 'failure', data: 'Token not found. Please try the reset password process again.' }
                }),
                ctx.delay(150),
                ctx.status(401))
            })
    )

    const testEmail = "testuser@gmail.com"
    const testToken = "wrong-token"
    history.push(`/password-reset/${testEmail}/:${testToken}`)

    userEvent.type(screen.getByTestId("reset-password-enterPassword"), 'test-password')
    userEvent.type(screen.getByTestId("reset-password-confirmPassword"), 'test-password')
    userEvent.click(screen.getByTestId('reset-password-submit'))
    expect(await screen.findByText('Token not found. Please try the reset password process again.')).toBeInTheDocument()
  })
});
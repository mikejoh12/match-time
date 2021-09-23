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
  }), 
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App Component Startup', () => {
  test('renders Sports Booker title', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    const linkElement = screen.getAllByText('Sports Booker');
    expect(linkElement[0]).toBeInTheDocument();
  });
});

describe('Login', () => {
  test('logs in successfully and display user email in navbar', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    await loginUser("testuser@gmail.com", "password")
  });

  test('handles server error on login', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    
    userEvent.click(screen.getByTestId('login'))
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()

    userEvent.type(screen.getByTestId('login-email'), 'testuser@gmail.com')
    userEvent.type(screen.getByTestId('login-password'), 'password')
    expect(screen.getByTestId('login-email')).toHaveValue('testuser@gmail.com')
    expect(screen.getByTestId('login-password')).toHaveValue('password')

    userEvent.click(screen.getByTestId('login-user-submit'))
    expect(await screen.findByText('There was a server error')).toBeInTheDocument()
  });

  test('logs out successfully and displays status msg', async() => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    await loginUser("testuser@gmail.com", "password")
    userEvent.click(screen.getByTestId('logout-button'))
    expect(await screen.findByText(/User has been logged out/i)).toBeInTheDocument()
  });
});
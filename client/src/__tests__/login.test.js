import React from 'react';
import { fireEvent, render, screen } from '../test-utils/test-utils'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App';

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
// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('App Component Startup', () => {
  test('renders Sports Booker title', () => {
    render(<App />);
    const linkElement = screen.getAllByText('Sports Booker');
    expect(linkElement[0]).toBeInTheDocument();
  });
});

describe('Login', () => {
  test('Login successfully and display user email in navbar', async() => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('login'))
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()

    userEvent.type(screen.getByTestId('login-email'), 'testuser@gmail.com')
    userEvent.type(screen.getByTestId('login-password'), 'password')
    expect(screen.getByTestId('login-email')).toHaveValue('testuser@gmail.com')
    expect(screen.getByTestId('login-password')).toHaveValue('password')

    fireEvent.click(screen.getByTestId('login-user-submit'))
    expect(await screen.findByText('testuser@gmail.com - No facility selected')).toBeInTheDocument()
  });

  test('Handle server error on login', async() => {
    render(<App />);
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    
    fireEvent.click(screen.getByTestId('login'))
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()

    userEvent.type(screen.getByTestId('login-email'), 'testuser@gmail.com')
    userEvent.type(screen.getByTestId('login-password'), 'password')
    expect(screen.getByTestId('login-email')).toHaveValue('testuser@gmail.com')
    expect(screen.getByTestId('login-password')).toHaveValue('password')

    fireEvent.click(screen.getByTestId('login-user-submit'))
    expect(await screen.findByText('There was a server error')).toBeInTheDocument()
  });
});

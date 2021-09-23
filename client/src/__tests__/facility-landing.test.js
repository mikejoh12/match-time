import React from 'react';
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { render, screen } from '../test-utils/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Routes } from '../App';

export const handlers = [
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
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Facility Landing Page', () => {

  test('displays facility info for a valid facility-id route', async() => {
    const history = createMemoryHistory()
    history.push('/1')
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    )
    expect(await screen.findByText(/Smash Tennis Club/i)).toBeInTheDocument()
    expect(await screen.findByText(/Court 1/i)).toBeInTheDocument()
  });
});

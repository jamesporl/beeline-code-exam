import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import App from './App';

const url = 'https://jsonplaceholder.typicode.com/users';
const result1 = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    },
  },
];

const handlers = [
  http.get(url, () => {
    return HttpResponse.json(result1);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('App page', () => {
  test('should render app page loading state first', async () => {
    render(<App />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Get Users')).toBeInTheDocument();
    expect(screen.getByText('Delete Users')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('should render fetched data', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
    });
  });

  test('should render warning when clicking get users', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByText('Get Users'));
    });

    screen.findByText(/delete all users/i);
  });

  test('should delete users then allow refetching of users', async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(async () => {
      fireEvent.click(screen.getByText('Delete Users'));
    });

    screen.findByText(/no users found/i);

    await waitFor(async () => {
      fireEvent.click(screen.getByText('Get Users'));
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });
  });
});

import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARS, GET_CHARS_ERROR } from './apollo-query-mocks';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import { SelectCharProvider } from '../context/SelectCharProvider';

describe('Home', () => {
  describe('Get RickAndMorty Characters from GraphQL', () => {
    test('Display Error', async () => {
      render(
        <MockedProvider mocks={[GET_CHARS_ERROR]} addTypename={false}>
          <Home />
        </MockedProvider>
      );

      const prom: Promise<any> = new Promise((resolve) =>
        setTimeout(resolve, 0)
      );
      await act(() => prom);

      expect(await screen.findByText('Error Occured')).toBeInTheDocument();
    });

    test('Display Loading', () => {
      render(
        <MockedProvider mocks={[GET_CHARS]} addTypename={false}>
          <Home />
        </MockedProvider>
      );
      expect(screen.getAllByTestId('skeleton')).toHaveLength(20);
    });

    test('Display Results', async () => {
      render(
        <MockedProvider mocks={[GET_CHARS]} addTypename={false}>
          <Home />
        </MockedProvider>
      );
      const prom: Promise<any> = new Promise((resolve) =>
        setTimeout(resolve, 0)
      );
      await act(() => prom);
      expect(await screen.findAllByTestId('list-item')).toHaveLength(2);
    });

    test('Open character info', async () => {
      render(
        <MockedProvider mocks={[GET_CHARS]} addTypename={false}>
          <SelectCharProvider>
            <Home />
          </SelectCharProvider>
        </MockedProvider>
      );
      const prom: Promise<any> = new Promise((resolve) =>
        setTimeout(resolve, 0)
      );
      await act(() => prom);

      const item: HTMLElement[] = await screen.findAllByTestId('list-item');

      userEvent.click(item[0]);
      const prom2: Promise<any> = new Promise((resolve) =>
        setTimeout(resolve, 0)
      );
      await act(() => prom2);

      expect(await screen.findByTestId('character-info-modal'));
    });
  });
});

import { render, screen, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHAR } from './apollo-query-mocks';
import CharacterModal from './CharacterModal';

describe('Character Modal', () => {
  test('Character Modal Open', () => {
    const onClose = jest.fn();
    render(
      <MockedProvider mocks={[GET_CHAR]} addTypename={false}>
        <CharacterModal id={''} isOpen={true} onClose={onClose} />
      </MockedProvider>
    );
    expect(screen.getByTestId('character-info-modal')).toBeInTheDocument();
  });

  test('Character Modal Close', () => {
    const onClose = jest.fn();
    render(
      <MockedProvider mocks={[GET_CHAR]} addTypename={false}>
        <CharacterModal id={''} isOpen={false} onClose={onClose} />
      </MockedProvider>
    );
    expect(screen.queryByTestId('character-info-modal')).toBeNull();
  });

  test('Character Modal Display Result', async () => {
    const onClose = jest.fn();
    render(
      <MockedProvider mocks={[GET_CHAR]} addTypename={false}>
        <CharacterModal id={1} isOpen={true} onClose={onClose} />
      </MockedProvider>
    );

    const prom: Promise<any> = new Promise((resolve) => setTimeout(resolve, 0));
    await act(() => prom);

    expect(await screen.findByText(1)).toBeInTheDocument();
    expect(await screen.findAllByText(/rick/i)).toHaveLength(2);
    expect(await screen.findByText("live")).toBeInTheDocument();
    expect(await screen.findByText("male")).toBeInTheDocument();
    expect(await screen.findByText("tr")).toBeInTheDocument();
    expect(await screen.findByText(/S0E01/)).toBeInTheDocument();
  });
});

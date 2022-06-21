import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

describe('ListItem', () => {
  test('Show character list info', () => {
    render(
      <ListItem
        id="1"
        imgSrc="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        name="Rick Sanchez"
        location="Citadel of Ricks"
        key="01"
      />
    );
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();    
  });
});

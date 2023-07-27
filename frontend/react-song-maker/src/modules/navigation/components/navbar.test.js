import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Navbar from './navbar';
import { MemoryRouter } from 'react-router-dom';

test('renders content', () => {
  const view = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  console.log(view);
});

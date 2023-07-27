import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { MemoryRouter } from 'react-router-dom';

test('renders footer', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
});

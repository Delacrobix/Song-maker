import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import AuthDropdown from './authDropdown';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';

test('renders authDropdown', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <AuthDropdown />
      </AuthProvider>
    </MemoryRouter>
  );
});

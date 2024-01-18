// __tests__/details.test.tsx
import { render, fireEvent  } from '@testing-library/react';
import Details from '../components/details';
import { MemoryRouter } from 'react-router-dom';

const mockLocation = {
  state: {
    id: 1234567,
    name: 'Test Asteroid',
    designation: 'Test Designation',
    estimated_diameter: { min_km: 1, max_km: 2 },
    is_potentially_hazardous_asteroid: false,
    orbital_data: { orbit_id: 1, first_date: '2022-01-01', last_date: '2022-12-31', equinox: 'Spring' },
    is_sentry_object: true,
  },
};

const mockLocation2 = {
  state: {
    id: 1234567,
    name: 'Test Asteroid',
    designation: 'Test Designation',
    estimated_diameter: { min_km: 1, max_km: 2 },
    is_potentially_hazardous_asteroid: true,
    orbital_data: { orbit_id: 1, first_date: '2022-01-01', last_date: '2022-12-31', equinox: 'Spring' },
    is_sentry_object: false,
  },
};

test('details populating on Details component or not 1', () => {
    const { getByText } = render(    
      <MemoryRouter initialEntries={[{ pathname: '/1234567', state: mockLocation.state }]}>
        <Details />
      </MemoryRouter>
    );
    const asteroidName = getByText(/Test Asteroid/i);
    const backButton = getByText(/< Go Back/i);
    const asteroidId = getByText(/ID: 1234567/);
    const designation = getByText(/Designation: Test Designation/);
    const hazardous = getByText(/Hazardous: No/);
    const sentry = getByText(/Sentry Object: Yes/);
    expect(hazardous).toBeInTheDocument();
    expect(designation).toBeInTheDocument();
    expect(asteroidId).toBeInTheDocument();
    expect(asteroidName).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(sentry).toBeInTheDocument();
  });

test('details populating on Details component or not 2', () => {
    const { getByText } = render(    
      <MemoryRouter initialEntries={[{ pathname: '/1234567', state: mockLocation2.state }]}>
        <Details />
      </MemoryRouter>
    );
    const asteroidName = getByText(/Test Asteroid/i);
    const backButton = getByText(/< Go Back/i);
    const asteroidId = getByText(/ID: 1234567/);
    const designation = getByText(/Designation: Test Designation/);
    const hazardous = getByText(/Hazardous: Yes/);
    const sentry = getByText(/Sentry Object: No/);
    expect(hazardous).toBeInTheDocument();
    expect(designation).toBeInTheDocument();
    expect(asteroidId).toBeInTheDocument();
    expect(asteroidName).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
    expect(sentry).toBeInTheDocument();
});

test('checking if go back button works or not',() => {
    const { getByText } = render(    
        <MemoryRouter initialEntries={[{ pathname: '/1234567', state: mockLocation.state }]}>
        <Details />
      </MemoryRouter>
    );
    const backButton = getByText(/< Go Back/i);
    fireEvent.click(backButton);
    expect(window.location.pathname).toBe('/');
});


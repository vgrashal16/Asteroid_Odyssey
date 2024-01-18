import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import Homepage from '../pages/homepage';

fetchMock.enableMocks();

test('search button triggers fetchData on click', async () => {
    const { getByLabelText, getByText } = render(
    <BrowserRouter>
    <Homepage />
    </BrowserRouter>
    );
    const searchInput = getByLabelText('Enter Asteroid ID');
    const searchButton = getByText('Search');

    fetchMock.mockResponseOnce(JSON.stringify({}));

    fireEvent.change(searchInput, { target: { value: '1234567' } });

    await act(async () => {
      fireEvent.click(searchButton);
    });
    
    expect(fetchMock).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/neo/1234567?api_key=0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM');
});

test('search button shows error toast on API failure', async () => {
    const { getByLabelText, getByText } = render(
    <BrowserRouter>
    <Homepage />
    </BrowserRouter>
    );
    const searchInput = getByLabelText('Enter Asteroid ID');
    const searchButton = getByText('Search');
  
    fetchMock.mockRejectOnce(new Error('Asteroid ID does not exist'));
  
    fireEvent.change(searchInput, { target: { value: '1234567' } });
  
    await act(async () => {
      fireEvent.click(searchButton);
    });
  
    expect(getByText('Asteroid ID does not exist')).toBeInTheDocument();
});

test('random button triggers fetchWhole on click', async () => {
    const { getByText } = render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
    );
    const randomButton = getByText('Surprise');

    fetchMock.mockResponseOnce(
      JSON.stringify({
        near_earth_objects: [
          { id: 123, name: '123' },
          { id: 456, name: '456' }
        ],
      })
    );

    await act(async () => {
      fireEvent.click(randomButton);
    });
    
    expect(fetchMock).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM');
});
import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import bg from "../assets/background.jpg";



interface SearchProps {
  onSearch: (text: string) => void;
  onRandom: () => void;
}

export const Background = styled('div')({
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Homepage: React.FC<SearchProps> = ({ onSearch, onRandom}) => {
  const [asteroidId, setAsteroidId] = useState<string>('');

  const handleSearch = () => {
    onSearch(asteroidId);
  };

  const handleRandom = () => {
    onRandom();
  };

  return (
    <Background>
      <Box sx={{display: 'flex',marginBottom: '460px', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{marginBottom: '50px', fontSize: '3em'}}>
        Asteroid Odyssey☄️
      </Box>
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px',
        }}
        >
      <TextField
        label="Enter Asteroid ID"
        variant="outlined"
        value={asteroidId}
        onChange={(e) => setAsteroidId(e.target.value)}
        InputLabelProps={{
            style: { color: 'aliceblue' },
        }}
        inputProps={{
            style: { color: 'aliceblue' },
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'aliceblue', 
                },
                '&:hover fieldset': {
                    borderColor: 'aliceblue', 
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'aliceblue', 
                },
            },
        }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ color: 'aliceblue'}}
          >
          Search
        </Button>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleRandom}
        sx={{ color: 'aliceblue', width: '35%' }}
        >
        Random Asteroid
      </Button>
    </Box>
    </Background>
  );
};

export default Homepage;

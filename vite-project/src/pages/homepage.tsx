import { Component, ChangeEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import bg from "../assets/background.jpg";

interface HomepageProps {
  onSearch: (text: string) => void;
  onRandom: () => void;
}

interface HomepageState {
  asteroidId: string;
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

class Homepage extends Component<HomepageProps, HomepageState> {
  constructor(props: HomepageProps) {
    super(props);
    this.state = {
      asteroidId: '',
    };
  }

  handleSearch = () => {
    this.props.onSearch(this.state.asteroidId);
  };

  handleRandom = () => {
    this.props.onRandom();
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ asteroidId: e.target.value });
  };

  render() {
    return (
      <Background>
        <Box sx={{ display: 'flex', marginBottom: '460px', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ marginBottom: '50px', fontSize: '3em' }}>
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
              value={this.state.asteroidId}
              onChange={this.handleChange}
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
              onClick={this.handleSearch}
              sx={{ color: 'aliceblue' }}
            >
              Search
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleRandom}
            sx={{ color: 'aliceblue', width: '35%' }}
          >
            Random Asteroid
          </Button>
        </Box>
      </Background>
    );
  }
}

export default Homepage;

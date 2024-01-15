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
    const newValue = e.target.value;
    if (/^[0-9]*$/.test(newValue)) {
      this.setState({ asteroidId: e.target.value });
    }
  };

  render() {
    const isSearchDisabled = this.state.asteroidId.length !== 7;
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
              inputProps={{
                style: { color: 'aliceblue' },
                maxLength: 7 
              }}
              InputLabelProps={{
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
              style={{
                color: 'aliceblue',
                backgroundColor: isSearchDisabled ? 'grey' : '#1976D2',
              }}
              disabled={isSearchDisabled}
            >
              Search
            </Button>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleRandom}
            sx={{ color: 'aliceblue', width: '20%' }}
          >
            Surprise 
          </Button>
        </Box>
      </Background>
    );
  }
}

export default Homepage;

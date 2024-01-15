import { Component, ChangeEvent } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import bg from "../assets/background.jpg";
import withRouter from "../withRouter";
import toast, { Toaster } from 'react-hot-toast';


interface HomepageState {
  asteroidId: string;
  astdet: AstDet[]; 
}

export interface EstimatedDiameter {
  min_km: number;
  max_km: number;
}

export interface OrbitalData {
  orbit_id: number;
  first_date: string;
  last_date: string;
  equinox: string;
}

interface AstDet {
  id: number;
  name: string;
  designation: string;
  estimated_diameter?: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  orbital_data?: OrbitalData;
  is_sentry_object: boolean;
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

class Homepage extends Component<{ navigate: (str: string, any: any) => void}, HomepageState> {
  private API_KEY: string = "0XDOT0Q9cPCQSjqR3q8gYbxzLyCXa9F7xH56jDsM";
  constructor(props: any) {
    super(props);
    this.state = {
      asteroidId: '',
      astdet: [],
    };
  }

  fetchWhole = async() => {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=` + this.API_KEY);
    const data = await res.json();
    const randomID: number[] = [];
    data.near_earth_objects.map((item: any) => {
      randomID.push(item.id);
    });
    const random = randomID[Math.floor(Math.random() * randomID.length)];
    this.fetchData(random.toString());
  }

  fetchData = async (asteroidId: string) => {
    try{
      const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=` + this.API_KEY);
      const data = await res.json();
      // console.log(data.id);
      if (data) {
        this.setState({ astdet: data });
      }
      this.props.navigate(`/${asteroidId}`, { state: data });
    }
    catch{
      toast.error("Asteroid ID does not exist");
    }
  }

  handleSearch = () => {
    this.fetchData(this.state.asteroidId);
  };

  handleRandom = async() => {
    this.fetchWhole();
    console.log('random');
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
        <Toaster position="top-center" reverseOrder={false}/>
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

export default withRouter(Homepage);

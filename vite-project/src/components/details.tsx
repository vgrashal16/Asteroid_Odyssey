import { Component } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import withRouter from '../withRouter';

export const Background = styled('div')({
  backgroundColor: '#11111b',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

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

interface AsteroidData {
  id: number;
  name: string;
  designation: string;
  estimated_diameter?: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  orbital_data?: OrbitalData;
  is_sentry_object: boolean;
}

interface Appstate{
  asteroid : any;
}
  
class Details extends Component<{location: any;}, Appstate> {

  constructor(props: { location: any }) {
    super(props);
    this.state = {
      asteroid: null,
    };
  }

  handleBack = () => {
    // const { history } = this.props;
    window.location.href = `/`;
    // this.navigate('/');
  }

  componentDidMount() {
    const { location } = this.props;
    const asteroidData: AsteroidData = location.state;
    const asteroid: AsteroidData = asteroidData;
    this.setState({ asteroid: asteroid });
  }
  
  render() {
    const { asteroid } = this.state;

    if (!asteroid) {
      // You might want to show a loading state or handle this case differently
      
      console.log("loading");
      return null;
    }

    console.log(asteroid);
    // const { id } = this.props.params;
    // const index = this.props.detailData.findIndex((item) => item.asteroidID === id);
    // const index = 4;
    // console.log(this.props.detailData.findIndex((item) => item.asteroidID === id));
    // if (index !== -1) {

      // const asteroid = this.props.detailData;
      // console.log(this.props.detailData);
      return (
        <div>
          <Toaster position="top-center" reverseOrder={false}/>
          <Background>
            <Box display="flex"
              flexDirection="column"
              width="100%"
              height="100vh">

              <Box sx={{ height: '8%' }}>
                <Button sx={{ color: 'aliceblue', width: '5%' }} onClick={this.handleBack}>
                  &lt; Go Back
                </Button>
              </Box>

              <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3.5em', textDecoration: 'underline', color: 'aliceblue' }}>
                <p>{asteroid.name}</p>
              </Box>

              <Box sx={{ height: '60%', display: 'flex' }}>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: '2em' }}>
                  <p>ID: {asteroid.id}</p>
                  <p>Designation: {asteroid.designation}</p>
                  <p>Equinox: {asteroid.orbital_data.equinox}</p>
                  <p>Orbit ID: {asteroid.orbital_data.orbit_id}</p>
                  <p>Estimated Diameter: {asteroid.estimated_diameter?.kilometers?.estimated_diameter_min.toFixed(3)} km - {asteroid.estimated_diameter?.kilometers?.estimated_diameter_max?.toFixed(3)} km</p>
                </Box>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: '2em' }}>
                  <p>First Observation Date: {asteroid.orbital_data.first_observation_date}</p>
                  <p>Last Observation Date: {asteroid.orbital_data.last_observation_date}</p>
                  <p>Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                  <p>Sentry Object: {asteroid.is_sentry_object ? 'Yes' : 'No'}</p>
                </Box>
              </Box>
            </Box>
          </Background>
        </div>
      );
    }
  }


export default withRouter(Details);
